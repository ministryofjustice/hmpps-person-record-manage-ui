context('Example feature', () => {
  beforeEach(() => {
    cy.task('reset')
    cy.task('stubSignIn', { roles: ['ROLE_PERSON_RECORD_MANAGE__ADMIN'] })
  })

  // it('Time from exampleApi is visible on page', () => {
  //   cy.task('stubExampleTime')
  //   cy.signIn()

  //   cy.get('#timestamp').contains('The time is currently 2025-01-01T12:00:00Z')
  // })

  // it('ExampleApi failure shows error page with custom error message', () => {
  //   cy.task('stubExampleTime', 500)

  //   cy.signIn({ failOnStatusCode: false })

  //   cy.get('h1').contains('Internal Server Error')
  // })
})
