import { Link } from 'react-router-dom'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <h1><a href="/">Oz Post</a></h1>
    </header>
  )
}

export default Header