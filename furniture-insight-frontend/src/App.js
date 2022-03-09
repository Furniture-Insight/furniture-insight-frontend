import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import RecoverPass from "./components/pages/RecoverPass";
import Layout from "./components/Layout";
import Store from "./components/pages/Store";
import Home from "./components/pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}></Route>
                <Route path="login" element={<Login/>}></Route>
                <Route path="signup" element={<SignUp/>}></Route>
                <Route path="recoverpass" element={<RecoverPass/>}></Route>
                <Route path="home" element={<Home/>}></Route>
                <Route path="store" element={<Store/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;