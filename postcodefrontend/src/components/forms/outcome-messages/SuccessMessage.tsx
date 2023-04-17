import styles from './OutcomeMessages.module.scss';

const SuccessMessage = ({ message }: { message: string }) => {
    return (
        <div className={styles.success}>{message}</div>
    )
}

export default SuccessMessage