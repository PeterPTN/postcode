import { renderWithProviders } from '../../../utils/test-utils'
import RegisterForm from './RegisterForm'

describe('<Form />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(renderWithProviders(<RegisterForm formType="register" />))
  })
})