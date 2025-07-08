import PersonRecordApiClient from '../data/personRecordApiClient'
import PersonRecordService from './personRecordService'

jest.mock('../data/personRecordApiClient')

describe('PersonRecordService', () => {
  const personRecordApiClient = new PersonRecordApiClient(null) as jest.Mocked<PersonRecordApiClient>
  let personRecordService: PersonRecordService

  beforeEach(() => {
    personRecordService = new PersonRecordService(personRecordApiClient)
  })

  it('should call getCurrentTime on the api client and return its result', async () => {
    const expectedTime = '2025-01-01T12:00:00Z'

    personRecordApiClient.getCurrentTime.mockResolvedValue(expectedTime)

    const result = await personRecordService.getCurrentTime()

    expect(personRecordApiClient.getCurrentTime).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedTime)
  })
})
