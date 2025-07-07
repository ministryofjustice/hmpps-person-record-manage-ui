import type { SuperAgentRequest } from 'superagent'
import { stubFor } from './wiremock'

export default {
  stubPersonRecordPing: (httpStatus = 200): SuperAgentRequest =>
    stubFor({
      request: {
        method: 'GET',
        urlPattern: '/health/ping',
      },
      response: {
        status: httpStatus,
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        jsonBody: { status: httpStatus === 200 ? 'UP' : 'DOWN' },
      },
    }),
}
