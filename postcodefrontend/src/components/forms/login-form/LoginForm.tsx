import { SubmitHandler, useForm } from 'react-hook-form';
import { setJwtExpirationDate } from '../../../slices/auth-slice';
import { useAppDispatch } from '../../../services/redux-services';
import { object, string } from 'yup';
import { validateUser } from '../../../services/login-register-services';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../../slices/form-slice';
import FormType from '../../../types/Form';
import styles from './LoginForm.module.scss';
import User from '../../../types/User';

const LoginForm = ({ formType }: FormType) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<User>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginSchema = object({
        login: string().required({ message: "Login is required" }),
        password: string().required({ message: "Password is required" }),
    });

    const onSubmit: SubmitHandler<User> = async (data: User) => {
        dispatch(setError(null));

        try {
            const validatedLoginData = await loginSchema.validate(data);
            const validateAndReturnExpirationDate = await validateUser({ data: validatedLoginData, formType: formType })

            if (validateAndReturnExpirationDate) {
                navigate('/admin');
                dispatch(setJwtExpirationDate(validateAndReturnExpirationDate));
            }
            else {
                dispatch(setError(["Login or password is incorrect"]));
            }
        } catch (error: any) {
            dispatch(setError(error.message.message));
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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