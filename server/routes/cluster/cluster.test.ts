import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from '../testutils/appSetup'
import AuditService, { Page } from '../../services/auditService'
import PersonRecordService from '../../services/personRecordService'
import { Cluster } from '../../cluster'
import { EventLog } from '../../eventLog'

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
    const cluster: Cluster = {
      uuid: 'uuid1',
      records: [
        { firstName: 'Jane', middleName: 'Mary', lastName: 'Doe', sourceSystemId: '1234', sourceSystem: 'DELIUS' },
        { firstName: 'John', middleName: 'Tom', lastName: 'Smith', sourceSystemId: '4321', sourceSystem: 'NOMIS' },
      ],
    }
    const eventLogRes: EventLog = {
      uuid: 'uuid1',
      eventLogs: [
        {
          uuidStatusType: 'ACTIVE',
          firstName: 'John',
          firstNameAliases: ['jon', 'jonny'],
          middleNames: 'c',
          lastName: 'Doe',
          lastNameAliases: ['Doe', 'Dow'],
          dateOfBirth: '1970-Jan-01',
          dateOfBirthAliases: ['1970-Feb-01', '1970-Mar'],
          postcodes: ['SW1', 'SW2'],
          pncs: ['123', '456'],
          cros: ['abc', 'def'],
          sourceSystem: 'DELIUS',
          eventType: 'CREATE',
          recordMergedTo: 'abc-123',
          eventTimestamp: '2025-07-25:09:00',
          sentenceDates: ['2025-Jan-01', '20205-Mar-01'],
          excludeOverrideMarkers: ['123', '321'],
        },
      ],
    }

    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getCluster.mockResolvedValue(cluster)
    personRecordService.getEventLog.mockResolvedValue(eventLogRes)

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

        expect(res.text).toContain('ACTIVE')
        expect(res.text).toContain('John')
        expect(res.text).toContain('jon jonny')
        expect(res.text).toContain('c')
        expect(res.text).toContain('Doe')
        expect(res.text).toContain('Doe Dow')
        expect(res.text).toContain('1970-Jan-01')
        expect(res.text).toContain('1970-Feb-01 1970-Mar')
        expect(res.text).toContain('SW1 SW2')
        expect(res.text).toContain('123 456')
        expect(res.text).toContain('abc def')
        expect(res.text).toContain('DELIUS')
        expect(res.text).toContain('CREATE')
        expect(res.text).toContain('abc-123')
        expect(res.text).toContain('2025-07-25:09:00')
        expect(res.text).toContain('2025-Jan-01 20205-Mar-01')
        expect(res.text).toContain('123 321')

        expect(auditService.logPageView).toHaveBeenCalledWith(Page.CLUSTER_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
