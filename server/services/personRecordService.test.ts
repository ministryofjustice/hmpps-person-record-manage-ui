import PersonRecordApiClient from '../data/personRecordApiClient'
import PersonRecordService from './personRecordService'
import { SourceSystemComposition } from '../Cluster'

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
    const expectedResult = {
      content: [
        {
          uuid: 'uuid1',
          recordComposition: [] as SourceSystemComposition[],
        },
      ],
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: true,
          sorted: false,
          unsorted: true,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 202,
      totalPages: 11,
      first: true,
      size: 20,
      number: 0,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      numberOfElements: 20,
      empty: false,
    }

    personRecordApiClient.getClusters.mockResolvedValue(expectedResult)

    const result = await personRecordService.getClusters(token.access_token)

    expect(personRecordApiClient.getClusters).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedResult)
  })
})
