// Record Composition Table
export const RECORD_COMPOSITION_NAME_TABLE_HEADING = 'Name'
export const RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING = 'Source System'
export const RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING = 'Source System ID'

// Event Log Table
export const EVENT_LOG_UUID_STATUS_TYPE_TABLE_HEADING = 'Status'
export const EVENT_LOG_SOURCE_SYSTEM_ID_TABLE_HEADING = 'Source System ID'
export const EVENT_LOG_FIRST_NAME_TABLE_HEADING = 'First Name'
export const EVENT_LOG_FIRST_NAME_ALIASES_TABLE_HEADING = 'First Name Aliases'
export const EVENT_LOG_MIDDLE_NAMES_TABLE_HEADING = 'Middle Names'
export const EVENT_LOG_LAST_NAME_TABLE_HEADING = 'Last Name'
export const EVENT_LOG_LAST_NAME_ALIASES_TABLE_HEADING = 'Last Name Aliases'
export const EVENT_LOG_DATE_OF_BIRTH_TABLE_HEADING = 'Date Of Birth'
export const EVENT_LOG_DATE_OF_BIRTH_ALIASES_TABLE_HEADING = 'Date Of Birth Aliases'
export const EVENT_LOG_POST_CODE_TABLE_HEADING = 'Postcodes'
export const EVENT_LOG_CROS_TABLE_HEADING = 'CROs'
export const EVENT_LOG_PNCS_TABLE_HEADING = 'PNCs'
export const EVENT_LOG_SOURCE_SYSTEM_TABLE_HEADING = 'Source System'
export const EVENT_LOG_EVENT_TYPE_TABLE_HEADING = 'Event Type'
export const EVENT_LOG_RECORD_MERGED_TO_TABLE_HEADING = 'Record Merged To'
export const EVENT_LOG_EVENT_TIME_STAMP_TABLE_HEADING = 'Event Timestamp'
export const EVENT_LOG_SENTENCE_DATES_TABLE_HEADING = 'Sentence Dates'
export const EVENT_LOG_OVERRIDE_MARKER_TABLE_HEADING = 'Override Marker'
export const EVENT_LOG_OVERRIDE_SCOPES_TABLE_HEADING = 'Override Scopes'

// event types
export const SUPPORTED_EVENT_TYPE = new Map<string, string>([
  ['CPR_NEEDS_ATTENTION_TO_ACTIVE', 'Review to Active'],
  ['CPR_RECLUSTER_NEEDS_ATTENTION', 'Recluster Review'],
  ['CPR_RECLUSTER_RECORD_MERGED', 'Recluster Record Merged'],
  ['CPR_RECLUSTER_UUID_MERGED', 'Recluster UUID Merged'],
  ['CPR_RECORD_CREATED', 'Record Created'],
  ['CPR_RECORD_DELETED', 'Record Deleted'],
  ['CPR_RECORD_MERGED', 'Record Merged'],
  ['CPR_RECORD_SEEDED', 'Record Seeded'],
  ['CPR_RECORD_UNMERGED', 'Record Unmerged'],
  ['CPR_RECORD_UPDATED', 'Record Updated'],
  ['CPR_UUID_CREATED', 'UUID Created'],
  ['CPR_UUID_DELETED', 'UUID Deleted'],
  ['CPR_UUID_MERGED', 'UUID Merged'],
])

// status
export const SUPPORTED_STATUS = new Map<string, string>([
  ['ACTIVE', 'Active'],
  ['NEEDS_ATTENTION', 'Review'],
  ['MERGED', 'Merged'],
  ['RECLUSTER_MERGE', 'Recluster Merge'],
])
