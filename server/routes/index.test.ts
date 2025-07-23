import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from './testutils/appSetup'
import AuditService, { Page } from '../services/auditService'
import PersonRecordService from '../services/personRecordService'
import { ClustersResponse } from '../data/model/clustersResponse'

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

describe('GET /', () => {
  it('should render index page', () => {
    const clusters: ClustersResponse = {
      content: [
        {
          uuid: 'uuid1',
          recordComposition: [
            {
              sourceSystem: 'COMMON_PLATFORM',
              count: 2,
            },
            {
              sourceSystem: 'DELIUS',
              count: 3,
            },
            {
              sourceSystem: 'LIBRA',
              count: 4,
            },
            {
              sourceSystem: 'NOMIS',
              count: 5,
            },
          ],
        },
      ],
      pagination: {
        isLastPage: false,
        count: 20,
        page: 4,
        perPage: 20,
        totalCount: 202,
        totalPages: 11,
      },
    }
    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getClusters.mockResolvedValue(clusters)

    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Enter a reference number')
        expect(res.text).toContain('You can search by a CPR UUID')
        expect(res.text).toContain('COMMON_PLATFORM (2)')
        expect(res.text).toContain('DELIUS (3)')
        expect(res.text).toContain('LIBRA (4)')
        expect(res.text).toContain('NOMIS (5)')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.INDEX_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })

  it('should render composition summary omitting source systems with no records', () => {
    const clusters = {
      content: [
        {
          uuid: 'uuid1',
          recordComposition: [
            {
              sourceSystem: 'COMMON_PLATFORM',
              count: 2,
            },
            {
              sourceSystem: 'DELIUS',
              count: 0,
            },
            {
              sourceSystem: 'LIBRA',
              count: 4,
            },
            {
              sourceSystem: 'NOMIS',
              count: 5,
            },
          ],
        },
      ],
      pagination: {
        isLastPage: false,
        count: 20,
        page: 4,
        perPage: 20,
        totalCount: 202,
        totalPages: 11,
      },
    }
    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getClusters.mockResolvedValue(clusters)

    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Enter a reference number')
        expect(res.text).toContain('You can search by a CPR UUID')
        expect(res.text).toContain('COMMON_PLATFORM (2), LIBRA (4), NOMIS (5)')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.INDEX_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
