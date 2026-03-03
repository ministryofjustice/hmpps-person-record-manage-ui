export interface CanonicalRecordResponse {
  canonicalRecord: CanonicalRecord
  sentences: Date[]
}

export interface CanonicalRecord {
  cprUUID: string
  firstName: string
  middleNames: string
  lastName: string
  dateOfBirth: string
  disability: boolean
  interestToImmigration: boolean
  title: unknown
  sex: unknown
  sexualOrientation: unknown
  religion: unknown
  ethnicity: unknown
  aliases: unknown
  nationalities: unknown
  addresses: unknown
  identifiers: unknown
}
