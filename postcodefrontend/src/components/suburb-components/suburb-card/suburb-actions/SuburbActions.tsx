import { useMutation } from "react-query";
import styles from "./SuburbActions.module.scss";

const SuburbActions = ({ id }: { id: number }) => {


    const handleDeleteClick = () => {
        

    }

    const handleUpdateClick = () => {

    }

    return (
        <div className={styles.suburbActions}>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}

export default SuburbActions