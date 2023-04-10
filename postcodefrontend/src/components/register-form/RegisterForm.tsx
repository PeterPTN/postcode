import { useAppDispatch, useAppSelector } from '../../services/redux-services';
import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { validateUser } from '../../services/login-register-services';
import { useNavigate } from 'react-router-dom';
import { setError } from '../../slices/form-slice';
import Register from '../../types/Register';
import FormType from '../../types/Form';
import styles from './RegisterForm.module.scss';
import Login from '../../types/Login';

const Form = ({ formType }: FormType) => {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Login | Register>();
    const error = useAppSelector(state => state.form.error);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerSchema = object({
        firstName: string().required({ message: "First name is required" }),
        lastName: string().required({ message: "Last name is required" }),
        login: string().required({ message: "Login is required" }),
        password: string().required({ message: "Password is required" }),
        confirmPassword: string().required({ message: "Please re-type your password" }),
    });

    const onSubmit: SubmitHandler<Login | Register> = async (data: any) => {
        dispatch(setError(null));

        try {
            const validatedRegisterData = await registerSchema.validate(data);
            const registerSuccessful = await validateUser({ data: validatedRegisterData, formType: formType })
            if (registerSuccessful) navigate('/admin');
            else dispatch(setError("Something went wrong"));
        } catch (error: any) {
            dispatch(setError(error.message.message));
        }
    }

    return (
        <>
            <h2>Register</h2>
            {error && <p>{error}</p>}
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

                <input type="submit" value="submit" disabled={isSubmitting} />

                <p>Already have an account? <a href="/login">Login</a></p>
            </form>
        </>
    )
}

export default Form