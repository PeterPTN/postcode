import { SuburbInformationProps } from '../../../../types/SuburbInformationProps'
import styles from './SuburbInformation.module.scss'

const SuburbInformation = ({ population, name, postcode }: SuburbInformationProps) => {
  const formattedPopulation = population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <div className={styles.suburbInformation}>
      <h3>{name}</h3>
      <p>Population: {formattedPopulation}</p>
      <p>Postcode: {postcode}</p>
    </div>
  )
}

export default SuburbInformation