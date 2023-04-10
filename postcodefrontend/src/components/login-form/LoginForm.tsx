import { useAppDispatch, useAppSelector } from '../../services/redux-services';
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { validateUser } from '../../services/login-register-services';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../slices/form-slice';
import FormType from '../../types/Form';
import styles from './LoginForm.module.scss';
import Login from '../../types/Login';

const Form = ({ formType }: FormType) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Login>();
    const error = useAppSelector(state => state.form.error);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginSchema = object({
        login: string().required({ message: "Login is required" }),
        password: string().required({ message: "Password is required" }),
    });

    const onSubmit: SubmitHandler<Login> = async (data: any) => {
        dispatch(setError(null));

        try {
            const validatedLoginData = await loginSchema.validate(data);
            const loggingSuccessful = await validateUser({ data: validatedLoginData, formType: formType })
            if (loggingSuccessful) navigate('/admin');
            else dispatch(setError("Login or password is incorrect"));
        } catch (error: any) {
            dispatch(setError(error.message.message));
        }
    }

    return (
        <>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                <label htmlFor="login" >Login:</label>
                <input id="login" type="text" {...register("login")} />

                <label htmlFor="password" >Password:</label>
                <input id="password" type="password" {...register("password")} />

                <input type="submit" value="submit" disabled={isSubmitting} />

                <p>Don't have an account? <a href="/register">Register</a></p>
            </form>
        </>
    )
}

export default Form