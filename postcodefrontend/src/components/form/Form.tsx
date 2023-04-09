import { SubmitHandler, useForm } from 'react-hook-form'
import { object, string } from 'yup'
import { validateUser } from '../../services/login-register-services';
import { useState } from 'react';
import Login from '../../types/Login';
import { useNavigate } from 'react-router-dom';
import Register from '../../types/Register';

interface FormProps {
    formType: "register" | "login"
}

const Form = ({ formType = "login" }: FormProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<Login | Register>();
    // Refactor state to redux stores
    const [error, setError] = useState<string | null>(null);

    const loginSchema = object({
        login: string().required({ message: "Login is required" }),
        password: string().required({ message: "Password is required" }),
    });

    const onSubmit: SubmitHandler<Login | Register> = async (data: any) => {
        setError(null);

        try {
            const validatedLoginData = await loginSchema.validate(data);
            const loggingSuccessful = await validateUser(validatedLoginData, formType)

            if (loggingSuccessful) navigate('/admin');
            else setError("Login or password is incorrect");
        } catch (error: any) {
            setError(error.message.message);
        }
    }

    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
                {formType === "register" &&
                    <>
                        <label htmlFor="firstName"></label>
                        <input id="firstName" type="text" {...register("firstName")} />

                        <label htmlFor="lastName"></label>
                        <input id="lastName" type="text" {...register("lastName")} />
                    </>
                }

                <label htmlFor="login">Login</label>
                <input id="login" type="text" {...register("login")} />

                <label htmlFor="password">Password</label>
                <input id="password" type="text" {...register("password")} />

                <input type="submit" value="submit" />
            </form>

            <a href="/register">Register</a>
        </>
    )
}

export default Form