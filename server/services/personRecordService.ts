import { Cluster } from '../Cluster'
import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string): Promise<Cluster> {
    return this.personRecordApiClient.getClusters(username)
  }

  getCurrentTime() {
    return this.personRecordApiClient.getCurrentTime()
  }
}
