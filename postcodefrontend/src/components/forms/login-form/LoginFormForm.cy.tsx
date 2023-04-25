import { renderWithProviders } from '../../../utils/test-utils'
import LoginForm from './LoginForm'

describe('<Form />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(renderWithProviders(<LoginForm formType="login" />))
  })
})