import { Link } from 'react-router-dom'
import CenteringContainer from '../../layouts/CenteringContainer'
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
    return (
        <CenteringContainer>
            <h2 className={styles.sorry}>Sorry!</h2>
            <p>We couldn't find that route!</p>
            <Link className={styles.back} to="/">Return home</Link>
        </CenteringContainer>
    )
}

export default ErrorPage