import { EventLogDetails } from '../data/model/eventLogResponse'
import timestampHelper from './helpers/timestampHelper'
import {
  EVENT_LOG_CROS_TABLE_HEADING,
  EVENT_LOG_DATE_OF_BIRTH_ALIASES_TABLE_HEADING,
  EVENT_LOG_DATE_OF_BIRTH_TABLE_HEADING,
  EVENT_LOG_EVENT_TIME_STAMP_TABLE_HEADING,
  EVENT_LOG_EVENT_TYPE_TABLE_HEADING,
  EVENT_LOG_FIRST_NAME_ALIASES_TABLE_HEADING,
  EVENT_LOG_FIRST_NAME_TABLE_HEADING,
  EVENT_LOG_LAST_NAME_ALIASES_TABLE_HEADING,
  EVENT_LOG_LAST_NAME_TABLE_HEADING,
  EVENT_LOG_MIDDLE_NAMES_TABLE_HEADING,
  EVENT_LOG_OVERRIDE_MARKER_TABLE_HEADING,
  EVENT_LOG_OVERRIDE_SCOPES_TABLE_HEADING,
  EVENT_LOG_PNCS_TABLE_HEADING,
  EVENT_LOG_POST_CODE_TABLE_HEADING,
  EVENT_LOG_RECORD_MERGED_TO_TABLE_HEADING,
  EVENT_LOG_SENTENCE_DATES_TABLE_HEADING,
  EVENT_LOG_SOURCE_SYSTEM_ID_TABLE_HEADING,
  EVENT_LOG_SOURCE_SYSTEM_TABLE_HEADING,
  EVENT_LOG_UUID_STATUS_TYPE_TABLE_HEADING,
  SUPPORTED_EVENT_TYPE,
} from '../domain/constants/clusterPage'
import { EVENT_LOG_TABLE_ID } from '../domain/ids/clusterPageIds'
import { Row, TextItem, Table, Heading, HTMLItem, TagItem, TagColour } from './types/table'

const needsAttentionViewText = 'Review'

const buildUUIDStatusTypeItem = (uuidStatusType: string): HTMLItem | TextItem => {
  switch (uuidStatusType) {
    case 'NEEDS_ATTENTION':
      return TagItem(needsAttentionViewText, TagColour.RED)
    case 'MERGED':
    case 'RECLUSTER_MERGE':
      return TagItem(uuidStatusType, TagColour.YELLOW)
    case 'ACTIVE':
      return TagItem(uuidStatusType, TagColour.GREEN)
    default:
      return TextItem(uuidStatusType)
  }
}

const buildEventTypeItem = (eventType: string): TextItem => {
  return TextItem(SUPPORTED_EVENT_TYPE.get(eventType) ?? eventType)
}

const buildReadableList = (list: string[]): string => {
  return list.map(item => item.trim()).join(', ')
}

const buildEventLogTable = (eventLogs: EventLogDetails[]) => {
  const eventLogRows = eventLogs.map(eventLog => {
    return Row(
      TextItem(timestampHelper(eventLog.eventTimestamp)),
      buildUUIDStatusTypeItem(eventLog.uuidStatusType),
      buildEventTypeItem(eventLog.eventType),
      TextItem(eventLog.sourceSystemId),
      TextItem(eventLog.firstName),
      TextItem(buildReadableList(eventLog.firstNameAliases)),
      TextItem(eventLog.middleNames),
      TextItem(eventLog.lastName),
      TextItem(buildReadableList(eventLog.lastNameAliases)),
      TextItem(eventLog.dateOfBirth),
      TextItem(buildReadableList(eventLog.dateOfBirthAliases)),
      TextItem(buildReadableList(eventLog.postcodes)),
      TextItem(buildReadableList(eventLog.cros)),
      TextItem(buildReadableList(eventLog.pncs)),
      TextItem(eventLog.recordMergedTo),
      TextItem(buildReadableList(eventLog.sentenceDates)),
      TextItem(eventLog.overrideMarker),
      TextItem(buildReadableList(eventLog.overrideScopes)),
      TextItem(eventLog.sourceSystem),
    )
  })
  return Table({
    head: [
      Heading(EVENT_LOG_EVENT_TIME_STAMP_TABLE_HEADING),
      Heading(EVENT_LOG_UUID_STATUS_TYPE_TABLE_HEADING),
      Heading(EVENT_LOG_EVENT_TYPE_TABLE_HEADING),
      Heading(EVENT_LOG_SOURCE_SYSTEM_ID_TABLE_HEADING),
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
      Heading(EVENT_LOG_RECORD_MERGED_TO_TABLE_HEADING),
      Heading(EVENT_LOG_SENTENCE_DATES_TABLE_HEADING),
      Heading(EVENT_LOG_OVERRIDE_MARKER_TABLE_HEADING),
      Heading(EVENT_LOG_OVERRIDE_SCOPES_TABLE_HEADING),
      Heading(EVENT_LOG_SOURCE_SYSTEM_TABLE_HEADING),
    ],
    rows: eventLogRows,
    attributes: {
      id: EVENT_LOG_TABLE_ID,
    },
  })
}

export default buildEventLogTable
