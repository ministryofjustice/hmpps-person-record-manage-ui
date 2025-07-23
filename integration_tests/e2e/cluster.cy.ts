import ClusterPage from '../pages/cluster'
import AuthSignInPage from '../pages/authSignIn'
import Page from '../pages/page'

context('Cluster view', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn', { roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })
  })

  it('cluster view shows record', () => {
    cy.task('stubPersonRecordGetAdminCluster', { uuid: '1234' })
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.signIn()
    cy.task('stubVerifyToken', false)

    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()

    cy.visit('/cluster/1234')

    const clusterPage = Page.verifyOnPage(ClusterPage)
    clusterPage.getUuidHeader().contains('UUID: 1234')
  })
})
