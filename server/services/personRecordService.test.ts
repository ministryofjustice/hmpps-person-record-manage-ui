import PersonRecordApiClient from '../data/personRecordApiClient'
import PersonRecordService from './personRecordService'
import { SourceSystemComposition, ClustersSummaryResponse } from '../data/model/clustersSummaryResponse'
import { EventLogResponse } from '../data/model/eventLogResponse'

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

  it('should call getEventLog on the api client and return its result', async () => {
    const expectedResult: EventLogResponse = {
      uuid: 'uuid1',
      eventLogs: [
        {
          uuidStatusType: 'uuidStatusType',
          firstName: 'John',
          firstNameAliases: ['jon', 'johny'],
          middleNames: 'c',
          lastName: 'Doe',
          lastNameAliases: ['Doe', 'Dow'],
          dateOfBirth: '1970-Jan-01',
          dateOfBirthAliases: ['1970-Feb-01', '1970-Mar'],
          postcodes: ['SW1', 'SW2'],
          pncs: ['123', '456'],
          cros: ['abc', 'def'],
          sourceSystem: 'DELIUS',
          sourceSystemId: '1234',
          masterDefendantId: '6639fd43-9d01-450a-87be-557bd3bcf48e',
          eventType: 'CREATE',
          recordMergedTo: 'abc-123',
          eventTimestamp: '2025-05-12T10:37:56.087296',
          sentenceDates: ['2025-Jan-01', '20205-Mar-01'],
          overrideMarker: '6639fd43-9d01-450a-87be-557bd3bcf47d',
          overrideScopes: ['123', '321'],
        },
      ],
    }

    personRecordApiClient.getEventLog.mockResolvedValue(expectedResult)

    const result = await personRecordService.getEventLog(token.access_token, 'uuid1')

    expect(personRecordApiClient.getEventLog).toHaveBeenCalledTimes(1)
    expect(result).toEqual(expectedResult)
  })
})
