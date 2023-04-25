import { renderWithProviders } from '../../../utils/test-utils'
import SuburbActions from './SuburbActions'

describe('<SuburbActions />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(renderWithProviders(<SuburbActions id={1} />));
  })
})