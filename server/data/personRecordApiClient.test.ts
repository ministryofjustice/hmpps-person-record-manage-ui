import nock from 'nock'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import PersonRecordApiClient from './personRecordApiClient'
import config from '../config'

const token = { username: 'username1', expires_in: 300 }

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
        .get('/admin/clusters?page=1')
        // .matchHeader('authorization', `Bearer ${token.username}`)
        .reply(200, response)

      const output = await personRecordApiClient.getClusters(token.username, 1)
      expect(output).toEqual(response)
    })
  })
})
