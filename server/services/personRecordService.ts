import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PersonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  getCurrentTime() {
    return this.personRecordApiClient.getCurrentTime()
  }
}
