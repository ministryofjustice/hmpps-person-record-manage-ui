import { RestClient, asSystem } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'
import { Clusters } from '../clusters'
import { Cluster } from '../cluster'
import { EventLog } from '../eventLog'

export default class PersonRecordApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Person Record API', config.apis.personRecordApi, logger, authenticationClient)
  }

  /**
   * Making a get request to person record to get needs attention clusters
   *
   *
   */
  async getClusters(username: string, page: number): Promise<Clusters> {
    return this.get({ path: '/admin/clusters', query: { page } }, asSystem(username))
  }

  /**
   * Making a get request to person record to get specified cluster information
   *
   *
   */
  async getCluster(username: string, uuid: string): Promise<Cluster> {
    return this.get({ path: `/admin/cluster/${uuid}` }, asSystem(username))
  }

  /**
   * Making a get request to person record to get specified cluster event logs
   *
   *
   */
  async getEventLog(username: string, uuid: string): Promise<EventLog> {
    return this.get({ path: `/admin/event-log/${uuid}` }, asSystem(username))
  }
}
