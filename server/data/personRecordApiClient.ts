import { RestClient, asSystem } from '@ministryofjustice/hmpps-rest-client'
import type { AuthenticationClient } from '@ministryofjustice/hmpps-auth-clients'
import config from '../config'
import logger from '../../logger'
import { Cluster } from '../Cluster'

export default class PersonRecordApiClient extends RestClient {
  constructor(authenticationClient: AuthenticationClient) {
    super('Person Record API', config.apis.personRecordApi, logger, authenticationClient)
  }

  /**
   * Making a get request to person record to get needs attention clusters
   *
   *
   */
  async getClusters(username: string, page: number): Promise<Cluster> {
    return this.get({ path: '/admin/clusters', query: { page } }, asSystem(username))
  }

  /**
   * Example: Making a request with the user's own token
   *
   * Use this pattern to call the API with a user's access token.
   * This is useful when authorization depends on the user's roles and permissions.
   *
   * Example:
   * ```
   * import { asUser } from '@ministryofjustice/hmpps-rest-client'
   *
   * getCurrentTime(token: string) {
   *   return this.get({ path: '/example/time' }, asUser(token))
   * }
   * ```
   */

  /**
   * Example: Making a request with a system token for a specific user
   *
   * Use this pattern to call the API with a system token tied to a specific user.
   * This is typically used for auditing purposes to track system-initiated actions on behalf of a user.
   *
   * Example:
   * ```
   * import { asSystem } from '@ministryofjustice/hmpps-rest-client'
   *
   * getCurrentTime(username: string) {
   *   return this.get({ path: '/example/time' }, asSystem(username))
   * }
   * ```
   */
}
