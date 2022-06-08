import React from "react";
import { useState, useEffect } from "react";

function Admins() {
    const [admin, setAdmin] = useState({});

    const getAdmin = async () => {
        const response = await fetch('http://localhost:8000/administrador/1')
        const result = await response.json()
        setAdmin(result);
    }

    useEffect(() => {
        getAdmin();
    }, [])

    return(
        <div className="box text-center">
            <h1 className="m-5">Admins</h1>
            <div className="container-mueble">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#viewadminModal">
                            Ver Admin
                        </button>
                        <div className="modal fade" id="viewadminModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Admin</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div>
                                        <dl className="row p-3">
                                            <dt className="col-sm-3 p-3">ID Admin</dt>
                                            <dd className="col-sm-9 p-3">{admin.Id_Administrador}</dd> 

                                            <dt className="col-sm-3 p-3">ID Usuario</dt>
                                            <dd className="col-sm-9 p-3">{admin.Id_Usuario}</dd>                                     
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
                            Crear Admin
                        </button>
                    </div>
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button 
                        className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal">
                            Editar Admin
                        </button>
                    </div>
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                            Borrar Admin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admins;