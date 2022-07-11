import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function SubCategorias() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }

    const [subCategorias, setSubCategorias] = useState([]);
    const [nuevaSubCategoria, setNuevaSubCategoria] = useState({
        Id_Categoria: "",
        SubCategoria: ""
    })
    const [editarSubCategoria, setEditarSubcategoria] = useState({
        Id_SubCategoria: "",
        Id_Categoria: "",
        SubCategoria: ""
    })
    const [eliminarSubCategoria, setEliminarSubCategoria] = useState({
        Id_SubCategoria: ""
    })

    const getSubCategorias = async () => {
        const response = await fetch('https://furniture-insight-app.herokuapp.com/subcategoria/all')
        const result = await response.json()
        setSubCategorias(result);
    }

    useEffect(() => {
        getSubCategorias();
    }, [setSubCategorias])

    const crearSubCategoria = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaSubCategoria)
        }

        fetch('https://furniture-insight-app.herokuapp.com/subcategoria/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("SubCategoria creada.")
                }
            })
    }

    const editarSubCategorias = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editarSubCategoria)
        }

        fetch(`https://furniture-insight-app.herokuapp.com/subcategoria/update/${editarSubCategoria.Id_SubCategoria}`, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("SubCategoria editada.")
            }
        })
    }

    const eliminarSubCategorias = () => {
        fetch(`https://furniture-insight-app.herokuapp.com/subcategoria/delete/${eliminarSubCategoria.Id_SubCategoria}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("SubCategoria eliminada.")
            }
        })
    }

    const crearSubmit = (event) => {
        event.preventDefault();
        crearSubCategoria();
    }

    const editarSubmit = (event) => {
        event.preventDefault();
        editarSubCategorias();
    }

    const eliminarSubmit = (event) => {
        event.preventDefault();
        eliminarSubCategorias();
    }
    return(
        <div className="box text-center">
            <button
            className="btn btn-outline-secondary rounded-pill m-3"
            onClick={gotoDashboard}>Back to Dashboard</button>
            <h1 className="m-5">SubCategorias</h1>
            <div className="container-mueble">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#viewsubModal">
                            Ver SubCategorias
                        </button>

                        <div className="modal fade" id="viewsubModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Listado de Subcategorias</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {subCategorias.map((item) =>  (
                                        <div key={item.Id_SubCategoria}>
                                            <dl className="row p-3">
                                                <dt className="col-sm-3 p-3">ID</dt>
                                                <dd className="col-sm-9 p-3">{item.Id_SubCategoria}</dd> 

                                                <dt className="col-sm-3 p-3">ID Categoria</dt>
                                                <dd className="col-sm-9 p-3">{item.Id_Categoria}</dd> 

                                                <dt className="col-sm-3 p-3">SubCategoria</dt>
                                                <dd className="col-sm-9 p-3">{item.SubCategoria}</dd>                                  
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
                            data-bs-target="#crearsubcategoriaModal">
                            Crear Subcategoria
                        </button>
                        <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="crearsubcategoriaModal" tabIndex="-1" aria-labelledby="crearsubcategoriaModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="crearsubcategoriaModalLabel">Crear Categoria</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Id Categoria</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevaSubCategoria.Id_Categoria}
                                                        onChange={(e) => setNuevaSubCategoria({ ...nuevaSubCategoria, Id_Categoria: e.target.value })} />

                                                    <label className="col-form-label">SubCategoria</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevaSubCategoria.SubCategoria}
                                                        onChange={(e) => setNuevaSubCategoria({ ...nuevaSubCategoria, SubCategoria: e.target.value })} />
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
                        data-bs-target="#editarsubcategoriaModal">
                            Editar SubCategoria
                        </button>
                        <form onSubmit={editarSubmit}>
                            <div className="modal fade" id="editarsubcategoriaModal" tabIndex="-1" aria-labelledby="editarsubcategoriaModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="editarmaterialesModalLabel">Editar SubCategoria</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el Id de la subcategoria a editar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarSubCategoria.Id_SubCategoria}
                                                        onChange={(e)=> setEditarSubcategoria({...editarSubCategoria, Id_SubCategoria:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese el Id de la categoria de la subcategotia a editar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarSubCategoria.Id_Categoria}
                                                        onChange={(e)=> setEditarSubcategoria({...editarSubCategoria, Id_Categoria:e.target.value})}
                                                    />
                                                    <label className="col-form-label">SubCategoria</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarSubCategoria.SubCategoria}
                                                        onChange={(e)=> setEditarSubcategoria({...editarSubCategoria, SubCategoria:e.target.value})}
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
                        data-bs-target="#eliminarsubcategoriaModal">
                            Borrar Subcategoria
                        </button>
                        <form onSubmit={eliminarSubmit}>
                            <div className="modal fade" id="eliminarsubcategoriaModal" tabIndex="-1" aria-labelledby="eliminarsubcategoriaModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="eliminarsubcategoriaModalLabel">Eliminar SubCategoria</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el Id de la subcategoria a eliminar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={eliminarSubCategoria.Id_SubCategoria}
                                                        onChange={(e)=> setEliminarSubCategoria({...eliminarSubCategoria, Id_SubCategoria:e.target.value})}
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

export default SubCategorias;