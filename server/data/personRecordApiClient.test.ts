import nock from 'nock'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import PersonRecordApiClient from './personRecordApiClient'
import config from '../config'

const token = { access_token: 'userToken', expires_in: 300 }

describe('PersonRecordApiClient', () => {
  let fakePersonRecordApiClient: nock.Scope
  let personRecordApiClient: PersonRecordApiClient
  let mockAuthenticationClient: jest.Mocked<AuthenticationClient>

  beforeEach(() => {
    mockAuthenticationClient = {
      getToken: jest.fn().mockResolvedValue('test-system-token'),
    } as unknown as jest.Mocked<AuthenticationClient>

    personRecordApiClient = new PersonRecordApiClient(mockAuthenticationClient)
    fakePersonRecordApiClient = nock(config.apis.personRecordApi.url)
  })

  afterEach(() => {
    nock.cleanAll()
    jest.resetAllMocks()
  })

  describe('getClusters', () => {
    it('should make a GET request to /admin/clusters', async () => {
      const response = { data: 'data' }
      fakePersonRecordApiClient
        .get('/admin/clusters')
        .matchHeader('authorization', `Bearer ${token.access_token}`)
        .reply(200, response)

      const output = await personRecordApiClient.getClusters(token.access_token)
      expect(output).toEqual(response)
    })
  })

  describe('getCurrentTime', () => {
    it('should make a GET request to /prisonRecord/time using system token and return the response body', async () => {
      nock(config.apis.personRecordApi.url)
        .get('/example/time')
        .matchHeader('authorization', 'Bearer test-system-token')
        .reply(200, { time: '2025-01-01T12:00:00Z' })

      const response = await personRecordApiClient.getCurrentTime()

      expect(response).toEqual({ time: '2025-01-01T12:00:00Z' })
      expect(mockAuthenticationClient.getToken).toHaveBeenCalledTimes(1)
    })
  })
})
