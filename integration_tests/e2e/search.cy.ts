import IndexPage from '../pages'
import ClusterPage from '../pages/cluster'
import Page from '../pages/page'
import { SEARCH_TABS } from '../../server/domain/ids/clusterPageIds'

context('Search', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()
  })

  describe('by UUID', () => {
    it('search for a cluster by UUID which exists shows the cluster', () => {
      const uuid = '1234'

      cy.task('stubPersonRecordGetAdminClusterByUUID', { uuid })
      cy.task('stubPersonRecordGetAdminEventLog', { uuid })

      cy.visit(`/`)
      const indexPage = Page.verifyOnPage(IndexPage, uuid)
      indexPage.searchForUUID(uuid)

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

    it('search by UUID with no results redirects to index page and shows no results found error message', () => {
      cy.task('stubPersonRecordGetAdminClusterByUUID', { httpStatus: 404, uuid: 'notfounduuid' })
      cy.visit(`/`)

      const indexPage = Page.verifyOnPage(IndexPage)
      indexPage.getErrorMessage().should('not.exist')
      indexPage.searchForUUID('notfounduuid')

      Page.verifyOnPage(IndexPage)

      indexPage.getErrorMessage().contains('No results found')
    })
  })

  describe('by CRN', () => {
    it('search for a cluster by CRN which exists shows the cluster', () => {
      const uuid = '123456'
      const crn = 'X12345'
      cy.task('stubPersonRecordGetAdminClusterByCRN', { crn })
      cy.task('stubPersonRecordGetAdminEventLog', { uuid })

      cy.visit(`/`)
      const indexPage = Page.verifyOnPage(IndexPage, uuid)
      indexPage.switchToTab(SEARCH_TABS.crn)
      indexPage.searchForCRN(crn)

      const clusterPage = Page.verifyOnPage(ClusterPage, uuid)
      clusterPage.getUuidHeader().contains(`UUID: ${uuid}`)
    })

    it('search by CRN with no results redirects to index page and shows no results found error message', () => {
      cy.task('stubPersonRecordGetAdminClusterByCRN', { httpStatus: 404, crn: 'notfounduuid' })
      cy.visit(`/`)

      const indexPage = Page.verifyOnPage(IndexPage)
      indexPage.switchToTab(SEARCH_TABS.crn)
      indexPage.searchForCRN('notfounderror')

      Page.verifyOnPage(IndexPage)

      indexPage.getErrorMessage().contains('No results found')
    })
  })

  describe('by Prison Number', () => {
    it('search for a cluster by Prison Number which exists shows the cluster', () => {
      const uuid = '123456'
      const prisonNumber = 'A12345'
      cy.task('stubPersonRecordGetAdminClusterByPrisonNumber', { prisonNumber })
      cy.task('stubPersonRecordGetAdminEventLog', { uuid })

      cy.visit(`/`)
      const indexPage = Page.verifyOnPage(IndexPage, uuid)
      indexPage.switchToTab(SEARCH_TABS.prisonNumber)
      indexPage.searchForPrisonNumber(prisonNumber)

      const clusterPage = Page.verifyOnPage(ClusterPage, uuid)
      clusterPage.getUuidHeader().contains(`UUID: ${uuid}`)
    })

    it('search by Prison Number with no results redirects to index page and shows no results found error message', () => {
      cy.task('stubPersonRecordGetAdminClusterByPrisonNumber', { httpStatus: 404, uuid: 'notfounduuid' })
      cy.visit(`/`)

      const indexPage = Page.verifyOnPage(IndexPage)
      indexPage.switchToTab(SEARCH_TABS.prisonNumber)
      indexPage.searchForPrisonNumber('notfounderror')

      Page.verifyOnPage(IndexPage)

      indexPage.getErrorMessage().contains('No results found')
    })
  })
})
