import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<h1>I am Home Page</h1>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

