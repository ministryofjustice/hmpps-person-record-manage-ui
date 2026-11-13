import { Router, Request } from 'express'

import { Page, Services } from '../../services'
import buildRecordCompositionTable from '../../builders/recordCompositionTable.builder'
import buildEventLogTable from '../../builders/eventLogTable.builder'
import { buildClusterStatus, buildClusterStatusReason } from '../../builders/helpers/clusterStatusHelper'

import CompareRequest from '../../data/model/compareRequest'
 
export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/compare/:matchId1/:matchId2', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const matchId1 = req.params.matchId1 as string
    const matchId2 = req.params.matchId2 as string

    const { status, statusReasonCode, records, clusterSpec } = await personRecordService.getScoreComparison(
      username,
      uuid,
    )

    const clusterStatus = buildClusterStatus(status)
    const clusterStatusReason = buildClusterStatusReason(statusReasonCode)

    const displayClusterVisuals = clusterSpec !== null && records.length > 1

    const recordCompositionTable = buildRecordCompositionTable(records)

    const { eventLogs } = await personRecordService.getEventLog(username, uuid)
    const eventLogTable = buildEventLogTable(eventLogs)

    await auditService.logPageView(Page.CLUSTER_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/cluster', {
      uuid,
      clusterStatus,
      clusterStatusReason,
      clusterSpec,
      recordCompositionTable,
      eventLogTable,
      displayClusterVisuals,
    })
  })
  return router
}
