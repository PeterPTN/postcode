import { Link } from 'react-router-dom'
import CenteringContainer from '../../layouts/CenteringContainer'
import styles from './ErrorPage.module.scss';

const ErrorPage = () => {
    return (
        <CenteringContainer>
            <h1 className={styles.sorry}>Sorry! ¯\_(ツ)_/¯</h1>
            <p>We couldn't find that route!</p>
            <Link to="/">Return home</Link>
        </CenteringContainer>
    )
}

export default ErrorPage