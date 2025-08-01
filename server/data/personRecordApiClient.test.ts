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

  describe('getCluster', () => {
    it('it should makea GET request to /admin/cluster', async () => {
      const response = { data: 'data' }
      fakePersonRecordApiClient.get('/admin/cluster/uuid1').reply(200, response)

      const output = await personRecordApiClient.getCluster(token.username, 'uuid1')
      expect(output).toEqual(response)
    })
  })

  describe('getEventLog', () => {
    it('it should makea GET request to /admin/event-log', async () => {
      const response = { data: 'data' }
      fakePersonRecordApiClient.get('/admin/event-log/uuid1').reply(200, response)

      const output = await personRecordApiClient.getEventLog(token.username, 'uuid1')
      expect(output).toEqual(response)
    })
  })
})
