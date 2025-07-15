import { Cluster } from '../Cluster'
import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  async getClusters(username: string, page: number): Promise<Cluster> {
    return this.personRecordApiClient.getClusters(username, page)

  }
}
