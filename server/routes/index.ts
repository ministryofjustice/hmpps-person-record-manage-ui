import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'
import { Heading, LinkItem, Row, Table, TextItem } from '../utils/tableBuilder'
import {
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2,
} from '../domain/constants/indexPage'
import { PageItem, PageLink, Pagination } from '../utils/paginationBuilder'

interface IndexTemplateValues {
  needAttentionTableData: Table
  needAttentionPagination: Pagination
}

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/', async (req, res, next) => {
    const { username } = res.locals.user
    const rows: Row[] = []

    const clusters = await personRecordService.getClusters(username)

    clusters.content.forEach(cluster => {
      const clusterComposition = cluster.recordComposition
        .filter(({ count }) => count > 0)
        .map(({ sourceSystem, count }) => `${sourceSystem}(${count})`)
        .join(' ')

      rows.push(Row(LinkItem(cluster.uuid, cluster.uuid), TextItem(clusterComposition)))
    })

    const needAttentionTableData = Table({
      head: [Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1), Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2)],
      rows,
    })

    const needAttentionPagination: Pagination = Pagination({
      previous: PageLink('/page1'),
      next: PageLink('/page2'),
      items: [
        PageItem({
          number: 1,
          href: '/item1',
          current: true,
        }),
      ],
    })
    const templateValues: IndexTemplateValues = {
      needAttentionTableData,
      needAttentionPagination,
    }
    await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/index', templateValues)
  })

  return router
}
