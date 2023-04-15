import CenteringContainer from "../../layouts/CenteringContainer"
import LoginForm from "../../components/forms/login-form/LoginForm"

const LoginPage = () => {
    return (
        <CenteringContainer>
            <LoginForm formType="login" />
        </CenteringContainer>
    )
}

export default LoginPage