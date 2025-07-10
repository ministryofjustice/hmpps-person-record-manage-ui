import type { Express } from 'express'
import request from 'supertest'
import { appWithAllRoutes, user } from './testutils/appSetup'
import AuditService, { Page } from '../services/auditService'
import PersonRecordService from '../services/personRecordService'
import { Cluster } from '../Cluster'

jest.mock('../services/auditService')
jest.mock('../data/personRecordApiClient')
jest.mock('../services/personRecordService')
// jest.mock('../services/exampleService')

const auditService = new AuditService(null) as jest.Mocked<AuditService>
const personRecordService = new PersonRecordService(null) as jest.Mocked<PersonRecordService>
// const exampleService = new ExampleService(null) as jest.Mocked<ExampleService>

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
    const cluster: Cluster = {
      content: [
        {
          uuid: 'uuid1',
          recordComposition: {
            commonPlatform: '2',
            delius: '3',
            nomis: '4',
            libra: '5',
          },
        },
      ],
    }
    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getClusters.mockResolvedValue(cluster)

    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Enter a reference number')
        expect(res.text).toContain('You can search by a CPR UUID')
        expect(res.text).toContain('CommonPlatform(2)')
        expect(res.text).toContain('Delius(3)')
        expect(res.text).toContain('Nomis(4)')
        expect(res.text).toContain('Libra(5)')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.EXAMPLE_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })

  it('should render composition summay without unnecessary commas', () => {
    const cluster: Cluster = {
      content: [
        {
          uuid: 'uuid1',
          recordComposition: {
            commonPlatform: '2',
            delius: '0',
            nomis: '4',
            libra: '5',
          },
        },
      ],
    }
    auditService.logPageView.mockResolvedValue(null)
    personRecordService.getClusters.mockResolvedValue(cluster)

    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .expect(res => {
        expect(res.text).toContain('Enter a reference number')
        expect(res.text).toContain('You can search by a CPR UUID')
        expect(res.text).toContain('CommonPlatform(2), Libra(5), Nomis(4)')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.EXAMPLE_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })
})
