// Needs a cypress.env.json file

describe('Oz Post Admin Page', () => {
  beforeEach(() => {
    cy.visit("/")

    cy.get("#login").type(Cypress.env('login'))
    cy.get("#password").type(Cypress.env('password'))

    cy.get('input[type="submit"]').click()

    cy.contains("Suburb Information")
  })

  it('should render create suburb content on Create Suburb button click', () => {
    cy.get('div button:first').should('have.text', 'Create Suburb')
    cy.contains("Suburb Information")

    cy.get('div button:first').click()

    cy.get('div button:first').should('have.text', 'View Suburbs')
    cy.contains("Create Suburb")
  })

  it('should render update form for Suburb card on update button click', () => {
    cy.get('.suburbActions').find('button:first').first().click()

    cy.get('[type="submit"]')
    cy.contains('Cancel').click()
  })

  it('should call the delete function when clicked', () => {
    cy.intercept('DELETE', 'http://localhost:8080/suburb/*', {
      statusCode: 204,
    }
    ).as('deleteRequest')

    cy.get('.suburbActions').find('button').last().click()

    cy.wait('@deleteRequest').should(({ request }) => {
      expect(request.method).to.equal('DELETE')
    })
  })
  
})