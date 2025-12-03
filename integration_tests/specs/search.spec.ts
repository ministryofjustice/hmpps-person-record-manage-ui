import { test } from '@playwright/test'
import personRecordApi from '../mockApis/personRecordApi'

import { login, resetStubs } from '../testUtils'
import HomePage from '../pages/homePage'
import ClusterPage from '../pages/clusterPage'
import Page from '../pages/page'
import IndexPage from '../pages'

test.describe('Search', () => {
  test.afterEach(async () => {
    await resetStubs()
  })
  test.beforeEach(async ({ page }) => {
    await login(page, { name: 'A TestUser' })
  })

  test('search for a cluster by UUID which exists shows the cluster', async ({ page }) => {
    const uuid = '1234'
    await Promise.all([
      personRecordApi.stubPersonRecordGetAdminClusterByUUID(),
      personRecordApi.stubPersonRecordGetAdminEventLog(),
    ])
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await homePage.searchForUUID(uuid)

    const clusterPage = await ClusterPage.verifyOnPage(page, uuid)
    await clusterPage.verifyBackButtonText('Back')
    await clusterPage.verifyRecordCompositionTableHeader(1, 'Source System ID')
    await clusterPage.verifyRecordCompositionTableHeader(2, 'Name')
    await clusterPage.verifyRecordCompositionTableHeader(3, 'Source System')
    await clusterPage.verifyRecordCompositionTableRow(1, 2, 'Jane c Doe')
    await clusterPage.verifyRecordCompositionTableRow(1, 1, '1234')
    await clusterPage.verifyRecordCompositionTableRow(1, 3, 'DELIUS')
    await clusterPage.verifyRecordCompositionTableRow(2, 2, 'John d Smith')
    await clusterPage.verifyRecordCompositionTableRow(2, 1, '4321')
    await clusterPage.verifyRecordCompositionTableRow(2, 3, 'NOMIS')
  })

  test('search by UUID with no results redirects to index page and shows no results found error message', async ({
    page,
  }) => {
    const notFoundUUID = 'notfounduuid'
    await personRecordApi.stubPersonRecordGetAdminClusterByUUID({ httpStatus: 404, uuid: notFoundUUID })
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await homePage.verifyNoErrorMessage()
    await homePage.searchForUUID(notFoundUUID)

    await HomePage.verifyOnPage(page)

    await homePage.verifyUUIDErrorMessage()
  })

  test('search for a cluster by CRN which exists shows the cluster', async ({ page,
                                                                            }) => {
    const uuid = '123456'
    const crn = 'X987654'
    await personRecordApi.stubPersonRecordGetAdminClusterByCRN({ httpStatus: 200, crn })
    await personRecordApi.stubPersonRecordGetAdminEventLog({httpStatus: 200, uuid})

    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await homePage.searchForCRN(crn, page)
    ClusterPage.verifyOnPage(page, uuid)
  })
})
