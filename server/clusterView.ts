export interface Record {
  name: string
  sourceSystem: string
  reference: string
}

export interface ClusterView {
  uuid: string
  records: Record[]
}
