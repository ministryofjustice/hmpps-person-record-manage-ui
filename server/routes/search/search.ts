import type { Request, Response } from 'express'
import { Router } from 'express'
import type { Services } from '../../services'

export default function routes({ personRecordService }: Services): Router {
  const router = Router()

  router.post('/search', async (req: Request, res: Response, _) => {
    const { username } = res.locals.user
    const { search: uuid } = req.body
    const { records } = await personRecordService.getCluster(username, uuid)
    if (records.length === 0) {
      return res.redirect('/?error=notfound')
    }
    return res.redirect(`/cluster/${uuid}`)
  })

  return router
}
