import Page, { PageElement } from './page'

export default class ClusterPage extends Page {
  constructor(uuid: string) {
    super(`UUID: ${uuid}`)
  }

  getUuidHeader = (): PageElement => cy.get('h1.govuk-heading-l')

  getBackButton = (): PageElement => cy.get('.govuk-back-link')

  getRecordCompositionTableHeader = (index: number): PageElement =>
    cy.get(`#record-composition-table tr th:nth-of-type(${index})`)

  getRecordCompositionRow = (index: number): PageElement =>
    cy.get(`#record-composition-table .govuk-table__row:nth-of-type(${index})`)

  getInsetInformationHint = (): PageElement => cy.get(`.inset-information`)

  getEventLogTableHeader = (index: number): PageElement => cy.get(`#event-log-table tr th:nth-of-type(${index})`)

  getEventLogTableRow = (index: number): PageElement =>
    cy.get(`#event-log-table .govuk-table__row:nth-of-type(${index})`)
}
