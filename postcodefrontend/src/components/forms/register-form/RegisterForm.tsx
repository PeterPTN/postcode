import { SubmitHandler, useForm } from 'react-hook-form'
import { setJwtExpirationDate } from '../../../slices/auth-slice';
import { getErrorMessages } from '../../../utils/error-utils';
import { useAppDispatch } from '../../../services/redux-services';
import { object, string } from 'yup'
import { validateUser } from '../../../services/login-register-services';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../../slices/form-slice';
import FormType from '../../../types/Form';
import styles from './RegisterForm.module.scss';
import User from '../../../types/User';

const RegisterForm = ({ formType }: FormType) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<User>();
    const mutation = useMutation(validateUser);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerSchema = object({
        firstName: string().required("First name is required"),
        lastName: string().required("Last name is required"),
        login: string().required("Login is required"),
        password: string().required("Password is required"),
        confirmPassword: string().required("Please re-type your password"),
    });

    const onSubmit: SubmitHandler<User> = async (data: User) => {
        dispatch(setError(null));

        const validatedRegisterData = await registerSchema.validate(data, { abortEarly: false })
            .catch((error) => {
                dispatch(setError(getErrorMessages(error)));
            });

        if (validatedRegisterData) {
            mutation.mutate({ data: validatedRegisterData, formType: formType }, {
                onSuccess: (expirationTime: string) => {
                    dispatch(setJwtExpirationDate(expirationTime));
                    navigate('/admin');
                },
                onError: (error: any) => {
                    dispatch(setError([error.message]));
                }
            })
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <label htmlFor="firstName">First Name:</label>
                <input id="firstName" type="text" {...register("firstName")} />

                <label htmlFor="lastName">Last Name:</label>
                <input id="lastName" type="text" {...register("lastName")} />

                <label htmlFor="login" className={formType === "register" ? styles.register : ""} >Login:</label>
                <input id="login" type="text" {...register("login")} />

                <label htmlFor="password" className={formType === "register" ? styles.register : ""} >Password:</label>
                <input id="password" type="password" {...register("password")} />

                <label htmlFor="confirmPassword" className={formType === "register" ? styles.register : ""} >Confirm Password:</label>
                <input id="confirmPassword" type="password" {...register("confirmPassword")} />

                <input id="submit" type="submit" value="submit" disabled={isSubmitting} />
                <p>Already have an account? <a href="/">Login</a></p>
            </form>
        </>
    )
}

export default RegisterForm