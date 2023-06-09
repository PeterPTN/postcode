import styles from '../OutcomeMessages.module.scss';

const ErrorMessage = ({ errorObj }: { errorObj: any }) => {
    return (
        <div className={styles.error}>{errorObj.message || errorObj}</div>
    )
}

export default ErrorMessage