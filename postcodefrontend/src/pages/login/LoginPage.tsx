import { useAppSelector } from "../../services/redux-services"
import CenteringContainer from "../../layouts/centering-container/CenteringContainer"
import ErrorMessage from "../../components/outcome-messages/error-message/ErrorMessage";
import LoginForm from "../../components/forms/login-form/LoginForm"

const LoginPage = () => {
    const errorMessages = useAppSelector(state => state.form.error);

    console.log(errorMessages)

    return (
        <CenteringContainer>
            <h2>Login to Oz Post</h2>
            <p>Enter your details to log into your account.</p>
            {errorMessages && errorMessages.map((errorObj, index) => {
                console.log(errorObj)
                return <ErrorMessage key={index} errorObj={errorObj} />
            })}
            <LoginForm formType="login" />
        </CenteringContainer>
    )
}

export default LoginPage