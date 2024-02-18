import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import Register from './pages/register';
import VerifyEmail from './pages/user/verify-email';
import AuthRoute from './components/molecules/auth-route'
import Create from './pages/document/create';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/auth-context';
import { ToastProvider } from './contexts/toast-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path='/' element={<h1>I am Home Page</h1>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user/verify-email/:token' element={<VerifyEmail />} />
            <Route path='/document/create' element={<AuthRoute element={<Create />} />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

