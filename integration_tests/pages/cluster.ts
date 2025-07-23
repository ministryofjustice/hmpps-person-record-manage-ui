import Page, { PageElement } from './page'

export default class ClusterPage extends Page {
  constructor(uuid: string) {
    super(`UUID: ${uuid}`)
  }

  getUuidHeader = (): PageElement => cy.get('h1.govuk-heading-l')

  getBackButton = (): PageElement => cy.get('.govuk-back-link')

  getRecordCompositionTableHeader = (index: number): PageElement => cy.get(`tr th:nth-of-type(${index})`)

  getRecordCompositionRow = (index: number): PageElement => cy.get(`.govuk-table__row:nth-of-type(${index})`)
}
