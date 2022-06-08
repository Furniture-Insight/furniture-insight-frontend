import React from "react";
import { useState, useEffect } from "react";

function SubCategorias() {

    const [subCategorias, setSubcategorias] = useState([]);

    const getSubcategorias = async () => {
        const response = await fetch('http://localhost:8000/subcategorias/all')
        const result = await response.json()
        setSubcategorias(result);
    }

    useEffect(() => {
        getSubcategorias();
    }, [])

    return(
        <div className="box text-center">
            <h1 className="m-5">SubCategorias</h1>
            <div className="container-mueble">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#viewsubModal">
                            Ver Subcategorias
                        </button>

                        <div className="modal fade" id="viewsubModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Listado de Subcategorias</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {/* {subCategorias.map((item) =>  (
                                        <div key={item.Id_SubCategoria}>
                                            <dl className="row p-3">
                                                <dt className="col-sm-3 p-3">ID</dt>
                                                <dd className="col-sm-9 p-3">{item.Id_SubCategoria}</dd> 

                                                <dt className="col-sm-3 p-3">SubCategoria</dt>
                                                <dd className="col-sm-9 p-3">{item.SubCategoria}</dd>                                    
                                            </dl>
                                        </div>
                                    ))} */}
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
                            Crear Subcategoria
                        </button>
                    </div>

                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button 
                        className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#editModal">
                            Editar Subcategoria
                        </button>
                    </div>
                    
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                            Borrar Subcategoria
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCategorias;