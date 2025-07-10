import Page, { PageElement } from './page'

export default class IndexPage extends Page {
  constructor() {
    super('Search')
  }

  needsAttentionHeader = (): PageElement => cy.get('h2')
}
