import type { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

export default {
  stubPersonRecordPing: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/person-record-api/health/ping',
      },
      response: {
        status: httpStatus,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { status: httpStatus === 200 ? 'UP' : 'DOWN' },
      },
    }),
  stubPersonRecordGetAdminClusters: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/person-record-api/admin/clusters',
      },
      response: {
        status: httpStatus,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: {
          content: [
            {
              uuid: 'e98d8c39-df1e-42a5-baef-2e76b0aa9e68',
              recordComposition: [
                {
                  sourceSystem: 'COMMON_PLATFORM',
                  count: 2,
                },
                {
                  sourceSystem: 'DELIUS',
                  count: 0,
                },
                {
                  sourceSystem: 'LIBRA',
                  count: 0,
                },
                {
                  sourceSystem: 'NOMIS',
                  count: 0,
                },
              ],
            },
            {
              uuid: '2904b95e-ffa6-4e01-a393-23e9615ded19',
              recordComposition: [
                {
                  sourceSystem: 'COMMON_PLATFORM',
                  count: 0,
                },
                {
                  sourceSystem: 'DELIUS',
                  count: 0,
                },
                {
                  sourceSystem: 'LIBRA',
                  count: 2,
                },
                {
                  sourceSystem: 'NOMIS',
                  count: 0,
                },
              ],
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
            unpaged: false,
            paged: true,
          },
          last: true,
          totalElements: 2,
          totalPages: 1,
          first: true,
          size: 20,
          number: 0,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          numberOfElements: 2,
          empty: false,
        },
      },
    }),
}
