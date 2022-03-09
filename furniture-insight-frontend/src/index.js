import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import RecoverPass from "./components/pages/RecoverPass";
import Layout from "./components/Layout";
import Store from "./components/Store";
import Cart from "./components/pages/Cart";

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
        <Route path="store" element={<Store/>}></Route>
        <Route path="recoverpass" element={<RecoverPass/>}></Route>
        <Route path="cart" element={<Cart/>}></Route>
      </Route>
    </Routes>    
  </BrowserRouter>,
  rootElement
);
