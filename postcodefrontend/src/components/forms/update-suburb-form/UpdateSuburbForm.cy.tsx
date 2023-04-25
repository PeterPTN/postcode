import { renderWithProviders } from '../../../utils/test-utils'
import { mockSuburb } from '../../../constants/MockSuburb'
import UpdateSuburbForm from './UpdateSuburbForm'

describe('<UpdateSuburbForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(renderWithProviders(<UpdateSuburbForm {...mockSuburb} />))
  })
})