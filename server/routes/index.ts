import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'
import { Heading, LinkItem, Row, Table, TextItem } from '../utils/tableBuilder'
import {
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2,
} from '../domain/constants/indexPage'
import { PageItem, PageLink, Pagination } from '../utils/paginationBuilder'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/', async (req, res, _) => {
    const { username } = res.locals.user

    const { content, pagination } = await personRecordService.getClusters(username)
    const { page: currentPage, isLastPage, totalPages } = pagination
    const rows = content.map(cluster => {
      const clusterComposition = cluster.recordComposition
        .filter(({ count }) => count > 0)
        .map(({ sourceSystem, count }) => `${sourceSystem}(${count})`)
        .join(' ')

      return Row(LinkItem(cluster.uuid, cluster.uuid), TextItem(clusterComposition))
    })

    const needsAttentionTableData = Table({
      head: [Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1), Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2)],
      rows,
    })
    const pages = []
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(
        PageItem({
          number: i,
          href: `/item${i}`,
          current: i === currentPage,
        }),
      )
    }

    const previous: PageLink = currentPage > 1 ? PageLink(`/page${currentPage - 1}`) : null

    const next: PageLink = isLastPage ? null : PageLink(`/page${currentPage + 1}`)
    const needsAttentionPagination: Pagination = Pagination({
      previous,
      next,
      items: pages,
    })

    await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/index', {
      needsAttentionTableData,
      needsAttentionPagination,
    })
  })

  return router
}
