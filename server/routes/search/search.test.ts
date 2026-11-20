import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from '../testutils/appSetup'
import PersonRecordService from '../../services/personRecordService'
import { PersonRecordApiClient } from '../../data'
import { ClusterDetailResponse } from '../../data/model/clusterDetailResponse'

jest.mock('../../data/personRecordApiClient')
jest.mock('../../services/personRecordService')

const personRecordService = new PersonRecordService({} as PersonRecordApiClient) as jest.Mocked<PersonRecordService>

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: { personRecordService },
    userSupplier: () => user,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

const clusterWithRecords = (uuid: string, sourceSystem: string): ClusterDetailResponse => ({
  uuid,
  status: 'ACTIVE',
  records: [{ firstName: 'Jane', middleName: 'Mary', lastName: 'Doe', sourceSystemId: '1234', sourceSystem }],
  clusterSpec: {},
})

const emptyCluster = (uuid: string): ClusterDetailResponse => ({
  uuid,
  status: '',
  records: [],
  clusterSpec: {},
})

type SearchMethod =
  | 'getClusterFromUUID'
  | 'getClusterFromCRN'
  | 'getClusterFromPrisonNumber'
  | 'getClusterFromDefendantId'
  | 'getClusterFromCId'

interface SearchScenario {
  path: string
  field: string
  value: string
  method: SearchMethod
  tab: string
  sourceSystem: string
}

const searchScenarios: SearchScenario[] = [
  {
    path: '/search/probation',
    field: 'crn',
    value: 'A123456',
    method: 'getClusterFromCRN',
    tab: 'crn-search',
    sourceSystem: 'DELIUS',
  },
  {
    path: '/search/prison',
    field: 'prisonNumber',
    value: 'A1234BC',
    method: 'getClusterFromPrisonNumber',
    tab: 'prisonNumber-search',
    sourceSystem: 'NOMIS',
  },
  {
    path: '/search/commonplatform',
    field: 'defendantId',
    value: 'f1b9a4a1-2a2b-4c3d-9e8f-123456789abc',
    method: 'getClusterFromDefendantId',
    tab: 'defendantId-search',
    sourceSystem: 'COMMON_PLATFORM',
  },
  {
    path: '/search/libra',
    field: 'cId',
    value: '1234567',
    method: 'getClusterFromCId',
    tab: 'cId-search',
    sourceSystem: 'LIBRA',
  },
]

describe('POST /search', () => {
  it('should redirect to the cluster page when the uuid has records', () => {
    personRecordService.getClusterFromUUID.mockResolvedValue(clusterWithRecords('uuid1', 'DELIUS'))

    return request(app)
      .post('/search')
      .type('form')
      .send({ uuid: 'uuid1' })
      .expect(302)
      .expect('Location', '/cluster/uuid1')
      .expect(() => {
        expect(personRecordService.getClusterFromUUID).toHaveBeenCalledWith(user.username, 'uuid1')
      })
  })

  it('should redirect to the not found page when the uuid has no records', () => {
    personRecordService.getClusterFromUUID.mockResolvedValue(emptyCluster('uuid1'))

    return request(app)
      .post('/search')
      .type('form')
      .send({ uuid: 'uuid1' })
      .expect(302)
      .expect('Location', '/?error=notfound#uuid-search')
  })

  it('should return an error when the service throws', () => {
    personRecordService.getClusterFromUUID.mockRejectedValue(new Error('API failure'))

    return request(app).post('/search').type('form').send({ uuid: 'uuid1' }).expect(500)
  })
})

describe.each(searchScenarios)('POST $path', ({ path, field, value, method, tab, sourceSystem }) => {
  it(`should redirect to the cluster page when the ${field} has records`, () => {
    personRecordService[method].mockResolvedValue(clusterWithRecords('cluster-uuid', sourceSystem))

    return request(app)
      .post(path)
      .type('form')
      .send({ [field]: value })
      .expect(302)
      .expect('Location', '/cluster/cluster-uuid')
      .expect(() => {
        expect(personRecordService[method]).toHaveBeenCalledWith(user.username, value)
      })
  })

  it(`should redirect to the not found page when the ${field} has no records`, () => {
    personRecordService[method].mockResolvedValue(emptyCluster('cluster-uuid'))

    return request(app)
      .post(path)
      .type('form')
      .send({ [field]: value })
      .expect(302)
      .expect('Location', `/?error=notfound#${tab}`)
  })

  it('should return an error when the service throws', () => {
    personRecordService[method].mockRejectedValue(new Error('API failure'))

    return request(app)
      .post(path)
      .type('form')
      .send({ [field]: value })
      .expect(500)
  })
})
