import { ClustersSummaryResponse } from '../data/model/clustersSummaryResponse'
import { ClusterDetailResponse } from '../data/model/clusterDetailResponse'
import PersonRecordApiClient from '../data/personRecordApiClient'
import { EventLogResponse } from '../data/model/eventLogResponse'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string, page: number): Promise<ClustersSummaryResponse> {
    return this.personRecordApiClient.getClusters(username, page)
  }

  async getCluster(username: string, uuid: string): Promise<ClusterDetailResponse> {
    return this.personRecordApiClient.getCluster(username, uuid)
  }

  async getEventLog(username: string, uuid: string): Promise<EventLogResponse> {
    return this.personRecordApiClient.getEventLog(username, uuid)
  }
}
