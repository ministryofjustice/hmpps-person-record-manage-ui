import Page, { PageElement } from './page'

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

  searchFor = (search: string) => {
    cy.get('#search').type(search)
    cy.get('.moj-search form').submit()
  }

  getErrorMessage = (): PageElement => cy.get('.govuk-error-message')
}
