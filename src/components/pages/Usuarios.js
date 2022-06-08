import React from "react";
import { useState, useEffect } from "react";

function Usuarios() {
    const [users, setUsuario] = useState({});

    const getUsuario = async () => {
        const response = await fetch('http://localhost:8000/user/30')
        const result = await response.json()
        setUsuario(result);
    }

    useEffect(() => {
        getUsuario();
    }, [])

    return(
        <div className="box text-center">
            <h1 className="m-5">Usuarios</h1>
            <div className="container-mueble">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#viewuserModal">
                            Ver Usuario
                        </button>
                        <div className="modal fade" id="viewuserModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Usuario</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <dl className="row p-3">
                                            <dt className="col-sm-3 p-3">ID</dt>
                                            <dd className="col-sm-9 p-3">{users.Id_Usuario}</dd> 

                                            <dt className="col-sm-3 p-3">Nombre</dt>
                                            <dd className="col-sm-9 p-3">{users.Nombre}</dd>                                    
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#createModal">
                            Crear Usuario
                        </button>
                    </div>
                    
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button 
                        className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal">
                            Editar Usuario
                        </button>
                    </div>

                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                            Borrar Usuario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Usuarios;