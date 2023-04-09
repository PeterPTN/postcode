import { Outlet } from 'react-router-dom'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import './App.css'

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
