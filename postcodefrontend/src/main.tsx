import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthCheckedRegisterPage from './pages/register/AuthCheckedRegisterPage';
import AuthCheckedLoginPage from './pages/login/AuthCheckedLoginPage';
import ProtectedAdminPage from './pages/admin/ProtectedAdminPage';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'

import AdminPage from './pages/admin/AdminPage';
import ErrorPage from './pages/error/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <AdminPage /> },
      { path: "/register", element: <AuthCheckedRegisterPage /> },
      { path: "/admin", element: <ProtectedAdminPage /> },
      { path: "*", element: <ErrorPage /> }
    ],

  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode >,
)
