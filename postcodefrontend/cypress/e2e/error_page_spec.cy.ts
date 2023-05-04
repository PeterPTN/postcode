describe('Oz Post Error Page', () => {
  it('should render the error page when given an invalid path', () => {
    cy.visit("/test")

    cy.contains("Sorry!")
  })
})