import styles from './OutcomeMessages.module.scss';

const ErrorMessage = ({ message }: { message: string }) => {
    return (
        <div className={styles.error}>{message}</div>
    )
}

export default ErrorMessage