export interface SourceSystemComposition {
  nomis: string
  delius: string
  commonPlatform: string
  libra: string
}

export interface Cluster {
  uuid: string
  recordComposition: SourceSystemComposition
}
