import Page, { PageElement } from './page'
import { SEARCH_TABS, SearchTab } from '../../server/domain/ids/clusterPageIds'

export default class IndexPage extends Page {
  constructor() {
    super('Search')
  }

  needsAttentionHeader = (): PageElement => cy.get('h2')

  getPaginationLink = (index: number): PageElement => cy.get(`.govuk-pagination li:nth-of-type(${index}) a`)

  getPaginationItem = (index: number): PageElement => cy.get(`.govuk-pagination li:nth-of-type(${index})`)

  getPreviousLink = (): PageElement => cy.get(`.govuk-pagination__prev a`)

  getNextLink = (): PageElement => cy.get(`.govuk-pagination__next a`)

  getCurrentPaginationItem = (): PageElement => cy.get(`.govuk-pagination__item--current`)

  searchForUUID = (uuid: string) => {
    cy.get('#uuid').type(uuid)
    cy.get('.moj-search form#search-uuid').submit()
  }

  searchForCRN = (crn: string) => {
    this.switchToTab(SEARCH_TABS.crn)
    cy.get('#crn').type(crn)
    cy.get('.moj-search form#search-crn').submit()
  }

  searchForPrisonNumber = (crn: string) => {
    this.switchToTab(SEARCH_TABS.prisonNumber)
    cy.get('#prisonNumber').type(crn)
    cy.get('.moj-search form#search-prison-number').submit()
  }

  private switchToTab = (tab: SearchTab) => {
    cy.get('.govuk-tabs__tab').get(`#tab_${tab}`).click()
  }

  getErrorMessage = (): PageElement => cy.get('.govuk-error-message')
}
