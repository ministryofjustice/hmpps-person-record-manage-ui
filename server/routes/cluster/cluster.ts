import { Router, Request } from 'express'

import type { Services } from '../../services'
import { Page } from '../../services/auditService'
import buildRecordCompositionTable from '../../builders/recordCompositionTable.builder'
import buildEventLogTable from '../../builders/eventLogTable.builder'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/cluster/:uuid', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const { uuid } = req.params

    const { records, clusterSpec } = await personRecordService.getClusterFromUUID(username, uuid)
    const displayClusterVisuals = clusterSpec !== null && records.length > 1

    const recordCompositionTable = buildRecordCompositionTable(records)

    const { eventLogs } = await personRecordService.getEventLog(username, uuid)
    const eventLogTable = buildEventLogTable(eventLogs)

    await auditService.logPageView(Page.CLUSTER_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/cluster', {
      uuid,
      clusterSpec,
      recordCompositionTable,
      eventLogTable,
      displayClusterVisuals,
    })
  })
  return router
}
