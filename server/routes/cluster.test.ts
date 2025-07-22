import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from './testutils/appSetup'
import AuditService, { Page } from '../services/auditService'
import PersonRecordService from '../services/personRecordService'
import { ClusterView } from '../clusterView'

jest.mock('../services/auditService')
jest.mock('../data/personRecordApiClient')
jest.mock('../services/personRecordService')

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
  xit('should render cluster view page for a specified uuid', () => {
    const records: ClusterView = {
      uuid: 'uuid1',
      records: [
        { name: 'uuid-name1', sourceSystem: 'uuid-1-source-system-1', reference: 'uuid-1-reference' },
        { name: 'uuid-name2', sourceSystem: 'uuid-2-source-system-1', reference: 'uuid-2-reference' },
      ],
    }

    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getCluster.mockResolvedValue(records)

    return request(app)
      .get('/cluster/uuid1')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('uuid-name1')
        expect(res.text).toContain('uuid-name2')
        expect(res.text).toContain('uuid-1-source-system-1')
        expect(res.text).toContain('uuid-1-source-system-2')
        expect(res.text).toContain('uuid-1-reference')
        expect(res.text).toContain('uuid-2-reference')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.EXAMPLE_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
