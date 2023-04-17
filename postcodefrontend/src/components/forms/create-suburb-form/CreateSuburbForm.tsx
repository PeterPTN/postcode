import { useAppDispatch, useAppSelector } from '../../../services/redux-services';
import { SubmitHandler, useForm } from 'react-hook-form';
import { number, object, string } from 'yup';
import { setError, setSuccess } from '../../../slices/form-slice';
import { createSuburb } from '../../../services/suburb-services';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { setSuburbs } from '../../../slices/suburb-slice';
import Suburb from '../../../types/Suburb';
import styles from './CreateSuburbForm.module.scss'
import SuburbEntity from '../../../types/SuburbEntity';
import ErrorMessage from '../outcome-messages/ErrorMessage';
import SuccessMessage from '../outcome-messages/SuccessMessage';

const CreateSuburbForm = () => {
    const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<Suburb>();
    const success = useAppSelector(state => state.form.sucess);
    const error = useAppSelector(state => state.form.error);
    const mutation = useMutation(createSuburb);
    const dispatch = useAppDispatch();

    const suburbSchema = object({
        name: string().required({ message: "Suburb name is required" }),
        postcode: number().required({ message: "Postcode is required" }),
        population: number().required({ message: "Population is required" })
    });

    const onSubmit: SubmitHandler<Suburb> = async (data: Suburb) => {
        dispatch(setError(null));
        dispatch(setSuccess(null));

        const validatedSuburbData = await suburbSchema.validate(data);

        mutation.mutate(validatedSuburbData, {
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

        reset();
    }

    return (
        <>
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createSuburbForm}>
                <label htmlFor="">Suburb name:</label>
                <input type="text" {...register("name")} />

                <label htmlFor="">Population:</label>
                <input type="text" {...register("population")} />

                <label htmlFor="">Postcode</label>
                <input type="text" {...register("postcode")} />

                <input type="submit" value="Submit" disabled={isSubmitting} />
            </form>
        </>

    )
}

export default CreateSuburbForm