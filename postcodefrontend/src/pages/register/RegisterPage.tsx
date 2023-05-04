import { useAppSelector } from '../../services/redux-services';
import CenteringContainer from '../../layouts/centering-container/CenteringContainer'
import RegisterForm from '../../components/forms/register-form/RegisterForm'
import ErrorMessage from '../../components/outcome-messages/error-message/ErrorMessage';
import styles from './RegisterPage.module.scss'

const RegisterPage = () => {
  const errorMessages = useAppSelector(state => state.form.error);

  return (
    <CenteringContainer>
      <h2 className={styles.RegisterTitle}>Register</h2>
      <p className={styles.RegisterTag}>Please enter your details in the required fields.</p>
      {errorMessages && errorMessages.map((errorObj, index) => {
        return <ErrorMessage key={index} errorObj={errorObj} />
      })}
      <RegisterForm formType="register" />
    </CenteringContainer>
  )
}

export default RegisterPage