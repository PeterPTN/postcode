import { renderWithProviders } from '../../../utils/test-utils'
import CreateSuburbForm from './CreateSuburbForm'

describe('<CreateSuburbForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(renderWithProviders(<CreateSuburbForm />))
  })
})