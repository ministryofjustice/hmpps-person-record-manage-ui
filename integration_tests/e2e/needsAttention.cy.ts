import IndexPage from '../pages/index'
import AuthSignInPage from '../pages/authSignIn'
import Page from '../pages/page'

context('Needs Attention', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn', { roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })
  })

  it('pagination has eleven pages', () => {
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    cy.task('stubVerifyToken', false)

    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.needsAttentionHeader().contains('Needs Attention Clusters')
    indexPage.getCurrentPaginationItem().contains('1')
    indexPage.getPaginationItem(2).contains('2')
    indexPage.getPaginationItem(2).should('not.have.class', 'govuk-pagination__item--current')
    indexPage.getPaginationItem(3).contains('3')
    indexPage.getPaginationItem(4).contains('4')
    indexPage.getPaginationItem(4).contains('4')
    indexPage.getPaginationItem(5).contains('5')
    indexPage.getPaginationItem(6).contains('6')
    indexPage.getPaginationItem(7).contains('7')
    indexPage.getPaginationItem(8).contains('8')
    indexPage.getPaginationItem(9).contains('9')
    indexPage.getPaginationItem(10).contains('10')
    indexPage.getPaginationItem(11).contains('11')
  })

  it('previous button not shown on page 1', () => {
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    cy.task('stubVerifyToken', false)

    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.getPreviousLink().should('not.exist')
  })

  it('next button not shown on page 11', () => {
    cy.task('stubPersonRecordGetAdminClusters', { page: 11, isLastPage: true })
    cy.signIn()
    const indexPage = Page.verifyOnPage(IndexPage)
    cy.task('stubVerifyToken', false)

    cy.visit('/')
    Page.verifyOnPage(AuthSignInPage)

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()

    const indexPage = Page.verifyOnPage(IndexPage)

    indexPage.getNextLink().should('not.exist')
  })
})
