import { ClusterSummary } from '../data/model/clustersSummaryResponse'
import {
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2,
} from '../domain/constants/indexPage'
import { Table, Row, LinkItem, TextItem, Heading } from './types/table'

const buildNeedsAttentionTable = (clusters: ClusterSummary[]): Table => {
  const rows = clusters.map(cluster => {
    const clusterComposition = cluster.recordComposition
      .filter(({ count }) => count > 0)
      .map(({ sourceSystem, count }) => `${sourceSystem} (${count})`)
      .join(', ')

    return Row(LinkItem(cluster.uuid, `/cluster/${cluster.uuid}`), TextItem(clusterComposition))
  })

  return Table({
    head: [Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1), Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2)],
    rows,
  })
}

export default buildNeedsAttentionTable
