import { expect, type Locator, type Page } from '@playwright/test'
import AbstractPage from './abstractPage'

export default class ClusterPage extends AbstractPage {
  readonly header: Locator

  readonly backButton: Locator

  private constructor(page: Page) {
    super(page)
    this.header = page.locator('h1')
    this.backButton = page.locator('.govuk-back-link')
  }

  static async verifyOnPage(page: Page, uuid: string): Promise<ClusterPage> {
    const clusterPage = new ClusterPage(page)
    await expect(clusterPage.header).toHaveText(`UUID: ${uuid}`)
    return clusterPage
  }

  async verifyBackButtonText(expected: string): Promise<void> {
    await expect(this.backButton).toHaveText(expected)
  }

  async verifyRecordCompositionTableHeader(index: number, expected: string): Promise<void> {
    const header = this.page.locator(`#record-composition-table tr th:nth-of-type(${index})`)
    await expect(header).toHaveText(expected)
  }

  async verifyRecordCompositionTableRow(rowIndex: number, columnIndex: number, expected: string): Promise<void> {
    const row = this.page.locator(
      `#record-composition-table tbody .govuk-table__row:nth-of-type(${rowIndex}) td:nth-of-type(${columnIndex})`,
    )
    await expect(row).toHaveText(expected)
  }

  async verifyInsetHintInformation(expected: string) {
    const hint = this.page.locator('.inset-information')
    await expect(hint).toHaveText(expected)
  }

  async verifyEventLogTableHeader(index: number, expected: string) {
    const logHeader = this.page.locator(`#event-log-table tr th:nth-of-type(${index})`)
    await expect(logHeader).toHaveText(expected)
  }

  async verifyEventLogTableRow(rowIndex: number, columnIndex: number, expected: string) {
    const row = this.page.locator(
      `#event-log-table tbody .govuk-table__row:nth-of-type(${rowIndex}) td:nth-of-type(${columnIndex})`,
    )
    await expect(row).toHaveText(expected)
  }

  async clickBackButton() {
    this.backButton.click()
  }
}
