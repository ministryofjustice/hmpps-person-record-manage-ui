export interface SourceSystemComposition {
  sourceSystem: string
  count: number
}

export interface Content {
  uuid: string
  recordComposition: SourceSystemComposition[]
}

export interface Cluster {
  content: Content[]
  pagination: {
    isLastPage: boolean
    count: number
    page: number
    perPage: number
    totalCount: number
    totalPages: number
  }
}
