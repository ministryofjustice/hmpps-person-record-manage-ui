// import { Router, Request } from 'express'

// import type { Services } from '../services'
// import config from '../config'
// import { Page } from '../services/auditService'
// import { Heading, LinkItem, Row, Table, TextItem } from '../utils/tableBuilder'
// import {
//   RECORD_COMPOSITION_NAME_TABLE_HEADING_1,
//   RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING_1,
//   RECORD_COMPOSITION_REFERENCE_TABLE_HEADING_1,
// } from '../domain/constants/clusterPage'

// export default function routes({ auditService, personRecordService }: Services): Router {
//   const router = Router()

//   router.get('/cluster/:uuid', async (req: Request, res, _) => {
//     const { username } = res.locals.user
//     console.log('--- here ---')
//     const { uuid, records } = await personRecordService.getCluster(username, req.params.uuid)
//     const rows = records.map(record => {
//       return Row(
//         TextItem(record.name),
//         TextItem(record.sourceSystem),
//         TextItem(record.reference))
//     })

//     const recordComposition = Table({
//       head: [
//         Heading(RECORD_COMPOSITION_NAME_TABLE_HEADING_1),
//         Heading(RECORD_COMPOSITION_SOURCE_SYSTEM_TABLE_HEADING_1),
//         Heading(RECORD_COMPOSITION_REFERENCE_TABLE_HEADING_1)
//     ],
//       rows,
//     })

//     await auditService.logPageView(Page.EXAMPLE_PAGE, { who: res.locals.user.username, correlationId: req.id })
//     return res.render('pages/cluster', {
//         uuid,
//         recordComposition,
//     })
//   })

//   return router
// }
