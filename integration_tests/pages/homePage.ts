import { expect, type Locator, type Page } from '@playwright/test'
import AbstractPage from './abstractPage'
import { SEARCH_TABS, SearchTab } from '../../server/domain/ids/clusterPageIds'

export default class HomePage extends AbstractPage {
  readonly header: Locator

  readonly uuidSearchForm: Locator

  readonly uuidSearchSubmit: Locator

  readonly errorMessage: Locator

  readonly uuidErrorMessage: Locator

  readonly crnErrorMessage: Locator
  readonly prisonErrorMessage: Locator


  private constructor(page: Page) {
    super(page)
    this.header = page.locator('h1', { hasText: 'Search' })
    this.uuidSearchForm = page.locator('#uuid')
    this.uuidSearchSubmit = page.locator('#search-uuid button')
    this.errorMessage = page.locator('.govuk-error-message')
    this.uuidErrorMessage = page.locator('#uuid-error')
    this.crnErrorMessage = page.locator('#crn-error')
    this.prisonErrorMessage = page.locator('#prisonNumber-error')

  }

  static async verifyOnPage(page: Page): Promise<HomePage> {
    const homePage = new HomePage(page)
    await expect(homePage.header).toBeVisible()
    return homePage
  }

  async searchForUUID(uuid: string) {
    await this.uuidSearchForm.fill(uuid)
    await this.uuidSearchSubmit.click()
  }

  private async switchToTab (tab: SearchTab, page: Page) {
    await page.locator(`#tab_${tab}`).click()
  }

  async searchForCRN(crn: string, page: Page){
    await this.switchToTab(SEARCH_TABS.crn, page)
    await page.locator('#crn').fill(crn)
    await page.locator('#search-crn button').click()
  }

  async searchForPrisonNumber(prisonNumber: string, page: Page){
    await this.switchToTab(SEARCH_TABS.prisonNumber, page)
    await page.locator('#prisonNumber').fill(prisonNumber)
    await page.locator('#search-prison-number button').click()
  }

  async verifyNoErrorMessage(){
    await expect(this.errorMessage).not.toBeVisible()
  }

  async verifyUUIDErrorMessage(){
    await expect(this.uuidErrorMessage).toHaveText('Error: No results found')
  }

  async verifyCRNErrorMessage(){
    await expect(this.crnErrorMessage).toHaveText('Error: No results found')
  }

  async verifyPrisonErrorMessage(){
    await expect(this.prisonErrorMessage).toHaveText('Error: No results found')
  }
}
