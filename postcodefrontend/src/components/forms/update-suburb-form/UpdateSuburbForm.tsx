import { setSuburbUpdateForm, setSuburbs } from '../../../slices/suburb-slice';
import { setError, setSuccess } from '../../../slices/form-slice';
import { getErrorMessages } from '../../../utils/error-utils';
import { useAppDispatch } from '../../../services/redux-services';
import { updateSuburb } from '../../../services/suburb-services';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { useForm } from 'react-hook-form';
import SUBURB_SCHEMA from '../../../constants/SuburbSchema';
import SuburbEntity from '../../../types/SuburbEntity';
import styles from './UpdateSuburbForm.module.scss';

const UpdateSuburbForm = (props: SuburbEntity) => {
    const { register, handleSubmit } = useForm({ defaultValues: props });
    const mutation = useMutation(updateSuburb);
    const dispatch = useAppDispatch();

    const onSubmit = async (data: SuburbEntity) => {
        dispatch(setError(null));
        dispatch(setSuccess(null));

        const validatedUpdateSuburbData = await SUBURB_SCHEMA.validate(data, { abortEarly: false })
            .catch((error) => {
                dispatch(setError(getErrorMessages(error)));
            });

        if (validatedUpdateSuburbData) {
            mutation.mutate({ id: props.id, newSuburbData: validatedUpdateSuburbData }, {
                onSuccess: async () => {
                    queryClient.invalidateQueries()
                    const newSuburbs = await queryClient.fetchQuery<SuburbEntity[]>("getAllSuburbs");
                    dispatch(setSuburbs(newSuburbs));
                    dispatch(setSuccess("Suburb successfully created"));
                },
                onError: (error: any) => {
                    dispatch(setError(error.message))
                }
            });
        }
    }

    const handleCancelClick = () => {
        dispatch(setSuburbUpdateForm(props.id))
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.updateSuburbForm}>
                <div className={styles.textInputContainer}>
                    <label htmlFor="name">Name: </label>
                    <input id="name" type="text" {...register("name")} />
                </div>

                <div className={styles.textInputContainer}>
                    <label htmlFor="population">Population: </label>
                    <input id="population" type="text" {...register("population")} />
                </div>

                <div className={styles.textInputContainer}>
                    <label htmlFor="postcode">Postcode: </label>
                    <input id="postcode" type="text" {...register("postcode")} />
                </div>

                <div className={styles.updateSuburbActions}>
                    <button onClick={handleCancelClick}>Cancel</button>
                    <input type="submit" />
                </div>
            </form>
        </>
    )
}

export default UpdateSuburbForm