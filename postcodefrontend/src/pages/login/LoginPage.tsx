import { useAppSelector } from "../../services/redux-services"
import CenteringContainer from "../../layouts/centering-container/CenteringContainer"
import ErrorMessage from "../../components/outcome-messages/error-message/ErrorMessage";
import LoginForm from "../../components/forms/login-form/LoginForm"
import styles from './LoginPage.module.scss'

const LoginPage = () => {
    const errorMessages = useAppSelector(state => state.form.error);

    return (
        <CenteringContainer>
            <h2 className={styles.LoginTitle}>Login to Oz Post</h2>
            <p className={styles.LoginTag}>Enter your details to log into your account.</p>
            {errorMessages && errorMessages.map((errorObj, index) => {
                return <ErrorMessage key={index} errorObj={errorObj} />
            })}
            <LoginForm formType="login" />
        </CenteringContainer>
    )
}

export default LoginPage