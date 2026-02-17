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

  readonly needsAttentionHeader: Locator

  readonly currentPaginationItem: Locator

  readonly previousLink: Locator

  readonly nextLink: Locator

  readonly forReviewTab: Locator

  readonly assignedTab: Locator

  readonly resolvedTab: Locator

  readonly needsAttentionTable: Locator

  readonly notAssignedMessage: Locator

  readonly notResolvedMessage: Locator

  private constructor(page: Page) {
    super(page)
    this.header = page.locator('h1', { hasText: 'Search' })
    this.uuidSearchForm = page.locator('#uuid')
    this.uuidSearchSubmit = page.locator('#search-uuid button')
    this.errorMessage = page.locator('.govuk-error-message')
    this.uuidErrorMessage = page.locator('#uuid-error')
    this.crnErrorMessage = page.locator('#crn-error')
    this.prisonErrorMessage = page.locator('#prisonNumber-error')
    this.prisonErrorMessage = page.locator('#prisonNumber-error')
    this.needsAttentionHeader = page.locator('h2.govuk-heading-m')
    this.currentPaginationItem = page.locator(`.govuk-pagination__item--current`)
    this.previousLink = page.locator(`.govuk-pagination__prev a`)
    this.nextLink = page.locator(`.govuk-pagination__next a`)
    this.forReviewTab = page.locator('#tab_needs-attention-for-review')
    this.assignedTab = page.locator('#tab_needs-attention-assigned')
    this.resolvedTab = page.locator('#tab_needs-attention-resolved')
    this.needsAttentionTable = page.locator('#needs-attention-for-review')
    this.notAssignedMessage = page.locator('#needs-attention-assigned > p:nth-child(1)')
    this.notResolvedMessage = page.locator('#needs-attention-resolved > p:nth-child(1)')
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

  private async switchToTab(tab: SearchTab, page: Page) {
    await page.locator(`#tab_${tab}`).click()
  }

  async searchForCRN(crn: string, page: Page) {
    await this.switchToTab(SEARCH_TABS.crn, page)
    await page.locator('#crn').fill(crn)
    await page.locator('#search-crn button').click()
  }

  async searchForPrisonNumber(prisonNumber: string, page: Page) {
    await this.switchToTab(SEARCH_TABS.prisonNumber, page)
    await page.locator('#prisonNumber').fill(prisonNumber)
    await page.locator('#search-prison-number button').click()
  }

  async verifyNoErrorMessage() {
    await expect(this.errorMessage).not.toBeVisible()
  }

  async verifyUUIDErrorMessage() {
    await expect(this.uuidErrorMessage).toHaveText('Error: No results found')
  }

  async verifyCRNErrorMessage() {
    await expect(this.crnErrorMessage).toHaveText('Error: No results found')
  }

  async verifyPrisonErrorMessage() {
    await expect(this.prisonErrorMessage).toHaveText('Error: No results found')
  }

  async verifyNeedsAttentionHeader() {
    await expect(this.needsAttentionHeader).toHaveText('Needs Attention Clusters:')
  }

  async verifyNeedsAttentionTabsVisible() {
    await expect(this.forReviewTab).toBeVisible()
    await expect(this.assignedTab).toBeVisible()
    await expect(this.resolvedTab).toBeVisible()
  }

  async verifyNeedsAttentionTableVisible() {
    await expect(this.needsAttentionTable).toBeVisible()
  }

  async selectForReviewTab() {
    await this.forReviewTab.click()
  }

  async selectAssignedTab() {
    await this.assignedTab.click()
  }

  async verifyNotAssignedText() {
    await expect(this.notAssignedMessage).toHaveText('No assigned clusters yet.')
  }

  async selectResolvedTab() {
    await this.resolvedTab.click()
  }

  async verifyNotResolvedText() {
    await expect(this.notResolvedMessage).toHaveText('No resolved clusters yet.')
  }

  async verifyCurrentPaginationItem(expected: string) {
    await expect(this.currentPaginationItem).toHaveText(expected)
  }

  async verifyNonCurrentPaginationItem(index: number, expected: string) {
    const paginationItem = this.page.locator(`.govuk-pagination li:nth-of-type(${index})`)
    await expect(paginationItem).toHaveText(expected)
    await expect(paginationItem).not.toHaveClass('govuk-pagination__item--current')
  }

  async clickPaginationItem(index: number) {
    await this.page.locator(`.govuk-pagination li:nth-of-type(${index})`).click()
  }

  async verifyEllipsisPaginationItem(index: number) {
    const paginationItem = this.page.locator(`.govuk-pagination li:nth-of-type(${index})`)
    await expect(paginationItem).toHaveClass('govuk-pagination__item govuk-pagination__item--ellipsis')
  }

  async verifyNoPreviousLink() {
    await expect(this.previousLink).not.toBeVisible()
  }

  async verifyNoNextLink() {
    await expect(this.nextLink).not.toBeVisible()
  }

  async clickNext() {
    await this.nextLink.click()
  }

  async clickPrevious() {
    await this.previousLink.click()
  }
}
