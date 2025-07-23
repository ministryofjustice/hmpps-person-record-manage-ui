import { PaginationDetails } from './paginationDetails'

export interface SourceSystemComposition {
  sourceSystem: string
  count: number
}

export interface ClusterSummary {
  uuid: string
  recordComposition: SourceSystemComposition[]
}

export interface ClustersSummaryResponse {
  content: ClusterSummary[]
  pagination: PaginationDetails
}
