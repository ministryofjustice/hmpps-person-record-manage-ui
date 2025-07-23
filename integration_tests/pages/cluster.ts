import Page, { PageElement } from './page'

export default class ClusterPage extends Page {
  constructor() {
    super(`UUID: 1234`)
  }

  getUuidHeader = (): PageElement => cy.get('h1.govuk-heading-l')
}
