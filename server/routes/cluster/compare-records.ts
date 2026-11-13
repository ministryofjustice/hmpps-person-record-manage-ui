import { Router, Request } from 'express'

import { Page, Services } from '../../services'
import buildRecordCompositionTable from '../../builders/recordCompositionTable.builder'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/compare-records/:matchId1/:matchId2', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const matchId1 = req.params.matchId1 as string
    const matchId2 = req.params.matchId2 as string

    const { records, clusterSpec } = await personRecordService.getScoreComparison(username, [matchId1, matchId2])

    const displayClusterVisuals = clusterSpec !== null && records.length > 1

    const recordCompositionTable = buildRecordCompositionTable(records)

    await auditService.logPageView(Page.COMPARE_RECORDS, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/compare-records', {
      clusterSpec,
      recordCompositionTable,
      displayClusterVisuals,
    })
  })
  return router
}
