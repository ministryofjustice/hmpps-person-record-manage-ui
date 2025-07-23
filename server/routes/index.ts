import { Router, Request } from 'express'

import type { Services } from '../services'
import config from '../config'
import { Page } from '../services/auditService'
import { Heading, LinkItem, Row, Table, TextItem } from '../utils/tableBuilder'
import {
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2,
} from '../domain/constants/indexPage'

import { PageItem, PageLink, Pagination } from '../utils/paginationBuilder'
import createSearchHandler from './searchHandler'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.post('/search', createSearchHandler())

  router.get('/', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const currentPage = parseInt(req.query.page as string, 10) || 1
    const { content, pagination } = await personRecordService.getClusters(username, currentPage)
    const { isLastPage, totalPages } = pagination
    const rows = content.map(cluster => {
      const clusterComposition = cluster.recordComposition
        .filter(({ count }) => count > 0)
        .map(({ sourceSystem, count }) => `${sourceSystem} (${count})`)
        .join(', ')

      return Row(LinkItem(cluster.uuid, `/cluster/${cluster.uuid}`), TextItem(clusterComposition))
    })

    const needsAttentionTableData = Table({
      head: [Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1), Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2)],
      rows,
    })

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

    const needsAttentionPagination: Pagination = Pagination({
      previous,
      next,
      items: pages,
    })

    await auditService.logPageView(Page.INDEX_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/index', {
      needsAttentionTableData,
      needsAttentionPagination,
    })
  })

  return router
}
