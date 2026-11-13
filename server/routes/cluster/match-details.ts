import { Router, Request } from 'express'

import { Page, Services } from '../../services'

export default function routes({ auditService, personRecordService }: Services): Router {
  const router = Router()

  router.get('/match-details/:defendantId', async (req: Request, res, _) => {
    const { username } = res.locals.user
    const defendantId = req.params.defendantId as string

    const { matchStatus } = await personRecordService.getMatchDetails(username, defendantId)
    await auditService.logPageView(Page.MATCH_DETAILS, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/match-details', {
      defendantId,
      matchStatus,
    })
  })
  return router
}
