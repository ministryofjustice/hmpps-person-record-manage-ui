import { expect, type Locator, type Page } from '@playwright/test'
import AbstractPage from './abstractPage'

export default class HomePage extends AbstractPage {
  readonly header: Locator

  readonly uuidSearchForm: Locator

  readonly uuidSearchSubmit: Locator

  readonly errorMessage: Locator

  readonly uuidErrorMessage: Locator

  private constructor(page: Page) {
    super(page)
    this.header = page.locator('h1', { hasText: 'Search' })
    this.uuidSearchForm = page.locator('#uuid')
    this.uuidSearchSubmit = page.locator('#search-uuid button')
    this.errorMessage = page.locator('.govuk-error-message')
    this.uuidErrorMessage = page.locator('#uuid-error')
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

  async verifyNoErrorMessage(): Promise<void> {
    await expect(this.errorMessage).not.toBeVisible()
  }

  async verifyUUIDErrorMessage(): Promise<void> {
    await expect(this.uuidErrorMessage).toHaveText('Error: No results found')
  }
}
