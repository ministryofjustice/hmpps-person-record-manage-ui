import { Router, Request } from 'express'

import type { Services } from '../../services'
import buildCanonicalRecordCompositionTable from '../../builders/CanonicalRecordCompositionTable.builder'

export default function routes({ personRecordService }: Services): Router {
  const router = Router()

  router.get('/canonical/:uuid', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const uuid = req.params.uuid as string

    const response = await personRecordService.getCanonicalRecord(username, uuid)

    const recordCompositionTable = buildCanonicalRecordCompositionTable(response)

    return res.render('pages/canonical', {
      uuid,
      response,
      recordCompositionTable,
    })
  })
  return router
}
