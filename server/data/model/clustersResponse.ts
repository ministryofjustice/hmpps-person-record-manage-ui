export interface SourceSystemComposition {
  sourceSystem: string
  count: number
}

export interface ClusterSummary {
  uuid: string
  recordComposition: SourceSystemComposition[]
}

export interface PaginationDetails {
  isLastPage: boolean
  count: number
  page: number
  perPage: number
  totalCount: number
  totalPages: number
}

export interface ClustersResponse {
  content: ClusterSummary[]
  pagination: PaginationDetails
}
