import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Admins() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }
    const [admin, setAdmin] = useState([]);
    const [nuevoadmin, setNuevoAdmin] = useState({
        Id_Usuario: "",
        Id_Empleado: "",
        Cedula: "",
        Sueldo: ""
    })
    const [editarAdmin, setEditarAdmin] = useState({
        Id_Administrador: "",
        Sueldo: ""
    })
    const [eliminarAdmin, setEliminarAdmin] = useState({
        Id_Administrador: ""
    })

    const getAdmin = async () => {
        const response = await fetch('http://localhost:8000/administrador/all')
        const result = await response.json()
        setAdmin(result);
    }

    const crearAdmin = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoadmin)
        }

        fetch('http://localhost:8000/administrador/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Admin creado.")
                }
            })
    }

    const editarAdmins = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editarAdmin)
        }

        fetch(`http://localhost:8000/administrador/editar/${editarAdmin.Id_Administrador}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Admin editado.")
                }
            })
    }

    const eliminarAdmins = () => {
        fetch(`http://localhost:8000/administrador/borrar/${eliminarAdmin.Id_Administrador}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("Admin eliminado.")
            }
        })
    }

    useEffect(() => {
        getAdmin();
    }, [])

    const crearSubmit = (event) => {
        event.preventDefault();
        crearAdmin();
    }

    const editarSubmit = (event) => {
        event.preventDefault();
        editarAdmins();
    }
    
    const eliminarSubmit = (event) => {
        event.preventDefault();
        eliminarAdmins();
    }

    return(
        <div className="box text-center">
            <button
            className="btn btn-outline-secondary rounded-pill m-3"
            onClick={gotoDashboard}>Back to Dashboard</button>
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
                                {admin.map((item) =>  (
                                    <div key={item.Id_Usuario}>
                                        <dl className="row p-3">
                                            <dt className="col-sm-3 p-3">ID Admin</dt>
                                            <dd className="col-sm-9 p-3">{item.Id_Administrador}</dd> 

                                            <dt className="col-sm-3 p-3">ID Usuario</dt>
                                            <dd className="col-sm-9 p-3">{item.Id_Usuario}</dd>                                    
                                        </dl>
                                    </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>

                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#crearadminModal">
                            Crear Admin
                        </button>

                        <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="crearadminModal" tabIndex="-1" aria-labelledby="crearadminModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="crearadminModalLabel">Crear Admin</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">ID Usuario</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoadmin.Id_Usuario}
                                                        onChange={(e) => setNuevoAdmin({ ...nuevoadmin, Id_Usuario: e.target.value })} />

                                                    <label className="col-form-label">ID Empleado</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoadmin.Id_Empleado}
                                                        onChange={(e) => setNuevoAdmin({ ...nuevoadmin, Id_Empleado: e.target.value })} />

                                                    <label className="col-form-label">Sueldo</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoadmin.Sueldo}
                                                        onChange={(e) => setNuevoAdmin({ ...nuevoadmin, Sueldo: e.target.value })} />

                                                    <label className="col-form-label">Cedula</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevoadmin.Cedula}
                                                        onChange={(e) => setNuevoAdmin({ ...nuevoadmin, Cedula: e.target.value })} />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    className="btn btn-outline-secondary rounded-pill"
                                                    type="submit"
                                                >Agregar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button 
                        className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#editaradminModal">
                            Editar Admin
                        </button>

                        <form onSubmit={editarSubmit}>
                            <div className="modal fade" id="editaradminModal" tabIndex="-1" aria-labelledby="editaradminModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="editaradminModalLabel">Editar Admin</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el ID del Admin que desea editar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarAdmin.Id_Administrador}
                                                        onChange={(e)=> setEditarAdmin({...editarAdmin, Id_Administrador:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese el nuevo sueldo:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarAdmin.Sueldo}
                                                        onChange={(e)=> setEditarAdmin({...editarAdmin, Sueldo:e.target.value})}
                                                    />
                                                </div>                                                
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    className="btn btn-outline-secondary rounded-pill"
                                                    type="submit"
                                                >Editar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteadminModal">
                            Borrar Admin
                        </button>

                        <form onSubmit={eliminarSubmit}>
                            <div className="modal fade" id="deleteadminModal" tabIndex="-1" aria-labelledby="deleteadminModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="deleteadminModalLabel">Eliminar Admin</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el ID del admin a eliminar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={eliminarAdmin.Id_Administrador}
                                                        onChange={(e)=> setEliminarAdmin({...eliminarAdmin, Id_Administrador:e.target.value})}
                                                    />                                                   
                                                </div>                                                
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    className="btn btn-outline-secondary rounded-pill"
                                                    type="submit"
                                                >Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admins;