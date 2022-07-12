import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import logo from "./images/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faRightToBracket, faUserPlus, faCartShopping, faUsers, faTableCells, faUserCircle, faCircleQuestion, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function Navbar({isUserLogged}) {
    const cookies = new Cookies();

    const handleClick = () =>{
        cookies.remove('Id_Usuario');
        cookies.remove('Nombre');
        cookies.remove('Id_MetodoPagoTarjeta');
        cookies.remove('Id_MetodoPagoPaypal');
        cookies.remove('ITBIS');
        cookies.remove('Subtotal');
        cookies.remove('Total');
        cookies.set('Session', false, {path:'/'})       
        isUserLogged(false);        
    }    
    
    const usuarioNombre = cookies.get('Nombre');

    const [nuevoticket, setNuevoTicket] = useState({
        title: "",
        email: "",
        description: "",
    });

    const crearTickets = () => {
        const requestOptions = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoticket)
        }

        fetch('https://support-ticket-furniture.herokuapp.com/ticket/create', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Ticket enviado.")
                }
            })
    }

    const crearSubmit = (event) => {
        event.preventDefault();
        crearTickets();
    }
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} width="40" height="40" alt="logo" className="me-2" />
                        Furniture Insight
                    </Link>
                    <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="crearticketModal" tabIndex="-1" aria-labelledby="crearticketModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="crearticketModalLabel">Reportar un Error</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Titulo del Error: </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoticket.title}
                                                        onChange={(e) => setNuevoTicket({ ...nuevoticket, title: e.target.value })} />

                                                    <label className="col-form-label">Ingrese su correo: </label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoticket.email}
                                                        onChange={(e) => setNuevoTicket({ ...nuevoticket, email: e.target.value })} />

                                                    <label className="col-form-label">Describa lo sucedido:</label>
                                                    <textarea
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoticket.description}
                                                        onChange={(e) => setNuevoTicket({ ...nuevoticket, description: e.target.value })}/>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    className="btn btn-outline-secondary rounded-pill"
                                                    type="submit"
                                                >Reportar Error</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
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
                                <Link className="nav-link" to="/aboutUs"><FontAwesomeIcon icon={faUsers}/> About Us </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" data-bs-toggle="modal" data-bs-target="#crearticketModal"><FontAwesomeIcon icon={faQuestionCircle}/> Help </Link>
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