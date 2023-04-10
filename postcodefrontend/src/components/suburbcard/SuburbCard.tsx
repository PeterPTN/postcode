import { SuburbCardProps } from '../../types/SuburbCardProps'

const SuburbCard = ({ population, name, postcode }: SuburbCardProps) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>Population: {population}</p>
      <p>Postcode: {postcode}</p>
    </div>
  )
}

export default SuburbCard