import { Router } from 'express'

import type { Services } from '../services'
import { Page } from '../services/auditService'
import { Heading, LinkItem, Row, Table, TextItem } from '../utils/tableBuilder'
import {
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADER,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1,
  NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2,
} from '../domain/constants/indexPage'

type Table = {
  caption: string
  head: Heading[]
  rows: Row[]
}

type Heading = {
  text: string
}

type Row = Array<TextItem | HtmlItem>

type TextItem = {
  text: string
}

type HtmlItem = {
  html: string
}

export default function routes({ auditService }: Services): Router {
  const router = Router()

  router.get('/', async (req, res, next) => {
    const needAttentionTableData = Table({
      caption: NEEDS_ATTENTION_CLUSTER_TABLE_HEADER,
      head: [Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_1), Heading(NEEDS_ATTENTION_CLUSTER_TABLE_HEADING_2)],
      rows: [Row(LinkItem('TestUUID', '/1234'), TextItem('Test'))],
    })
    await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })
    return res.render('pages/index', { needAttentionTableData })
  })

  return router
}
