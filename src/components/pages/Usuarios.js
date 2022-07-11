import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Usuarios() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }

    const [users, setUsuario] = useState([]);
    const [nuevouser, setNuevoUser] = useState({
        Nombre: "",
        Apellido: "",
        Id_Genero: "",
        Direccion_Residencia: "",
        Edad: "",
        Email: "",
        Contraseña: ""
    })

    const getUsuario = async () => {
        const response = await fetch('https://furniture-insight-app.herokuapp.com/user/user/all')
        const result = await response.json()
        setUsuario(result);
    }

    const crearUser = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevouser)
        }

        fetch('https://furniture-insight-app.herokuapp.com/user/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Usuario creado.")
                }
            })
    }

    useEffect(() => {
        getUsuario();
    }, [])

    const crearSubmit = (event) => {
        event.preventDefault();
        crearUser();
    }

    return(
        <div className="box text-center">
            <button
            className="btn btn-outline-secondary rounded-pill m-3"
            onClick={gotoDashboard}>Back to Dashboard</button>
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
                        <div className="modal fade" id="viewuserModal" tabIndex="-1" aria-labelledby="viewuserModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="viewuserModalLabel">Usuario</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                {users.map((item) =>  (
                                    <div key={item.Id_Usuario}>
                                        <dl className="row p-3">
                                            <dt className="col-sm-3 p-3">ID</dt>
                                            <dd className="col-sm-9 p-3">{item.Id_Usuario}</dd> 

                                            <dt className="col-sm-3 p-3">Nombre</dt>
                                            <dd className="col-sm-9 p-3">{item.Nombre} {item.Apellido}</dd>                                    
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
                            data-bs-target="#createuserModal">
                            Crear Usuario
                        </button>

                        <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="createuserModal" tabIndex="-1" aria-labelledby="createuserModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="createuserModalLabel">Crear Mueble</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Nombre</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevouser.Nombre}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Nombre: e.target.value })} />

                                                    <label className="col-form-label">Apellido</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevouser.Apellido}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Apellido: e.target.value })} />

                                                    <label className="col-form-label">Genero (ID)</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevouser.Id_Genero}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Id_Genero: e.target.value })} />

                                                    <label className="col-form-label">Email</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevouser.Email}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Email: e.target.value })} />
                                                    
                                                    <label className="col-form-label">Contraseña</label>
                                                    <input
                                                        required
                                                        type="password"
                                                        className="form-control"
                                                        value={nuevouser.Contraseña}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Contraseña: e.target.value })} />
                                                    
                                                    <label className="col-form-label">Edad</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevouser.Edad}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Edad: e.target.value })} />

                                                    <label className="col-form-label">Direccion Residencia</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevouser.Direccion_Residencia}
                                                        onChange={(e) => setNuevoUser({ ...nuevouser, Direccion_Residencia: e.target.value })} />
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
                    
                    {/* <div className="admin-option col-lg-3 col-md-3 m-3">
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
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Usuarios;