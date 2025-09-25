import { RestClient, asSystem, SanitisedError } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'
import { ClustersSummaryResponse } from './model/clustersSummaryResponse'
import { ClusterDetailResponse, Record } from './model/clusterDetailResponse'
import { EventLogResponse } from './model/eventLogResponse'

export default class PersonRecordApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Person Record API', config.apis.personRecordApi, logger, authenticationClient)
  }

  /**
   * Making a get request to person record to get needs attention clusters
   */
  async getClusters(username: string, page: number): Promise<ClustersSummaryResponse> {
    return this.get({ path: '/admin/clusters', query: { page } }, asSystem(username))
  }

  /**
   * Making a get request to person record to get specified cluster information
   */
  async getClusterFromUUID(username: string, uuid: string): Promise<ClusterDetailResponse> {
    return this.get(
      {
        path: `/admin/cluster/${uuid}`,
        errorHandler: <ERROR>(path: string, verb: string, error: SanitisedError<ERROR>) => {
          if (error.responseStatus === 404) {
            return { uuid, records: [] as Record[], clusterSpec: {} }
          }
          throw error
        },
      },
      asSystem(username),
    )
  }

  /**
   * Making a get request to person record to get specified cluster information
   */
  async getClusterFromCRN(username: string, crn: string): Promise<ClusterDetailResponse> {
    return this.get(
      {
        path: `/admin/cluster/probation/${crn}`,
        errorHandler: <ERROR>(path: string, verb: string, error: SanitisedError<ERROR>) => {
          if (error.responseStatus === 404) {
            return { uuid: '', records: [] as Record[], clusterSpec: {} }
          }
          throw error
        },
      },
      asSystem(username),
    )
  }

  /**
   * Making a get request to person record to get specified cluster information
   */
  async getClusterFromPrisonNumber(username: string, prisonNumber: string): Promise<ClusterDetailResponse> {
    return this.get(
      {
        path: `/admin/cluster/prison/${prisonNumber}`,
        errorHandler: <ERROR>(path: string, verb: string, error: SanitisedError<ERROR>) => {
          if (error.responseStatus === 404) {
            return { uuid: '', records: [] as Record[], clusterSpec: {} }
          }
          throw error
        },
      },
      asSystem(username),
    )
  }

  /**
   * Making a get request to person record to get specified cluster event logs
   */
  async getEventLog(username: string, uuid: string): Promise<EventLogResponse> {
    return this.get({ path: `/admin/event-log/${uuid}` }, asSystem(username))
  }
}
