// Ensure server is running before testing
describe('Oz Post Login Page', () => {
  beforeEach(() => {
    cy.visit("/")
    cy.contains("Oz Post")
  })

  it('should authenticate valid user and navigate to Admin Page', () => {
    cy.get("#login").type("johnny")
    cy.get("#password").type("password1")

    cy.get("#login").should("have.value", "johnny")
    cy.get("#password").should("have.value", "password1")

    cy.get('input[type="submit"]').click()

    cy.contains("Suburb Information")
  })

  it("should display errors on missing inputs", () => {
    cy.get('input[type="submit"]').click()

    cy.contains("Login is required")
    cy.contains("Password is required")
  })

  it("should deny invalid login/password attempt and display error", () => {
    cy.get("#login").type("johnny")
    cy.get("#password").type("password")

    cy.get("#login").should("have.value", "johnny")
    cy.get("#password").should("have.value", "password")

    cy.get('input[type="submit"]').click()

    cy.contains("Incorrect login or password")
  })
})