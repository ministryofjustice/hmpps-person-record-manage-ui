import type { Request, Response } from 'express'
import { Router } from 'express'
import type { Services } from '../../services'
import { ClusterDetailResponse } from '../../data/model/clusterDetailResponse'

type AllowedSearchKeys = 'uuid' | 'crn' | 'prisonNumber'

const ALLOWED_SEARCH_KEYS: AllowedSearchKeys[] = ['uuid', 'crn', 'prisonNumber']

type Handlers = {
  [K in AllowedSearchKeys]: (value: string) => Promise<ClusterDetailResponse>
}

export default function routes({ personRecordService }: Services): Router {
  const router = Router()

  router.post('/search', async (req: Request, res: Response, _) => {
    const { username } = res.locals.user
    const handlers: Handlers = {
      uuid: async val => {
        return personRecordService.getClusterFromUUID(username, val)
      },
      crn: async val => {
        return personRecordService.getClusterFromCRN(username, val)
      },
      prisonNumber: async val => {
        return personRecordService.getClusterFromPrisonNumber(username, val)
      },
    }

    const key = Object.keys(req.body).filter((k): k is AllowedSearchKeys =>
      ALLOWED_SEARCH_KEYS.includes(k as AllowedSearchKeys),
    )[0]
    const value = req.body[key]

    const getClusterFunction = handlers[key]
    const { uuid, records } = await getClusterFunction(value)
    if (records.length === 0) {
      return res.redirect('/?error=notfound')
    }
    return res.redirect(`/cluster/${uuid}`)
  })

  return router
}
