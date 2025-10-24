import IndexPage from '../pages/index'
import Page from '../pages/page'

context('Needs Attention', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()
  })

  it('pagination has ellipsis with eleven pages', () => {
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.needsAttentionHeader().contains('Needs Attention Clusters')
    indexPage.getCurrentPaginationItem().contains('1')
    indexPage.getPaginationItem(2).contains('2')
    indexPage.getPaginationItem(2).should('not.have.class', 'govuk-pagination__item--current')
    indexPage.getPaginationItem(3).contains('3')
    indexPage.getPaginationItem(4).should('have.class', 'govuk-pagination__item govuk-pagination__item--ellipsis')
    indexPage.getPaginationItem(5).contains('11')
  })

  it('previous button not shown on page 1', () => {
    cy.visit('/')
    const indexPage = Page.verifyOnPage(IndexPage)
    indexPage.getPreviousLink().should('not.exist')
  })

  it('next button not shown on page 11', () => {
    cy.visit('/')
    const indexPage = Page.verifyOnPage(IndexPage)

    cy.task('stubPersonRecordGetAdminClusters', { page: 11, isLastPage: true })
    // is the 5th element in pagination structure: 1,2,3,...,11
    const nextButtonCheck = indexPage.getPaginationItem(5).click()
    nextButtonCheck.should('not.exist')
  })

  it('Check link on page is correct', () => {
    cy.visit('/')
    const indexPage = Page.verifyOnPage(IndexPage)

    cy.task('stubPersonRecordGetAdminClusters', { page: 3, isLastPage: false })

    // is the 3rd element in pagination structure: 1,2,3,...,11
    indexPage.getPaginationItem(3).click()
    Page.verifyOnPage(IndexPage)
    indexPage.getCurrentPaginationItem().contains('3')
  })

  it('Check next link on page is correct', () => {
    cy.visit('/')

    const indexPage = Page.verifyOnPage(IndexPage)

    cy.task('stubPersonRecordGetAdminClusters', { page: 3, isLastPage: false })

    // is the 3rd element in pagination structure: 1,2,3,...,11
    indexPage.getPaginationLink(3).click()

    cy.task('stubVerifyToken', true)

    cy.task('stubPersonRecordGetAdminClusters', { page: 4, isLastPage: false })

    indexPage.getNextLink().click()
    Page.verifyOnPage(IndexPage)
    indexPage.getCurrentPaginationItem().contains('4')
  })

  it('Check previous link on page is correct', () => {
    cy.visit('/')
    const indexPage = Page.verifyOnPage(IndexPage)

    cy.task('stubPersonRecordGetAdminClusters', { page: 3, isLastPage: false })

    // is the 3rd element in pagination structure: 1,2,3,...,11
    indexPage.getPaginationLink(3).click()

    cy.task('stubVerifyToken', true)

    cy.task('stubPersonRecordGetAdminClusters', { page: 2, isLastPage: false })

    indexPage.getPreviousLink().click()
    Page.verifyOnPage(IndexPage)
    indexPage.getCurrentPaginationItem().contains('2')
  })
})
