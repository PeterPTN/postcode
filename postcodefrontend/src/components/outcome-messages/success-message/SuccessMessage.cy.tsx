import SuccessMessage from './SuccessMessage'

const successObj = {
  message: "Success"
};

const successString = "Success";

describe('<SuccessMessage />', () => {
  it('renders with success object', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SuccessMessage successObj={successObj} />)
  })

  it('renders with success string', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SuccessMessage successObj={successString} />)
  })
})