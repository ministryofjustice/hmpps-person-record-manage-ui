import { Router, Request } from 'express'

import type { Services } from '../../services'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/canonical/:uuid', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const { uuid } = req.params

    const response = await personRecordService.getCanonicalRecord(username, uuid)
    const responseJson = JSON.stringify(response, null, '\t')

    return res.render('pages/canonical', {
      uuid,
      response,
      responseJson,
    })
  })
  return router
}
