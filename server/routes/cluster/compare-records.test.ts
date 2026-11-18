import type { Express } from 'express'
import request from 'supertest'
import { AuditService } from '@ministryofjustice/hmpps-audit-client'
import { appWithAllRoutes, user } from '../testutils/appSetup'
import { CompareResponse } from '../../data/model/clusterDetailResponse'
import PersonRecordService from '../../services/personRecordService'
import { PersonRecordApiClient } from '../../data'
import { Page } from '../../services'

jest.mock('@ministryofjustice/hmpps-audit-client')
jest.mock('../../data/personRecordApiClient')
jest.mock('../../services/personRecordService')

const auditService = new AuditService({} as never) as jest.Mocked<AuditService>
const personRecordService = new PersonRecordService({} as PersonRecordApiClient) as jest.Mocked<PersonRecordService>

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

describe('GET /compare-records/matchId1/matchId2', () => {
  it('should render comparison of two records', () => {
    const compare: CompareResponse = {
      records: [
        { firstName: 'Jane', middleName: 'Mary', lastName: 'Doe', sourceSystemId: '1234', sourceSystem: 'DELIUS' },
        { firstName: 'John', middleName: 'Tom', lastName: 'Smith', sourceSystemId: '4321', sourceSystem: 'NOMIS' },
      ],
      clusterSpec: {},
    }

    auditService.logPageView.mockResolvedValue()
    personRecordService.getScoreComparison.mockResolvedValue(compare)

    return request(app)
      .get('/compare-records/matchId1/matchId2')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Jane Mary Doe')
        expect(res.text).toContain('1234')
        expect(res.text).toContain('DELIUS')
        expect(res.text).toContain('John Tom Smith')
        expect(res.text).toContain('4321')
        expect(res.text).toContain('NOMIS')

        expect(auditService.logPageView).toHaveBeenCalledWith(Page.COMPARE_RECORDS, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
