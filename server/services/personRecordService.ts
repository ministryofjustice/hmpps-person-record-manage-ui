import { Cluster } from '../Cluster'
import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(token: string): Promise<Cluster[]> {
    return this.personRecordApiClient.getClusters(token)
  }

  getCurrentTime() {
    return this.personRecordApiClient.getCurrentTime()
  }
}
