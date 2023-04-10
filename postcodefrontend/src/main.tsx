import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/admin", element: <AdminPage /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode >,
)
