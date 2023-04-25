import styles from './OutcomeMessages.module.scss';

const SuccessMessage = ({ successObj }: { successObj: any }) => {
    return (
        <div className={styles.success}>{successObj.message || successObj}</div>
    )
}

export default SuccessMessage