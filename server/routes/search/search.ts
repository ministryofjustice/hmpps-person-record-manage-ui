import type { Request, Response } from 'express'

import { Router } from 'express'

export default function routes(): Router {
  const router = Router()

  router.post('/search', async (req: Request, res: Response, _) => {
    return res.redirect('/')
  })

  return router
}
