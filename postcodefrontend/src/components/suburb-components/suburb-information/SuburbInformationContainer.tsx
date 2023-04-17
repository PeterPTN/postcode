import SuburbActions from '../suburb-actions/SuburbActions'
import SuburbEntity from '../../../types/SuburbEntity'
import styles from './SuburbInformationContainer.module.scss'

const SuburbInformationContainer = (props: SuburbEntity) => {
  const formattedPopulation = props.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <>
      <div className={styles.suburbInformationContainer}>
        <h3>{props.name}</h3>
        <p>Population: {formattedPopulation}</p>
        <p>Postcode: {props.postcode}</p>
      </div>

      <SuburbActions id={props.id} />
    </>
  )
}

export default SuburbInformationContainer