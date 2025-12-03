import { test } from '@playwright/test'
import personRecordApi from '../mockApis/personRecordApi'

import { login, resetStubs } from '../testUtils'
import ClusterPage from '../pages/clusterPage'
import HomePage from '../pages/homePage'

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

  test('cluster view shows event logs', async ({ page }) => {
    const uuid = '1234'
    await Promise.all([
      personRecordApi.stubPersonRecordGetAdminClusterByUUID(),
      personRecordApi.stubPersonRecordGetAdminEventLog(),
    ])

    await page.goto(`/cluster/${uuid}`)

    const clusterPage = await ClusterPage.verifyOnPage(page, uuid)

    await clusterPage.verifyEventLogTableHeader(1, 'Event Timestamp')
    await clusterPage.verifyEventLogTableHeader(2, 'Status')
    await clusterPage.verifyEventLogTableHeader(3, 'Event Type')
    await clusterPage.verifyEventLogTableHeader(4, 'Source System ID')
    await clusterPage.verifyEventLogTableHeader(5, 'Master Defendant ID')
    await clusterPage.verifyEventLogTableHeader(6, 'First Name')
    await clusterPage.verifyEventLogTableHeader(7, 'First Name Aliases')
    await clusterPage.verifyEventLogTableHeader(8, 'Middle Names')
    await clusterPage.verifyEventLogTableHeader(9, 'Last Name')
    await clusterPage.verifyEventLogTableHeader(10, 'Last Name Aliases')
    await clusterPage.verifyEventLogTableHeader(11, 'Date Of Birth')
    await clusterPage.verifyEventLogTableHeader(12, 'Date Of Birth Aliases')
    await clusterPage.verifyEventLogTableHeader(13, 'Postcodes')
    await clusterPage.verifyEventLogTableHeader(14, 'CROs')
    await clusterPage.verifyEventLogTableHeader(15, 'PNCs')
    await clusterPage.verifyEventLogTableHeader(16, 'Record Merged To')
    await clusterPage.verifyEventLogTableHeader(17, 'Sentence Dates')
    await clusterPage.verifyEventLogTableHeader(18, 'Override Marker')
    await clusterPage.verifyEventLogTableHeader(19, 'Override Scopes')
    await clusterPage.verifyEventLogTableHeader(20, 'Source System')

    await clusterPage.verifyEventLogTableRow(1, 1, '2025-05-12 10:37:56.087296')
    await clusterPage.verifyEventLogTableRow(1, 2, 'Active')
    await clusterPage.verifyEventLogTableRow(1, 3, 'Record Created')
    await clusterPage.verifyEventLogTableRow(1, 4, '1234')
    await clusterPage.verifyEventLogTableRow(1, 5, '6639fd43-9d01-450a-87be-557bd3bcf48e')
    await clusterPage.verifyEventLogTableRow(1, 6, 'John')
    await clusterPage.verifyEventLogTableRow(1, 7, 'jon, jonny')
    await clusterPage.verifyEventLogTableRow(1, 8, 'c')
    await clusterPage.verifyEventLogTableRow(1, 9, 'Doe')
    await clusterPage.verifyEventLogTableRow(1, 10, 'Doe, Dow')
    await clusterPage.verifyEventLogTableRow(1, 11, '1970-Jan-01')
    await clusterPage.verifyEventLogTableRow(1, 12, '1970-Feb-01, 1970-Mar')
    await clusterPage.verifyEventLogTableRow(1, 13, 'SW1, SW2')
    await clusterPage.verifyEventLogTableRow(1, 15, '123, 456')
    await clusterPage.verifyEventLogTableRow(1, 14, 'abc, def')
    await clusterPage.verifyEventLogTableRow(1, 16, 'abc-123')
    await clusterPage.verifyEventLogTableRow(1, 17, '2025-Jan-01, 20205-Mar-01')
    await clusterPage.verifyEventLogTableRow(1, 18, '6639fd43-9d01-450a-87be-557bd3bcf47d')
    await clusterPage.verifyEventLogTableRow(1, 19, '123, 321')
    await clusterPage.verifyEventLogTableRow(1, 20, 'DELIUS')

    await clusterPage.verifyEventLogTableRow(2, 2, 'Review')
    await clusterPage.verifyEventLogTableRow(2, 3, 'Record Updated')
  })

  test('back button navigates to index page', async ({ page }) => {
    const uuid = '1234'
    await Promise.all([
      personRecordApi.stubPersonRecordGetAdminClusterByUUID(),
      personRecordApi.stubPersonRecordGetAdminEventLog(),
    ])

    await page.goto(`/cluster/${uuid}`)

    const clusterPage = await ClusterPage.verifyOnPage(page, uuid)

    await clusterPage.verifyBackButtonText('Back')
    await clusterPage.clickBackButton()
    await HomePage.verifyOnPage(page)
  })
})
