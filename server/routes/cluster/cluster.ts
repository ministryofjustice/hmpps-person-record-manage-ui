import { Router, Request } from 'express'

import type { Record } from '../../cluster'
import type { Services } from '../../services'
import { Page } from '../../services/auditService'
import { Heading, Row, Table, TextItem } from '../../utils/tableBuilder'
import {
  RECORD_COMPOSITION_NAME_TABLE_HEADING,
  RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING,
  RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING,
} from '../../domain/constants/clusterPage'

function buildPersonFrendilyName(record: Record) {
  return [record.firstName, record.middleName, record.lastName].filter(name => name != null || name === '').join(' ')
}

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/cluster/:uuid', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const { uuid } = req.params
    const { records } = await personRecordService.getCluster(username, uuid)
    const rows = records.map(record => {
      return Row(
        TextItem(record.sourceSystemId),
        TextItem(buildPersonFrendilyName(record)),
        TextItem(record.sourceSystem),
      )
    })

    const recordComposition = Table({
      head: [
        Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_ID_TABLE_HEADING),
        Heading(RECORD_COMPOSITION_NAME_TABLE_HEADING),
        Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING),
      ],
      rows,
    })

    await auditService.logPageView(Page.CLUSTER_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/cluster', {
      uuid,
      recordComposition,
    })
  })

  return router
}
