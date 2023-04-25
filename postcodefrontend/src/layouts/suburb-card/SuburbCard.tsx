import { ReactNode } from 'react'
import styles from './SuburbCard.module.scss'

const SuburbCard = ({children} : {children: ReactNode}) => {
    return (
        <div className={styles.suburbCard} >
            {children}
        </div>
    )
}

export default SuburbCard