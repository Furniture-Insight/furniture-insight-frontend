import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function Profile({ isUserLogged }) {

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

    const[usuario, setUsuario] = useState({});
    const[newUsuario, setNewUsuario] = useState({
        Id_Genero: null,
        Nombre: null,
        Apellido: null,
        Contraseña: null,
        Contraseña_nueva: null,
        Edad: null,
        Direccion_Residencia: null
    });
    
    const getUsuario = async () => {
        const response = await fetch(`http://localhost:8000/user/${cookies.get('Id_Usuario')}`)
        const result = await response.json()
        setUsuario(result);
    }

    const editUsuario = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUsuario)
        }

        fetch(`http://localhost:8000/user/editar/${cookies.get('Id_Usuario')}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Error");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Usuario editado")
                }
            })
    }

    useEffect(() => {
        getUsuario();      
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        editUsuario();
    }

    return(
        <>
            <h1 className="welcome-message">¡Bienvenido a tu perfil, {usuario.Nombre}!</h1>
            <div className="row card-deck justify-content-around">
                <div className="col-3 card border-dark m-5">
                    <div className="card-body">
                        <div>
                            <h4 className="card-title pb-3">Account Details</h4>
                            <p className="card-text">Nombre: {usuario.Nombre}</p>
                            <p className="card-text">Apellido: {usuario.Apellido}</p>
                            <p className="card-text">Edad: {usuario.Edad}</p>
                            <p className="card-text">Email: {usuario.Email}</p>
                            <p className="card-text">Direccion: {usuario.Direccion_Residencia}</p>
                        </div>
                    </div>
                </div>
                <div className="col-3 card border-dark m-5">
                    <div className="card-body">
                        <h4 className="card-title pb-3">Tu Lista</h4>
                        <p className="card-text"> COMING SOON </p>
                    </div>
                </div>
                <div className="col-3 card border-dark m-5">
                    <div className="card-body">
                        <h4 className="card-title pb-3">Ajustes</h4>
                        <div className="d-grid col-5">
                            <button
                                type="button"
                                className="btn btn-outline-success m-3"
                                data-bs-toggle="modal"
                                data-bs-target="#cardModal">Editar datos
                            </button>
                            <Link type="button" class="btn btn-outline-danger m-3" to="/" onClick={handleClick}>Logout</Link>
                        </div>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cardModalLabel"> Ingrese los datos que desea modificar </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label className="col-form-label">Ingrese su contraseña actual</label>
                                    </div>
                                    <div className="col">
                                        <input
                                        required
                                        className="mb-3 form-control rounded-pill border border-dark"
                                        type="password"
                                        placeholder="Contraseña"
                                        value={newUsuario.Contraseña}
                                        onChange={(e) => setNewUsuario({ ...newUsuario, Contraseña: e.target.value })}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <label className="col-form-label">Nombre</label>
                                    </div>
                                    <div className="col">
                                        <input
                                        type="text"
                                        className="form-control"
                                        value={newUsuario.Nombre}
                                        onChange={(e) => setNewUsuario({ ...newUsuario, Nombre: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Apellido</label>
                                    </div>
                                    <div className="col">
                                        <input
                                        type="text"
                                        id="inputCvvTarjeta"
                                        className="form-control"
                                        value={newUsuario.Apellido}
                                        onChange={(e) => setNewUsuario({ ...newUsuario, Apellido: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Contraseña</label>
                                    </div>
                                    <div className="col">
                                        <input
                                        type="text"
                                        className="form-control"
                                        value={newUsuario.Contraseña_nueva}
                                        onChange={(e) => setNewUsuario({ ...newUsuario, Contraseña_nueva: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Edad</label>
                                    </div>
                                    <div className="col">
                                        <input
                                        type="text"
                                        className="form-control"
                                        value={newUsuario.Edad}
                                        onChange={(e) => setNewUsuario({ ...newUsuario, Edad: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Direccion</label>
                                    </div>
                                    <div className="col">
                                        <input
                                        type="text"
                                        className="form-control"
                                        value={newUsuario.Direccion_Residencia}
                                        onChange={(e) => setNewUsuario({ ...newUsuario, Direccion_Residencia: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                className="btn btn-outline-success rounded-pill"
                                type="submit"
                                data-bs-dismiss="modal"                                    
                                >Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Profile;