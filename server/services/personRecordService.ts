import PersonRecordApiClient from '../data/personRecordApiClient'

export default class PrisonRecordService {
  constructor(private readonly prisonRecordApiClient: PrisonRecordApiClient) {}

  getCurrentTime() {
    return this.prisonRecordApiClient.getCurrentTime()
  }
}
