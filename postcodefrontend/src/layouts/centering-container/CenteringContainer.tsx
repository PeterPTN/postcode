import { ReactNode } from 'react'
import styles from './CenteringContainer.module.scss'

const CenteringContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.centeringContainer}>
            {children}
        </div>
    )
}

export default CenteringContainer