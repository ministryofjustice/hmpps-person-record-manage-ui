import { test } from '@playwright/test'
import personRecordApi from '../mockApis/personRecordApi'

import { login, resetStubs } from '../testUtils'
import HomePage from '../pages/homePage'

test.describe('Home', () => {
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
    await homePage.selectForReviewTab()
    await homePage.verifyNeedsAttentionHeader()
    await homePage.verifyNeedsAttentionTabsVisible()
    await homePage.verifyNeedsAttentionTableVisible()
    await homePage.verifyCurrentPaginationItem('1')
    await homePage.verifyNonCurrentPaginationItem(2, '2')
    await homePage.verifyNonCurrentPaginationItem(3, '3')
    await homePage.verifyEllipsisPaginationItem(4)
    await homePage.verifyNonCurrentPaginationItem(5, '11')
  })

  test('previous button not shown on first page', async ({ page }) => {
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    homePage.verifyNoPreviousLink()
  })

  test('check assigned tab contains not assigned message', async ({ page }) => {
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await homePage.selectAssignedTab()
    await homePage.verifyNotAssignedText()
  })

  test('check resolved tab contains not resolved message', async ({ page }) => {
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await homePage.selectResolvedTab()
    await homePage.verifyNotResolvedText()
  })

  test('next button not shown on last page', async ({ page }) => {
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await personRecordApi.stubPersonRecordGetAdminClusters({ httpStatus: 200, page: 11, isLastPage: true })
    // is the 5th element in pagination structure: 1,2,3,...,11
    await homePage.clickPaginationItem(5)
    await homePage.verifyCurrentPaginationItem('11')
    await homePage.verifyNoNextLink()
  })

  test('Check next and previous links on page are correct', async ({ page }) => {
    await page.goto('/')
    const homePage = await HomePage.verifyOnPage(page)
    await personRecordApi.stubPersonRecordGetAdminClusters({ httpStatus: 200, page: 3, isLastPage: false })
    await homePage.clickPaginationItem(3)
    await personRecordApi.stubPersonRecordGetAdminClusters({ httpStatus: 200, page: 4, isLastPage: false })

    await homePage.clickNext()
    await homePage.verifyCurrentPaginationItem('4')

    await homePage.clickPrevious()
    await homePage.verifyCurrentPaginationItem('3')
  })
})
