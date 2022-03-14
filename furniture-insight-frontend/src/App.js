import React from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "./components/images/logo.png"

function App() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-center">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/store">
                        <img src={logo} width="40" height="40" alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/store">Store</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">SignUp</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/smartRoom">Smart Room</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/description">Description</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default App;