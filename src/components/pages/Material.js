import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Material() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }

    const [material, setMaterial] = useState([]);
    const [nuevomaterial, setNuevoMaterial] = useState({
        Material: ""
    })
    const [editarMaterial, setEditarMaterial] = useState({
        Id_Material: "",
        Material: ""
    })

    const [eliminarMaterial, setEliminarMaterial] = useState({
        Id_Material: ""
    })

    const getMateriales = async () => {
        const response = await fetch('https://furniture-insight-app.herokuapp.com/material/all')
        const result = await response.json()
        setMaterial(result);
    }

    useEffect(() => {
        getMateriales();
    }, [setMaterial])

    const crearMaterial = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevomaterial)
        }

        fetch('https://furniture-insight-app.herokuapp.com/material/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Material creado.")
                }
            })
    }

    const editarMateriales = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editarMaterial)
        }

        fetch(`https://furniture-insight-app.herokuapp.com/material/update/${editarMaterial.Id_Material}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Material editado.")
                }
            })
    }

    const eliminarMateriales = () => {
        fetch(`https://furniture-insight-app.herokuapp.com/material/delete/${eliminarMaterial.Id_Material}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("Material eliminado.")
            }
        })
    }

    const crearSubmit = (event) => {
        event.preventDefault();
        crearMaterial();
    }

    const editarSubmit = (event) => {
        event.preventDefault();
        editarMateriales();
    }
    
    const eliminarSubmit = (event) => {
        event.preventDefault();
        eliminarMateriales();
    }
    return (
        <div className="box text-center">
            <button
            className="btn btn-outline-secondary rounded-pill m-3"
            onClick={gotoDashboard}>Back to Dashboard</button>
            <h1 className='text-center m-5'> Materiales </h1>
            <h3 className='text-center m-3'> Elija un opcion: </h3>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-4 m-3">
                        <div className="box-part text-center">
                            <div className="title">
                                <button
                                    className="btn btn-outline-secondary rounded-pill w-50 py-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#crearmaterialModal">Crear Material</button>
                            </div>
                        </div>

                        <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="crearmaterialModal" tabIndex="-1" aria-labelledby="crearmaterialModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="crearmaterialModalLabel">Crear Material</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Material</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomaterial.Material}
                                                        onChange={(e) => setNuevoMaterial({ ...nuevomaterial, Material: e.target.value })} />
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
                    <div className="admin-option col-lg-3 col-md-4 m-3">
                        <div className="box-part text-center">
                            <div className="title">
                                <button
                                    className="btn btn-outline-secondary rounded-pill w-50 py-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#vermaterialesModal">Ver Materiales</button>
                            </div>
                        </div>

                        <div className="modal fade" id="vermaterialesModal" tabIndex="-1" aria-labelledby="vermaterialesModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title" id="vermaterialesModalLabel">Ver Materiales</h4>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        {material.map((item) => (
                                            <div key={item.Id_Material}>
                                                <dl className="row p-3">
                                                    <dt className="col-sm-3 p-3">Id de Material</dt>
                                                    <dd className="col-sm-9 p-3">{item.Id_Material}</dd>

                                                    <dt className="col-sm-3 p-3">Material</dt>
                                                    <dd className="col-sm-9 p-3">{item.Material}</dd>
                                                </dl>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-option col-lg-3 col-md-4 m-3">
                        <div className="box-part text-center">
                            <div className="title">
                                <button
                                    className="btn btn-outline-secondary rounded-pill w-50 py-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editarmaterialesModal">Editar Materiales</button>
                            </div>
                        </div>

                        <form onSubmit={editarSubmit}>
                            <div className="modal fade" id="editarmaterialesModal" tabIndex="-1" aria-labelledby="editarmaterialesModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="editarmaterialesModalLabel">Editar Material</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el ID del material a editar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMaterial.Id_Material}
                                                        onChange={(e)=> setEditarMaterial({...editarMaterial, Id_Material:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese el nuevo material</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMaterial.Material}
                                                        onChange={(e)=> setEditarMaterial({...editarMaterial, Material:e.target.value})}
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
                    <div className="admin-option col-lg-3 col-md-4 m-3">
                        <div className="box-part text-center">
                            <div className="title">
                                <button
                                    className="btn btn-outline-secondary rounded-pill w-50 py-3"
                                    data-bs-toggle="modal"
                                    data-bs-target="#eliminarmaterialesModal">Eliminar Materiales</button>
                            </div>
                        </div>

                        <form onSubmit={eliminarSubmit}>
                            <div className="modal fade" id="eliminarmaterialesModal" tabIndex="-1" aria-labelledby="eliminarmaterialesModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="eliminarmaterialesModalLabel">Eliminar Material</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el ID del material a eliminar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={eliminarMaterial.Id_Material}
                                                        onChange={(e)=> setEliminarMaterial({...eliminarMaterial, Id_Material:e.target.value})}
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

export default Material;