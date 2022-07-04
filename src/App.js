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
import Factura from './components/pages/Factura';
import Admin from './components/pages/Admin';
import AdminDashboard from './components/pages/AdminDashboard';
import Material from './components/pages/Material';
import Muebles from './components/pages/Muebles';
import Categorias from './components/pages/Categorias';
import SubCategorias from './components/pages/SubCategorias';
import Usuarios from './components/pages/Usuarios';
import Admins from './components/pages/Admins';
import Tickets from './components/pages/Tickets';

function App() {
    const [userLogged, setUserLogged] = useState();
    const [mueble, setMueble] = useState();    

    const isUserLogged = (userLoggedStatus) => {             
        setUserLogged(userLoggedStatus);
    }

    const clickedMueble = (muebleClicked) => {
        setMueble(muebleClicked);
    }    
    
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
                    <Route path="checkoutpaypal" element={<CheckoutPaypal/>}></Route>
                    <Route path="aboutUs" element={<AboutUs/>}></Route>
                    <Route path="profile" element={<Profile isUserLogged = {isUserLogged}/>}></Route>   
                    <Route path="factura" element={<Factura/>}></Route>                 
                </Route>
                <Route path="/admin" element={<Admin/>}></Route>
                <Route path="/admindashboard" element={<AdminDashboard/>} ></Route>
                <Route path="/adminmaterial" element={<Material/>}></Route>
                <Route path="/adminmuebles" element={<Muebles/>}></Route> 
                <Route path="/admincategorias" element={<Categorias/>}></Route>
                <Route path="/adminsubcategorias" element={<SubCategorias/>}></Route>
                <Route path="/adminusuarios" element={<Usuarios/>}></Route>
                <Route path="/admins" element={<Admins/>}></Route>
                <Route path="/tickets" element={<Tickets/>}></Route>
            </Routes>
        </BrowserRouter>        
    );
}

export default App;