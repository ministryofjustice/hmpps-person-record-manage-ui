import type { Request, Response } from 'express'
import { Router } from 'express'
import type { Services } from '../../services'
import { SEARCH_TABS, SearchTab } from '../../domain/ids/clusterPageIds'

export default function routes({ personRecordService }: Services): Router {
  const router = Router()

  const notFoundUrl = (tab: SearchTab): string => `/?error=notfound#${tab}`

  router.post('/search', async (req: Request, res: Response, _) => {
    const { username } = res.locals.user
    const { uuid } = req.body
    const { records } = await personRecordService.getClusterFromUUID(username, uuid)
    if (records.length === 0) {
      return res.redirect(notFoundUrl(SEARCH_TABS.uuid))
    }
    return res.redirect(`/cluster/${uuid}`)
  })

  router.post('/search/probation', async (req: Request, res: Response, _) => {
    const { username } = res.locals.user
    const { crn } = req.body
    const { uuid, records } = await personRecordService.getClusterFromCRN(username, crn)
    if (records.length === 0) {
      return res.redirect(notFoundUrl(SEARCH_TABS.crn))
    }
    return res.redirect(`/cluster/${uuid}`)
  })

  router.post('/search/prison', async (req: Request, res: Response, _) => {
    const { username } = res.locals.user
    const { prisonNumber } = req.body
    const { uuid, records } = await personRecordService.getClusterFromPrisonNumber(username, prisonNumber)
    if (records.length === 0) {
      return res.redirect(notFoundUrl(SEARCH_TABS.prisonNumber))
    }
    return res.redirect(`/cluster/${uuid}`)
  })

  return router
}
