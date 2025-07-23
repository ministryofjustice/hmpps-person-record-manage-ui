import { ClustersResponse } from '../data/model/clustersResponse'
import { ClusterResponse } from '../data/model/clusterResponse'
import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string, page: number): Promise<ClustersResponse> {
    return this.personRecordApiClient.getClusters(username, page)
  }

  async getCluster(username: string, uuid: string): Promise<ClusterResponse> {
    return this.personRecordApiClient.getCluster(username, uuid)
  }
}
