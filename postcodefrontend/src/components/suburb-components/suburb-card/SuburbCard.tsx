import SuburbActions from './suburb-actions/SuburbActions'
import SuburbInformation from './suburb-information/SuburbInformation'
import styles from './SuburbCard.module.scss'

interface SuburbProps {
    id: number
    name: string
    population: string
    postcode: number
}

const SuburbCard = (props: SuburbProps) => {
    const { id, name, population, postcode } = props;

    return (
        <div className={styles.suburbCard} >
            <SuburbInformation name={name} population={population} postcode={postcode} />
            <SuburbActions id={id} />
        </div>
    )
}

export default SuburbCard