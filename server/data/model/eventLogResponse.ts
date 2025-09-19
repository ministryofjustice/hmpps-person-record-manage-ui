export interface EventLogDetails {
  uuidStatusType: string
  firstName: string
  firstNameAliases: string[]
  middleNames: string
  lastName: string
  lastNameAliases: string[]
  dateOfBirth: string
  dateOfBirthAliases: string[]
  postcodes: string[]
  pncs: string[]
  cros: string[]
  sourceSystem: string
  sourceSystemId: string
  eventType: string
  recordMergedTo: string
  eventTimestamp: string
  sentenceDates: string[]
  overrideMarker: string
  overrideScopes: string[]
}

export interface EventLogResponse {
  uuid: string
  eventLogs: EventLogDetails[]
}
