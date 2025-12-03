import { expect, type Locator, type Page } from '@playwright/test'
import AbstractPage from './abstractPage'

export default class HomePage extends AbstractPage {
  readonly header: Locator

  readonly uuidSearchForm: Locator

  readonly uuidSearchSubmit: Locator

  private constructor(page: Page) {
    super(page)
    this.header = page.locator('h1', { hasText: 'Search' })
    this.uuidSearchForm = page.locator('#uuid')
    this.uuidSearchSubmit = page.locator('#search-uuid button')
  }

  static async verifyOnPage(page: Page): Promise<HomePage> {
    const homePage = new HomePage(page)
    await expect(homePage.header).toBeVisible()
    return homePage
  }

  async searchForUUID(uuid: string): Promise<void> {
    await this.uuidSearchForm.fill(uuid)
    await this.uuidSearchSubmit.click()
  }
}
