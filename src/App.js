import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/pages/Home"
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import RecoverPass from "./components/pages/RecoverPass";
import Store from "./components/pages/Store";
import Drawspace from './components/pages/Drawspace';
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";
import CheckoutPaypal from "./components/pages/CheckoutPaypal";
import Navbar from './components/Navbar';
import AboutUs from './components/pages/AboutUs';
import Profile from './components/pages/Profile';
import Mueble from './components/pages/Mueble';

function App() {
    const [userLogged, setUserLogged] = useState();
    const [mueble, setMueble] = useState();    

    const isUserLogged = (userLoggedStatus) => {             
        setUserLogged(userLoggedStatus);
    }

    const clickedMueble = (muebleClicked) => {
        setMueble(muebleClicked);
    }    
    
    console.log(mueble);
    
    return (        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navbar isUserLogged = {userLogged} />}>
                    <Route path="/" element={<Home clickedMueble = {clickedMueble} />}></Route>
                    <Route path="login" element={<Login isUserLogged = {isUserLogged} />}></Route>
                    <Route path="signup" element={<SignUp isUserLogged = {isUserLogged} />}></Route>
                    <Route path="recoverpass" element={<RecoverPass />}></Route>
                    <Route path="store" element={<Store clickedMueble={clickedMueble} />}></Route>
                    <Route path="mueble" element={<Mueble clickedMueble={mueble} />}></Route>
                    <Route path="drawspace" element={<Drawspace />}></Route>
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="checkout" element={<Checkout />}></Route>
                    <Route path="/checkoutpaypal" element={<CheckoutPaypal/>}></Route>
                    <Route path="aboutUs" element={<AboutUs/>}></Route>
                    <Route path="profile" element={<Profile isUserLogged = {isUserLogged}/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>        
    );
}

export default App;