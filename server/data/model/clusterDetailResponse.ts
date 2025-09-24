export interface Record {
  firstName: string
  middleName: string
  lastName: string
  sourceSystemId: string
  sourceSystem: string
}

export interface ClusterDetailResponse {
  uuid: string
  records: Record[]
  clusterSpec: unknown
}
