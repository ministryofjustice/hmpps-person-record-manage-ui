import IndexPage from '../pages/index'
import Page from '../pages/page'

context('Needs Attention', () => {
  

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
