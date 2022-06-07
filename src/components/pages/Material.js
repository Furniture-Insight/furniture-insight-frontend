import React, { useState } from "react";
import { useEffect } from 'react';

function Material() {

    const [material, setMaterial] = useState({
        Material: ""
    })

    const crearMaterial = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(material)
        }

        fetch('http://localhost:8000/material/crear', requestOptions)
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

    const handleSubmit = (event) => {
        event.preventDefault();
        crearMaterial();
    }
    return (
        <div className="box">
            <h1 className='text-center m-5'> Materiales </h1>
            <h3 className='text-center m-3'> Elija un opcion: </h3>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-4 m-3">
                        <div className="box-part text-center">
                            <div className="title">
                                <button
                                    className="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#crearmaterialModal">Crear Material</button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                                        value={material.Material}
                                                        onChange={(e) => setMaterial({ ...material, Material: e.target.value })} />
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
                </div>
            </div>
        </div>
    )
}

export default Material;