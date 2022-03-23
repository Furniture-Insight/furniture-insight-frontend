import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home"
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import RecoverPass from "./components/pages/RecoverPass";
import Store from "./components/pages/Store";
import Description from "./components/pages/Description";
import SmartRoom from './components/pages/SmartRoom';
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import Navbar from './components/Navbar';
import AboutUs from './components/pages/AboutUs';
import Profile from './components/pages/Profile';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar/>}>
                    <Route path="home" element={<Home />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="signup" element={<SignUp />}></Route>
                    <Route path="recoverpass" element={<RecoverPass />}></Route>
                    <Route path="store" element={<Store />}></Route>
                    <Route path="description" element={<Description />}></Route>
                    <Route path="smartRoom" element={<SmartRoom />}></Route>
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="checkout" element={<Checkout />}></Route>
                    <Route path="aboutUs" element={<AboutUs/>}></Route>
                    <Route path="profile" element={<Profile/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;