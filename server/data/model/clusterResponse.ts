export interface Record {
  firstName: string
  middleName: string
  lastName: string
  sourceSystemId: string
  sourceSystem: string
}

export interface ClusterResponse {
  uuid: string
  records: Record[]
}
