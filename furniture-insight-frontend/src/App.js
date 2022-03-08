import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "./components/images/logo.png"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import RecoverPass from "./components/pages/RecoverPass";
import Layout from "./components/Layout";
import Store from "./components/Store";
import Cart from "./components/pages/Cart";

function App() {
    return (
        <div>
            <nav className="navbar navbar-light bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/store">
                        <img src={logo} width="40" height="40" />
                    </Link>
                    <Link className="nav-link text-light" to="/login">Login</Link>
                    <Link className="nav-link text-light" to="/signup">SignUp</Link>                    
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default App;