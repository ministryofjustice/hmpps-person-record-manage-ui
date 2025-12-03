import { test } from '@playwright/test'
import personRecordApi from '../mockApis/personRecordApi'

import { login, resetStubs } from '../testUtils'
import HomePage from '../pages/homePage'


test.describe('Needs Attention', () => {
  test.afterEach(async () => {
    await resetStubs()
  })
  test.beforeEach(async ({ page }) => {
    await login(page, { name: 'A TestUser' })
    await personRecordApi.stubPersonRecordGetAdminClusters()
  })

  test('pagination has ellipsis with eleven pages', async ({ page }) => {
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await homePage.verifyNeedsAttentionHeader()

    await homePage.verifyCurrentPaginationItem('1')
    await homePage.verifyNonCurrentPaginationItem(2,'2')
    await homePage.verifyNonCurrentPaginationItem(3,'3')
    await homePage.verifyEllipsisPaginationItem(4)
    // indexPage.getPaginationItem(4).should('have.class', 'govuk-pagination__item govuk-pagination__item--ellipsis')
    await homePage.verifyNonCurrentPaginationItem(5,'11')
  })


})
