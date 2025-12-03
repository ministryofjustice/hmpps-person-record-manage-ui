import { test } from '@playwright/test'
import personRecordApi from '../mockApis/personRecordApi'

import { login, resetStubs } from '../testUtils'
import ClusterPage from '../pages/clusterPage'

test.describe('Cluster View', () => {
  test.afterEach(async () => {
    await resetStubs()
  })
  test.beforeEach(async ({ page }) => {
    await login(page, { name: 'A TestUser' })
    await personRecordApi.stubPersonRecordGetAdminClusters()
  })

  test('cluster view shows records', async ({ page }) => {
    const uuid = '1234'
    await Promise.all([
      personRecordApi.stubPersonRecordGetAdminClusterByUUID(),
      personRecordApi.stubPersonRecordGetAdminEventLog(),
    ])

    await page.goto(`/cluster/${uuid}`)

    const clusterPage = await ClusterPage.verifyOnPage(page, uuid)

    await clusterPage.verifyBackButtonText('Back')

    await clusterPage.verifyInsetHintInformation('Click on the node links on the graph to display matching statistics.')
  })
})
