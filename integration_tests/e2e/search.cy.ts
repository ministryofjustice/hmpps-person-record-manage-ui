import IndexPage from '../pages'
import ClusterPage from '../pages/cluster'
import Page from '../pages/page'

context('Search', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()
  })

  it('search for a cluster which exists shows the cluster', () => {
    const uuid = '1234'

    cy.task('stubPersonRecordGetAdminCluster', { uuid })
    cy.task('stubPersonRecordGetAdminEventLog', { uuid })

    cy.visit(`/`)
    const indexPage = Page.verifyOnPage(IndexPage, uuid)
    indexPage.searchFor(uuid)

    const clusterPage = Page.verifyOnPage(ClusterPage, uuid)
    clusterPage.getUuidHeader().contains(`UUID: ${uuid}`)
    clusterPage.getBackButton().contains('Back')
    clusterPage.getRecordCompositionTableHeader(1).contains('Source System ID')
    clusterPage.getRecordCompositionTableHeader(2).contains('Name')
    clusterPage.getRecordCompositionTableHeader(3).contains('Source System')
    clusterPage.getRecordCompositionRow(1).contains('Jane c Doe')
    clusterPage.getRecordCompositionRow(1).contains('1234')
    clusterPage.getRecordCompositionRow(1).contains('DELIUS')
    clusterPage.getRecordCompositionRow(2).contains('John d Smith')
    clusterPage.getRecordCompositionRow(2).contains('4321')
    clusterPage.getRecordCompositionRow(2).contains('NOMIS')
  })

  it('search with no results redirects to index page and shows no results found error message', () => {
    cy.task('stubPersonRecordGetAdminCluster', { httpStatus: 404, uuid: 'notfounduuid' })
    cy.visit(`/`)

    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.getErrorMessage().should('not.exist')
    indexPage.searchFor('notfounduuid')

    Page.verifyOnPage(IndexPage)

    indexPage.getErrorMessage().contains('No results found')
  })
})
