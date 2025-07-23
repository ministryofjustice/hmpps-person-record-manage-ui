import { ClusterSummary, PaginationDetails } from '../data/model/clustersResponse'
import {
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2,
} from '../domain/constants/indexPage'
import { Table, Row, LinkItem, TextItem, Heading } from './types/table'
import { PageItem, PageLink, Pagination } from './types/pagination'
import config from '../config'

export const buildNeedsAttentionTable = (clusters: ClusterSummary[]): Table => {
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

export const buildNeedsAttentionPagination = (currentPage: number, pagination: PaginationDetails): Pagination => {
  const { isLastPage, totalPages } = pagination

  const paginationUrl = new URL('/', config.ingressUrl)
  const pages = [...Array(totalPages).keys()]
    .map(p => p + 1)
    .map(pageNo => {
      paginationUrl.searchParams.set('page', String(pageNo))

      return PageItem({
        number: pageNo,
        href: paginationUrl.href,
        current: pageNo === currentPage,
      })
    })

  paginationUrl.searchParams.set('page', String(currentPage - 1))
  const previous = currentPage === 1 ? null : PageLink(paginationUrl.href)

  paginationUrl.searchParams.set('page', String(currentPage + 1))
  const next = isLastPage ? null : PageLink(paginationUrl.href)

  return Pagination({
    previous,
    next,
    items: pages,
  })
}
