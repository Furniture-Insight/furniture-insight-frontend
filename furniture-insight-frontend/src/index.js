import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from "./components/pages/Home"
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import RecoverPass from "./components/pages/RecoverPass";
import Store from "./components/pages/Store";
import Description from "./components/pages/Description";
import SmartRoom from './components/pages/SmartRoom';
import Cart from "./components/pages/Cart";

const rootElement = document.getElementById('root');
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}>
        <Route path="home" element={<Home/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="signup" element={<SignUp/>}></Route>
        <Route path="recoverpass" element={<RecoverPass/>}></Route>
        <Route path="store" element={<Store/>}></Route>
        <Route path="description" element={<Description/>}></Route>
        <Route path="smartRoom" element={<SmartRoom/>}></Route>
        <Route path="cart" element={<Cart/>}></Route>        
      </Route>      
    </Routes>    
  </BrowserRouter>,
  rootElement
);
