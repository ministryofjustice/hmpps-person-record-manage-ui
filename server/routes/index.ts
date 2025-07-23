import { Router, Request } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'

import buildNeedsAttentionTable from '../builders/needsAttentionTable.builder'
import buildPagination from '../builders/pagination.builder'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const { page } = req.query as Record<string, string>
    const currentPage = page ? parseInt(page, 10) : 1
    const { content, pagination } = await personRecordService.getClusters(username, currentPage)

    const needsAttentionTableData = buildNeedsAttentionTable(content)
    const needsAttentionPagination = buildPagination('/', currentPage, pagination)

    await auditService.logPageView(Page.INDEX_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/index', {
      needsAttentionTableData,
      needsAttentionPagination,
    })
  })

  return router
}
