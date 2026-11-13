import { ClustersSummaryResponse } from '../data/model/clustersSummaryResponse'
import { CanonicalRecordResponse } from '../data/model/canonicalRecordResponse'
import { ClusterDetailResponse } from '../data/model/clusterDetailResponse'
import { MatchDetailsResponse } from '../data/model/matchDetailsResponse'
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

  async getScoreComparison(username: string, compare: CompareRequest): Promise<CompareRequest> {
    return this.personRecordApiClient.getScoreComparison(username, compare)
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

  async getCanonicalRecord(username: string, uuid: string): Promise<CanonicalRecordResponse> {
    return this.personRecordApiClient.getCanonicalRecord(username, uuid)
  }

  async getMatchDetails(username: string, defendantId: string): Promise<MatchDetailsResponse> {
    return this.personRecordApiClient.getMatchDetails(username, defendantId)
  }
}
