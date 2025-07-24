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
} from '../domain/constants/eventLog'
import { EventLogDetails } from '../eventLog'
import { Row, TextItem, Table, Heading } from './types/table'

const buildEventLogTable = (eventLogs: EventLogDetails[]) => {
  const eventLogRows = eventLogs.map(eventLog => {
    return Row(
      TextItem(eventLog.uuidStatusType),
      TextItem(eventLog.firstName),
      TextItem(eventLog.firstNameAliases.join(' ')),
      TextItem(eventLog.middleNames),
      TextItem(eventLog.lastName),
      TextItem(eventLog.lastNameAliases.join(' ')),
      TextItem(eventLog.dateOfBirth),
      TextItem(eventLog.dateOfBirthAliases.join(' ')),
      TextItem(eventLog.postcodes.join(' ')),
      TextItem(eventLog.pncs.join(' ')),
      TextItem(eventLog.cros.join(' ')),
      TextItem(eventLog.sourceSystem),
      TextItem(eventLog.eventType),
      TextItem(eventLog.recordMergedTo),
      TextItem(eventLog.eventTimestamp),
      TextItem(eventLog.sentenceDates.join(' ')),
      TextItem(eventLog.excludeOverrideMarkers.join(' ')),
    )
  })
  return Table({
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
}

export default buildEventLogTable
