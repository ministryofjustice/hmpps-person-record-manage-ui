import { Cluster } from '../Cluster'
import { ClusterView } from '../clusterView'
import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string, page: number): Promise<Cluster> {
    return this.personRecordApiClient.getClusters(username, page)
  }

  async getCluster(username: string, uuid: string): Promise<ClusterView> {
    return this.personRecordApiClient.getCluster(username, uuid)
  }
}
