import { renderWithProviders } from '../../../utils/test-utils'
import { mockSuburb } from '../../../constants/MockSuburb'
import SuburbInformationContainer from './SuburbInformationContainer'

describe('<SuburbInformationContainer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(renderWithProviders(
      <SuburbInformationContainer
        id={mockSuburb.id}
        name={mockSuburb.name}
        population={mockSuburb.population}
        postcode={mockSuburb.postcode}
      />))
  })
})