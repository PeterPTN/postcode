import { useAppDispatch, useAppSelector } from '../../services/redux-services'
import { setJwtExpirationDate } from '../../slices/auth-slice'
import { useNavigate } from 'react-router-dom'
import { setError } from '../../slices/form-slice'
import styles from './Header.module.scss'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const expiryTime = useAppSelector(state => state.auth.jwtExpirationDate);
  const currentTime = new Date().getTime();

  const authenticationSignifier =
    expiryTime === null || expiryTime >= currentTime
      ? "Sign-in"
      : "Sign-out";

  const handleAuthClick = () => {
    dispatch(setError(null));
    if (authenticationSignifier === "Sign-out") {
      localStorage.removeItem("jwt");
      dispatch(setJwtExpirationDate(null));
    }
    navigate("/");
  }

  const handleTitleClick = () => {
    dispatch(setError(null))
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <h1 onClick={handleTitleClick}>Oz Post</h1>

      <nav>
        <ul>
          <li onClick={handleAuthClick}>{authenticationSignifier}</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header