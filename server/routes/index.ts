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

    const clusters = await personRecordService.getClusters(username)

    const rows = clusters.content.map(cluster => {
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
    for (let i = 1; i <= clusters.pagination.totalPages; i += 1) {
      pages.push(
        PageItem({
          number: i,
          href: `/item${i}`,
          current: i === clusters.pagination.page,
        }),
      )
    }
    // const currentPage = clusters.pagination.page
    // const previousPage = currentPage > 1 ? currentPage -1 : null

    const previousCheckPage: PageLink =
      clusters.pagination.page > 1 ? PageLink(`/page${clusters.pagination.page - 1}`) : null

    const needsAttentionPagination: Pagination = Pagination({
      previous: previousCheckPage,
      next: PageLink('/page2'),
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
