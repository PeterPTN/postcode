import { useAppDispatch, useAppSelector } from '../../services/redux-services'
import { setJwtExpirationDate } from '../../slices/auth-slice'
import { Link, useNavigate } from 'react-router-dom'
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

  const handleClick = () => {
    if (authenticationSignifier === "Sign-out") {
      dispatch(setJwtExpirationDate(null));
    }
    navigate("/");
  }

  return (
    <header className={styles.header}>
      <h1><Link to="/">Oz Post</Link></h1>

      <nav>
        <ul>
          <li onClick={handleClick}>{authenticationSignifier}</li>
        </ul>
      </nav>
    </header>
  )
}

export default Header