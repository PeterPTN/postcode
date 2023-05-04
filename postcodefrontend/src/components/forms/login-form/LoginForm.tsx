import { SubmitHandler, useForm } from 'react-hook-form';
import { setJwtExpirationDate } from '../../../slices/auth-slice';
import { getErrorMessages } from '../../../utils/error-utils';
import { useAppDispatch } from '../../../services/redux-services';
import { object, string } from 'yup';
import { validateUser } from '../../../services/login-register-services';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { setError } from '../../../slices/form-slice';
import FormType from '../../../types/Form';
import styles from './LoginForm.module.scss';
import User from '../../../types/User';

const LoginForm = ({ formType }: FormType) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<User>();
    const mutation = useMutation(validateUser)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginSchema = object({
        login: string().required("Login is required"),
        password: string().required("Password is required"),
    });

    const onSubmit: SubmitHandler<User> = async (data: User) => {
        dispatch(setError(null));

        const validatedLoginData = await loginSchema.validate(data, { abortEarly: false })
            .catch((error) => {
                dispatch(setError(getErrorMessages(error)));
            });

        if (validatedLoginData) {
            mutation.mutate({ data: validatedLoginData, formType: formType }, {
                onSuccess: async (expirationTime: string) => {
                    dispatch(setJwtExpirationDate(expirationTime));
                    navigate("/admin");
                },
                onError: (error: any) => {
                    dispatch(setError([error.message]));
                }
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.LoginForm}>
                <label htmlFor="login" >Login:</label>
                <input id="login" type="text" {...register("login")} />

                <label htmlFor="password" >Password:</label>
                <input id="password" type="password" {...register("password")} />

                <input type="submit" value="submit" disabled={isSubmitting} />

                <p>Don't have an account? <a href="/register">Register for OzPost</a></p>
            </form>
        </>
    )
}

export default LoginForm