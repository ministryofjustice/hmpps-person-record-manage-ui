import PersonRecordApiClient from '../data/personRecordApiClient'
import PersonRecordService from './personRecordService'
import { SourceSystemComposition, Cluster } from '../Cluster'

jest.mock('../data/personRecordApiClient')
const token = { access_token: 'userToken', expires_in: 300 }

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

  it('should call getClusters on the api client and return its result', async () => {
    const expectedResult: Cluster = {
      content: [
        {
          uuid: 'uuid1',
          recordComposition: [] as SourceSystemComposition[],
        },
      ],
      pagination: {
        isLastPage: false,
        count: 20,
        page: 4,
        perPage: 20,
        totalCount: 202,
        totalPages: 11,
      },
    }

    personRecordApiClient.getClusters.mockResolvedValue(expectedResult)

    const result = await personRecordService.getClusters(token.access_token)

    expect(personRecordApiClient.getClusters).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedResult)
  })
})
