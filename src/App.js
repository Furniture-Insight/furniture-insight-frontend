import React from 'react';
import { useState } from 'react';
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
                    <Route path="home" element={<Home />}></Route>
                    <Route path="login" element={<Login isUserLogged = {isUserLogged} />}></Route>
                    <Route path="signup" element={<SignUp isUserLogged = {isUserLogged} />}></Route>
                    <Route path="recoverpass" element={<RecoverPass />}></Route>
                    <Route path="store" element={<Store clickedMueble={clickedMueble} />}></Route>
                    <Route path="mueble" element={<Mueble clickedMueble={mueble} />}></Route>
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