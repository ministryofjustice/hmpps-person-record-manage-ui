export const RECORD_COMPOSITION_TABLE_ID = 'record-composition-table'
export const EVENT_LOG_TABLE_ID = 'event-log-table'

// Search Tabs
type SearchField = 'uuid' | 'crn' | 'prisonNumber'
export type SearchTab = `${SearchField}-search`

const CPR_UUID_SEARCH_TAB_ID: SearchTab = 'uuid-search'
const CRN_SEARCH_TAB_ID: SearchTab = 'crn-search'
const PRISON_NUMBER_SEARCH_TAB_ID: SearchTab = 'prisonNumber-search'

export const SEARCH_TABS: Record<SearchField, SearchTab> = {
  uuid: CPR_UUID_SEARCH_TAB_ID,
  crn: CRN_SEARCH_TAB_ID,
  prisonNumber: PRISON_NUMBER_SEARCH_TAB_ID,
}
