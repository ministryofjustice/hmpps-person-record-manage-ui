import { test } from '@playwright/test'
import personRecordApi from '../mockApis/personRecordApi'

import { login, resetStubs } from '../testUtils'
import HomePage from '../pages/homePage'
import ClusterPage from '../pages/clusterPage'

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
  //
  // test('Unauthenticated user navigating to sign in page directed to auth', async ({ page }) => {
  //   await hmppsAuth.stubSignInPage()
  //   await page.goto('/sign-in')
  //
  //   await expect(page.getByRole('heading')).toHaveText('Sign in')
  // })
  //
  // test('User name visible in header', async ({ page }) => {
  //   await login(page, { name: 'A TestUser' })
  //
  //   const homePage = await HomePage.verifyOnPage(page)
  //
  //   await expect(homePage.usersName).toHaveText('A. Testuser')
  // })
  //
  // test('Phase banner visible in header', async ({ page }) => {
  //   await login(page)
  //
  //   const homePage = await HomePage.verifyOnPage(page)
  //
  //   await expect(homePage.phaseBanner).toHaveText('dev')
  // })
  //
  // test('User can sign out', async ({ page }) => {
  //   await login(page)
  //
  //   const homePage = await HomePage.verifyOnPage(page)
  //   await homePage.signOut()
  //
  //   await expect(page.getByRole('heading')).toHaveText('Sign in')
  // })
  //
  // test('User can manage their details', async ({ page }) => {
  //   await login(page, { name: 'A TestUser' })
  //
  //   await hmppsAuth.stubManageDetailsPage()
  //
  //   const homePage = await HomePage.verifyOnPage(page)
  //   await homePage.clickManageUserDetails()
  //
  //   await expect(page.getByRole('heading')).toHaveText('Your account details')
  // })
  //
  // test('Token verification failure takes user to sign in page', async ({ page }) => {
  //   await login(page, { active: false })
  //
  //   await expect(page.getByRole('heading')).toHaveText('Sign in')
  // })
  //
  // test('Token verification failure clears user session', async ({ page }) => {
  //   await login(page, { name: 'A TestUser', active: false })
  //
  //   await expect(page.getByRole('heading')).toHaveText('Sign in')
  //
  //   await login(page, { name: 'Some OtherTestUser', active: true })
  //
  //   const homePage = await HomePage.verifyOnPage(page)
  //   await expect(homePage.usersName).toHaveText('S. Othertestuser')
  // })
})
