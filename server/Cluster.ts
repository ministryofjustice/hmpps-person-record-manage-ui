export interface SourceSystemComposition {
  nomis: string
  delius: string
  commonPlatform: string
  libra: string
}

export interface Content {
  uuid: string
  recordComposition: SourceSystemComposition
}

export interface Cluster {
  content: Content[]
}
