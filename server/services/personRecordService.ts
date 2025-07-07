import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PrisonRecordService {
  constructor(private readonly personRecordApiClient: PersonRecordApiClient) {}

  getCurrentTime() {
    return this.prisonRecordApiClient.getCurrentTime()
  }
}
