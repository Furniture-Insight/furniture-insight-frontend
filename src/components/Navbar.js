import React from "react";
import { Link, Outlet } from "react-router-dom";
import Cookies from 'universal-cookie';
import logo from "./images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faRightToBracket, faUserPlus, faCartShopping, faUsers, faTableCells, faUserCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar({isUserLogged}) {
    const cookies = new Cookies();    
    const handleClick = () =>{
        cookies.remove('Id_Usuario');
        cookies.remove('Nombre');
        cookies.remove('Id_MetodoPagoTarjeta');
        cookies.remove('ITBIS');
        cookies.remove('Subtotal');
        cookies.remove('Total');
        cookies.set('Session', false, {path:'/'})       
        isUserLogged(cookies.get('Session'));        
    }    
    
    const usuarioNombre = cookies.get('Nombre');   
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="40" height="40" alt="logo" className="me-2" />
                        Furniture Insight
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse navbarToggler" >
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav nav-tabs">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/store"><FontAwesomeIcon icon={faStore}/> Store </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart"><FontAwesomeIcon icon={faCartShopping}/> Shopping Cart </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/drawSpace"><FontAwesomeIcon icon={faTableCells}/> Smart Room </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/aboutUs"><FontAwesomeIcon icon={faUsers} /> About Us </Link>
                            </li>
                        </ul>
                    </div>
                    {isUserLogged ?
                    <div className="collapse navbar-collapse navbarToggler">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">                        
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" id="userDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false" to="#"><FontAwesomeIcon icon={faUserCircle} /></Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdownMenuLink">                            
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/" onClick={handleClick}>Logout</Link></li>
                                </ul>                                
                            </li>
                            <li className="nav-item"></li>
                            <Link className="nav-link" to="/profile">{usuarioNombre}</Link>                                        
                        </ul>
                    </div>:
                    <div className="collapse navbar-collapse navbarToggler">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 nav nav-tabs">                        
                            <li className="nav-item">                             
                                <Link className="nav-link" to="/login"><FontAwesomeIcon icon={faRightToBracket}/> Login </Link>                                                           
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup"><FontAwesomeIcon icon={faUserPlus}/> Signup </Link>                                
                            </li>                       
                        </ul>
                    </div>
                    }
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;