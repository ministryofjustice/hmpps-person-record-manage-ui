import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from '../testutils/appSetup'
import AuditService, { Page } from '../../services/auditService'
import PersonRecordService from '../../services/personRecordService'
import { ClusterResponse } from '../../data/model/clusterResponse'

jest.mock('../../services/auditService')
jest.mock('../../data/personRecordApiClient')
jest.mock('../../services/personRecordService')

const auditService = new AuditService(null) as jest.Mocked<AuditService>
const personRecordService = new PersonRecordService(null) as jest.Mocked<PersonRecordService>

let app: Express

beforeEach(() => {
  app = appWithAllRoutes({
    services: {
      auditService,
      personRecordService,
    },
    userSupplier: () => user,
  })
})

afterEach(() => {
  jest.resetAllMocks()
})

describe('GET /cluster/uuid1', () => {
  it('should render cluster view page for a specified uuid', () => {
    const cluster: ClusterResponse = {
      uuid: 'uuid1',
      records: [
        { firstName: 'Jane', middleName: 'Mary', lastName: 'Doe', sourceSystemId: '1234', sourceSystem: 'DELIUS' },
        { firstName: 'John', middleName: 'Tom', lastName: 'Smith', sourceSystemId: '4321', sourceSystem: 'NOMIS' },
      ],
    }

    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getCluster.mockResolvedValue(cluster)

    return request(app)
      .get('/cluster/uuid1')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Jane Mary Doe')
        expect(res.text).toContain('1234')
        expect(res.text).toContain('DELIUS')
        expect(res.text).toContain('John Tom Smith')
        expect(res.text).toContain('4321')
        expect(res.text).toContain('NOMIS')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.CLUSTER_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
