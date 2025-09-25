import { ClustersSummaryResponse } from '../data/model/clustersSummaryResponse'
import { ClusterDetailResponse } from '../data/model/clusterDetailResponse'
import PersonRecordApiClient from '../data/personRecordApiClient'
import { EventLogResponse } from '../data/model/eventLogResponse'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string, page: number): Promise<ClustersSummaryResponse> {
    return this.personRecordApiClient.getClusters(username, page)
  }

  async getClusterFromUUID(username: string, uuid: string): Promise<ClusterDetailResponse> {
    return this.personRecordApiClient.getClusterFromUUID(username, uuid)
  }

  async getClusterFromCRN(username: string, crn: string): Promise<ClusterDetailResponse> {
    return this.personRecordApiClient.getClusterFromCRN(username, crn)
  }

  async getClusterFromPrisonNumber(username: string, prisonNumber: string): Promise<ClusterDetailResponse> {
    return this.personRecordApiClient.getClusterFromPrisonNumber(username, prisonNumber)
  }

  async getEventLog(username: string, uuid: string): Promise<EventLogResponse> {
    return this.personRecordApiClient.getEventLog(username, uuid)
  }
}
