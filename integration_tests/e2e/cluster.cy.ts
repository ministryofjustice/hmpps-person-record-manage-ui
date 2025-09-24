import IndexPage from '../pages'
import ClusterPage from '../pages/cluster'
import Page from '../pages/page'

context('Cluster View', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubPersonRecordGetAdminClusters', { page: 1 })

    cy.task('stubVerifyToken', true)
    cy.task('stubSignIn', { name: 'bobby brown', roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })

    cy.signIn()
  })

  it('cluster view shows records', () => {
    const uuid = '1234'

    cy.task('stubPersonRecordGetAdminCluster', { uuid })
    cy.task('stubPersonRecordGetAdminEventLog', { uuid })
    cy.visit(`/cluster/${uuid}`)

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

  it('cluster view shows event logs', () => {
    const uuid = '1234'

    cy.task('stubPersonRecordGetAdminCluster', { uuid })
    cy.task('stubPersonRecordGetAdminEventLog', { uuid })
    cy.visit(`/cluster/${uuid}`)

    const clusterPage = Page.verifyOnPage(ClusterPage, uuid)
    clusterPage.getEventLogTableHeader(1).contains('Event Timestamp')
    clusterPage.getEventLogTableHeader(2).contains('Status')
    clusterPage.getEventLogTableHeader(3).contains('Source System')
    clusterPage.getEventLogTableHeader(4).contains('Event Type')
    clusterPage.getEventLogTableHeader(5).contains('Source System ID')
    clusterPage.getEventLogTableHeader(6).contains('First Name')
    clusterPage.getEventLogTableHeader(7).contains('First Name Aliases')
    clusterPage.getEventLogTableHeader(8).contains('Middle Names')
    clusterPage.getEventLogTableHeader(9).contains('Last Name')
    clusterPage.getEventLogTableHeader(10).contains('Last Name Aliases')
    clusterPage.getEventLogTableHeader(11).contains('Date Of Birth')
    clusterPage.getEventLogTableHeader(12).contains('Date Of Birth Aliases')
    clusterPage.getEventLogTableHeader(13).contains('Postcodes')
    clusterPage.getEventLogTableHeader(14).contains('CROs')
    clusterPage.getEventLogTableHeader(15).contains('PNCs')
    clusterPage.getEventLogTableHeader(16).contains('Record Merged To')
    clusterPage.getEventLogTableHeader(17).contains('Sentence Dates')
    clusterPage.getEventLogTableHeader(18).contains('Override Marker')
    clusterPage.getEventLogTableHeader(19).contains('Override Scopes')

    clusterPage.getEventLogTableRow(1).contains('2025-05-12 10:37:56.087296')
    clusterPage.getEventLogTableRow(1).contains('ACTIVE')
    clusterPage.getEventLogTableRow(1).contains('DELIUS')
    clusterPage.getEventLogTableRow(1).contains('CREATE')
    clusterPage.getEventLogTableRow(1).contains('1234')
    clusterPage.getEventLogTableRow(1).contains('John')
    clusterPage.getEventLogTableRow(1).contains('jon, jonny')
    clusterPage.getEventLogTableRow(1).contains('c')
    clusterPage.getEventLogTableRow(1).contains('Doe')
    clusterPage.getEventLogTableRow(1).contains('Doe, Dow')
    clusterPage.getEventLogTableRow(1).contains('1970-Jan-01')
    clusterPage.getEventLogTableRow(1).contains('1970-Feb-01, 1970-Mar')
    clusterPage.getEventLogTableRow(1).contains('SW1, SW2')
    clusterPage.getEventLogTableRow(1).contains('123, 456')
    clusterPage.getEventLogTableRow(1).contains('abc, def')
    clusterPage.getEventLogTableRow(1).contains('abc-123')
    clusterPage.getEventLogTableRow(1).contains('2025-Jan-01, 20205-Mar-01')
    clusterPage.getEventLogTableRow(1).contains('6639fd43-9d01-450a-87be-557bd3bcf47d')
    clusterPage.getEventLogTableRow(1).contains('123, 321')

    clusterPage.getEventLogTableRow(2).contains('Review')
  })

  it('back button navigates to index page', () => {
    const uuid = '1234'

    cy.task('stubPersonRecordGetAdminCluster', { uuid })
    cy.task('stubPersonRecordGetAdminEventLog', { uuid })
    cy.visit(`/cluster/${uuid}`)

    const clusterPage = Page.verifyOnPage(ClusterPage, uuid)
    clusterPage.getBackButton().click()

    Page.verifyOnPage(IndexPage)
  })
})
