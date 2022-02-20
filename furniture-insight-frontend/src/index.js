import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";

ReactDOM.render(
  <React.StrictMode>
    <SignUpPage/>
  </React.StrictMode>,
  document.getElementById('root')
);