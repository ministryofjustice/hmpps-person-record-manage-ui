import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor() {
    super('Search')
  }

  needsAttentionHeader = (): PageElement => cy.get('h2')

  getPaginationLink = (index: number): PageElement => cy.get(`.govuk-pagination li:nth-of-type(${index}) a`)

  getPaginationItem = (index: number): PageElement => cy.get(`.govuk-pagination li:nth-of-type(${index})`)

  getCurrentPaginationItem = (): PageElement => cy.get(`.govuk-pagination__item--current`)
}
