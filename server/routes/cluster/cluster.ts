import { Router, Request } from 'express'

import type { Record } from '../../cluster'
import type { Services } from '../../services'
import { Page } from '../../services/auditService'
import { Heading, Row, Table, TextItem } from '../../utils/tableBuilder'
import {
  RECORD_COMPOSITION_NAME_TABLE_HEADING,
  RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING,
  RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING,
} from '../../domain/constants/clusterPage'

import {
  EVENT_LOG_UUID_STATUS_TYPE_TABLE_HEADING,
  EVENT_LOG_FIRST_NAME_TABLE_HEADING,
  EVENT_LOG_FIRST_NAME_ALIASES_TABLE_HEADING,
  EVENT_LOG_MIDDLE_NAMES_TABLE_HEADING,
  EVENT_LOG_LAST_NAME_TABLE_HEADING,
  EVENT_LOG_LAST_NAME_ALIASES_TABLE_HEADING,
  EVENT_LOG_DATE_OF_BIRTH_TABLE_HEADING,
  EVENT_LOG_DATE_OF_BIRTH_ALIASES_TABLE_HEADING,
  EVENT_LOG_POST_CODE_TABLE_HEADING,
  EVENT_LOG_CROS_TABLE_HEADING,
  EVENT_LOG_PNCS_TABLE_HEADING,
  EVENT_LOG_SOURCE_SYSTEM_TABLE_HEADING,
  EVENT_LOG_EVENT_TYPE_TABLE_HEADING,
  EVENT_LOG_RECORD_MERGED_TO_TABLE_HEADING,
  EVENT_LOG_EVENT_TIME_STAMP_TABLE_HEADING,
  EVENT_LOG_SENTENCE_DATES_TABLE_HEADING,
  EVENT_LOG_EXCLUDE_OVERRIDE_MARKER_TABLE_HEADING,
} from '../../domain/constants/eventLog'

function buildPersonFrendilyName(record: Record) {
  return [record.firstName, record.middleName, record.lastName].filter(name => name != null || name === '').join(' ')
}

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/cluster/:uuid', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const { uuid } = req.params
    const { records } = await personRecordService.getCluster(username, uuid)
    const recordRows = records.map(record => {
      return Row(
        TextItem(record.sourceSystemId),
        TextItem(buildPersonFrendilyName(record)),
        TextItem(record.sourceSystem),
      )
    })
    const recordComposition = Table({
      head: [
        Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING),
        Heading(RECORD_COMPOSITION_NAME_TABLE_HEADING),
        Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING),
      ],
      rows: recordRows,
    })

    const eventLogRows = [
      Row(
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
        TextItem('hard-Coded'),
      ),
    ]
    const eventLog = Table({
      head: [
        Heading(EVENT_LOG_UUID_STATUS_TYPE_TABLE_HEADING),
        Heading(EVENT_LOG_FIRST_NAME_TABLE_HEADING),
        Heading(EVENT_LOG_FIRST_NAME_ALIASES_TABLE_HEADING),
        Heading(EVENT_LOG_MIDDLE_NAMES_TABLE_HEADING),
        Heading(EVENT_LOG_LAST_NAME_TABLE_HEADING),
        Heading(EVENT_LOG_LAST_NAME_ALIASES_TABLE_HEADING),
        Heading(EVENT_LOG_DATE_OF_BIRTH_TABLE_HEADING),
        Heading(EVENT_LOG_DATE_OF_BIRTH_ALIASES_TABLE_HEADING),
        Heading(EVENT_LOG_POST_CODE_TABLE_HEADING),
        Heading(EVENT_LOG_CROS_TABLE_HEADING),
        Heading(EVENT_LOG_PNCS_TABLE_HEADING),
        Heading(EVENT_LOG_SOURCE_SYSTEM_TABLE_HEADING),
        Heading(EVENT_LOG_EVENT_TYPE_TABLE_HEADING),
        Heading(EVENT_LOG_RECORD_MERGED_TO_TABLE_HEADING),
        Heading(EVENT_LOG_EVENT_TIME_STAMP_TABLE_HEADING),
        Heading(EVENT_LOG_SENTENCE_DATES_TABLE_HEADING),
        Heading(EVENT_LOG_EXCLUDE_OVERRIDE_MARKER_TABLE_HEADING),
      ],
      rows: eventLogRows,
    })

    await auditService.logPageView(Page.CLUSTER_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/cluster', {
      uuid,
      recordComposition,
      eventLog,
    })
  })

  return router
}
