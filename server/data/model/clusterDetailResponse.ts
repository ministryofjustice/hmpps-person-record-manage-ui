export interface Record {
  firstName: string
  middleName: string
  lastName: string
  sourceSystemId: string
  sourceSystem: string
}

export interface ClusterDetailResponse extends CompareResponse {
  uuid: string
  status: string
  statusReasonCode?: string
}

export interface CompareResponse {
  records: Record[]
  clusterSpec: unknown
}
