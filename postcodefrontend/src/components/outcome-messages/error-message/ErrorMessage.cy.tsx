import ErrorMessage from './ErrorMessage'

const errorObject = {
  message: "This is an error"
}

const errorMessage = "This is an error"

describe('<ErrorMessage />', () => {
  it('renders with error object', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ErrorMessage errorObj={errorObject} />)
  })

  it('renders with error string', () => {
    cy.mount(<ErrorMessage errorObj={errorMessage} />)
  })
})