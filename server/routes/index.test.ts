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
            commonPlatform: 'CommonPlatform-2',
            delius: 'delius-3',
            nomis: 'nomis-4',
            libra: 'libra-5',
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
        expect(res.text).toContain('CommonPlatform-2')
        expect(res.text).toContain('delius-3')
        expect(res.text).toContain('nomis-4')
        expect(res.text).toContain('libra-5')
        expect(auditService.logPageView).toHaveBeenCalledWith(Page.EXAMPLE_PAGE, {
          who: user.username,
          correlationId: expect.any(String),
        })
      })
  })

  // it('service errors are handled', () => {
  //   auditService.logPageView.mockResolvedValue(null)
  //   exampleService.getCurrentTime.mockRejectedValue(new Error('Some problem calling external api!'))

  //   return request(app)
  //     .get('/')
  //     .expect('Content-Type', /html/)
  //     .expect(500)
  //     .expect(res => {
  //       expect(res.text).toContain('Some problem calling external api!')
  //     })
  // })
})
