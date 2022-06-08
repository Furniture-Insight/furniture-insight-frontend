import React from "react";
import { useState, useEffect } from "react";

function Muebles() {
    const [muebles, setMuebles] = useState([]);

    const getMuebles = async () => {
        const response = await fetch('http://localhost:8000/mueble/all')
        const result = await response.json()
        setMuebles(result);
    }

    useEffect(() => {
        getMuebles();
    }, [])

    return(
        <div className="box text-center">
            <h1 className="m-5">Muebles</h1>
            <div className="container-mueble">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#viewmuebleModal">
                            Ver Muebles
                        </button>

                        <div className="modal fade" id="viewmuebleModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Listado de muebles</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {muebles.map((item) =>  (
                                        <div key={item.Id_Mueble}>
                                            <dl className="row p-3">
                                                <dt className="col-sm-3 p-3">ID</dt>
                                                <dd className="col-sm-9 p-3">{item.Id_Mueble}</dd> 

                                                <dt className="col-sm-3 p-3">Mueble</dt>
                                                <dd className="col-sm-9 p-3">{item.Nombre}</dd>

                                                <dt className="col-sm-3 p-3">Descripcion</dt>
                                                <dd className="col-sm-9 p-3">{item.Descripcion}</dd>                                      
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
                            data-bs-target="#createModal">
                            Crear Mueble
                        </button>
                    </div>
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button 
                        className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal">
                            Editar Mueble
                        </button>
                    </div>
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                            Borrar Mueble
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Muebles;