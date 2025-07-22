export interface Record {
  firstName: string
  middleName: string
  lastName: string
  sourceSystemId: string
  sourceSystem: string
}

export interface Cluster {
  uuid: string
  records: Record[]
}
