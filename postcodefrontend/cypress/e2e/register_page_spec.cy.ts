describe('Oz Post Register Page', () => {
  beforeEach(() => {
    cy.visit("/register")

    cy.contains("Register")
  })

  it("should post suburb data when submit button is clicked", () => {
    cy.get("#firstName").type("Peter")
    cy.get("#lastName").type("Nguyen")
    cy.get("#login").type("PPTN")
    cy.get("#password").type("password1")
    cy.get("#confirmPassword").type("password1")

    cy.intercept('POST', 'http://localhost:8080/register', {
      statusCode: 200,
      body: { success: true }
    }
    ).as('postRequest')

    cy.get("#submit").click()

    cy.wait("@postRequest").should(({ request, response }) => {
      expect(request.method).to.equal('POST')
      if (response) {
        expect(response.statusCode).to.equal(200);
        expect(response.body.success).to.deep.equal(true);
      }
    })
  })

  it("should display all errors for unfilled mandatory inputs", () => {
    cy.get("#submit").click()
    cy.contains("First name is required")
    cy.contains("Last name is required")
    cy.contains("Login is required")
    cy.contains("Password is required")
    cy.contains("Please re-type your password")
  })

  it("should notify user if login exists for duplicate user properties", () => {
    cy.get("#firstName").type("Johnny")
    cy.get("#lastName").type("Boy")
    cy.get("#login").type("johnny")
    cy.get("#password").type("password1")
    cy.get("#confirmPassword").type("password1")

    cy.get("#submit").click()

    cy.contains("Login already exists")
  })
})