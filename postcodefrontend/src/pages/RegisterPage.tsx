import CenteringContainer from '../layouts/CenteringContainer'
import RegisterForm from '../components/register-form/RegisterForm'

const RegisterPage = () => {
  return (
    <CenteringContainer>
      <RegisterForm formType="register" />
    </CenteringContainer>
  )
}

export default RegisterPage