import { SubmitHandler, useForm } from 'react-hook-form';
import { setError, setSuccess } from '../../../slices/form-slice';
import { getErrorMessages } from '../../../utils/error-utils';
import { useAppDispatch } from '../../../services/redux-services';
import { createSuburb } from '../../../services/suburb-services';
import { useMutation } from 'react-query';
import { queryClient } from '../../../App';
import { setSuburbs } from '../../../slices/suburb-slice';
import SUBURB_SCHEMA from '../../../constants/SuburbSchema';
import SuburbEntity from '../../../types/SuburbEntity';
import Suburb from '../../../types/Suburb';
import styles from './CreateSuburbForm.module.scss'

const CreateSuburbForm = () => {
    const { register, handleSubmit, formState: { isSubmitting }, reset } = useForm<Suburb>();
    const mutation = useMutation(createSuburb);
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<Suburb> = async (data: Suburb) => {
        dispatch(setError(null));
        dispatch(setSuccess(null));

        const validatedSuburbData = await SUBURB_SCHEMA.validate(data, { abortEarly: false })
            .catch((error) => {
                dispatch(setError(getErrorMessages(error)));
            });

        if (validatedSuburbData) {
            mutation.mutate(validatedSuburbData, {
                onSuccess: async () => {
                    queryClient.invalidateQueries()
                    const newSuburbs = await queryClient.fetchQuery<SuburbEntity[]>("getAllSuburbs");
                    dispatch(setSuburbs(newSuburbs));
                    dispatch(setSuccess("Suburb successfully updated"));
                },
                onError: (error: any) => {
                    dispatch(setError(error.message))
                }
            });
        }

        reset();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createSuburbForm}>
                <label htmlFor="">Suburb name:</label>
                <input type="text" {...register("name")} />

                <label htmlFor="">Population:</label>
                <input type="text" {...register("population")} />

                <label htmlFor="">Postcode:</label>
                <input type="text" {...register("postcode")} />

                <input type="submit" value="Submit" disabled={isSubmitting} />
            </form>
        </>

    )
}

export default CreateSuburbForm