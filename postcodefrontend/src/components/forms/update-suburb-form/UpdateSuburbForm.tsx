import { setSuburbUpdateForm, setSuburbs } from '../../../slices/suburb-slice';
import { number, object, string, } from 'yup';
import { setError, setSuccess } from '../../../slices/form-slice';
import { useAppDispatch } from '../../../services/redux-services';
import { updateSuburb } from '../../../services/suburb-services';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { useForm } from 'react-hook-form'
import UpdateSuburb from '../../../types/UpdateSuburb';
import SuburbEntity from '../../../types/SuburbEntity';
import styles from './UpdateSuburbForm.module.scss';

const UpdateSuburbForm = (props: SuburbEntity) => {
    const { register, handleSubmit } = useForm();
    const mutation = useMutation(updateSuburb);
    const dispatch = useAppDispatch();

    useForm({ defaultValues: { props } })

    const updateSuburbSchema = object({
        name: string(),
        population: number(),
        postcode: number()
    })

    const onSubmit = async (data: UpdateSuburb) => {
        const validatedUpdateSuburbData = await updateSuburbSchema.validate(data);
        mutation.mutate({ id: props.id, newSuburbData: validatedUpdateSuburbData }, {
            onSuccess: async () => {
                queryClient.invalidateQueries()
                const newSuburbs = await queryClient.fetchQuery<SuburbEntity[]>("getAllSuburbs");
                dispatch(setSuburbs(newSuburbs));
                dispatch(setSuccess("Suburb successfully created"));
                setTimeout(() => dispatch(setSuccess(null)), 5000);
            },
            onError: (error: any) => {
                dispatch(setError(error.message))
                setTimeout(() => dispatch(setError(null)), 5000);
            }
        });

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