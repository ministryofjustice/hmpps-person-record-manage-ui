import PersonRecordApiClient from '../data/personRecordApiClient'
import PersonRecordService from './personRecordService'
import { SourceSystemComposition, ClustersSummaryResponse } from '../data/model/clustersSummaryResponse'

jest.mock('../data/personRecordApiClient')
const token = { access_token: 'userToken', expires_in: 300 }

describe('PersonRecordService', () => {
  const personRecordApiClient = new PersonRecordApiClient(null) as jest.Mocked<PersonRecordApiClient>
  let personRecordService: PersonRecordService

  beforeEach(() => {
    personRecordService = new PersonRecordService(personRecordApiClient)
  })

  it('should call getClusters on the api client and return its result', async () => {
    const expectedResult: ClustersSummaryResponse = {
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

    const result = await personRecordService.getClusters(token.access_token, 1)

    expect(personRecordApiClient.getClusters).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedResult)
  })
})
