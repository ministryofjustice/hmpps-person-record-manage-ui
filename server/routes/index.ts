import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'

type Table = {
  caption: string
  head: Heading[]
  rows: Row[]
}

type Heading = {
  text: string
}

type Row = Item[]

type Item = {
  text: string
}

export default function routes({ auditService }: Services): Router {
  const router = Router()

  router.get('/', async (req, res, next) => {
    const tableData: Table = {
      caption: 'Needs Attention Clusters:',
      head: [{ text: 'UUID' }, { text: 'Record Compostion' }],
      rows: [[{ text: 'Test' }, { text: 'Test' }]],
    }
    await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/index', { tableData })
  })

  return router
}
