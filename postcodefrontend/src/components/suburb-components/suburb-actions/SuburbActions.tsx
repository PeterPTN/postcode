import { setSuburbUpdateForm, setSuburbs } from "../../../slices/suburb-slice";
import { setError, setSuccess } from "../../../slices/form-slice";
import { useAppDispatch } from "../../../services/redux-services";
import { deleteSuburb } from "../../../services/suburb-services";
import { useMutation } from "react-query";
import { queryClient } from "../../../App";
import SuburbEntity from "../../../types/SuburbEntity";
import styles from "./SuburbActions.module.scss";

const SuburbActions = ({ id }: { id: number }) => {
    const mutation = useMutation(deleteSuburb);
    const dispatch = useAppDispatch();

    const handleDeleteClick = async () => {
        mutation.mutate(id, {
            onSuccess: async () => {
                queryClient.invalidateQueries()
                const newSuburbs = await queryClient.fetchQuery<SuburbEntity[]>("getAllSuburbs");
                dispatch(setSuburbs(newSuburbs));
                dispatch(setSuccess("Delete successful"));
                setTimeout(() => dispatch(setSuccess(null)), 5000);
            },
            onError: (error: any) => {
                dispatch(setError(error.message));
                setTimeout(() => dispatch(setError(null)), 5000);
            }
        })
    }

    const handleUpdateClick = async () => {
        dispatch(setSuburbUpdateForm(id));
    }

    return (
        <div className={styles.suburbActions}>
            <button onClick={handleUpdateClick}>Update</button>
            <button onClick={handleDeleteClick}>Delete</button>
        </div>
    )
}

export default SuburbActions