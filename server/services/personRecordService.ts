import { Clusters } from '../clusters'
import { Cluster } from '../cluster'
import { EventLog } from '../eventLog'
import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string, page: number): Promise<Clusters> {
    return this.personRecordApiClient.getClusters(username, page)
  }

  async getCluster(username: string, uuid: string): Promise<Cluster> {
    return this.personRecordApiClient.getCluster(username, uuid)
  }

  async getEventLog(username: string, uuid: string): Promise<EventLog> {
    return this.personRecordApiClient.getEventLog(username, uuid)
  }
}
