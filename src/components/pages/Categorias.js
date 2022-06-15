import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Categorias() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }
    const [categoria, setCategoria] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState({
        Categoria:""
    })
    const [eliminarCategoria, setEliminarCategoria] = useState({
        Id_Categoria: ""
    })

    const getCategoria = async () => {
        const response = await fetch('http://localhost:8000/categoria/categoria/all')
        const result = await response.json()
        setCategoria(result);
    }

    const crearCategoria = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaCategoria)
        }

        fetch('http://localhost:8000/categoria/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Categoria creada.")
                }
            })
    }

    useEffect(() => {
        getCategoria();
    }, [setCategoria])

    const eliminarCategorias = () => {
        fetch(`http://localhost:8000/categoria/borrar/${eliminarCategoria.Id_Categoria}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("Categoria eliminada.")
            }
        })
    }

    const crearSubmit = (event) => {
        event.preventDefault();
        crearCategoria();
    }

    const eliminarSubmit = (event) => {
        event.preventDefault();
        eliminarCategorias();
    }

    return(
        <div className="box text-center">
            <button
            className="btn btn-outline-secondary rounded-pill m-3"
            onClick={gotoDashboard}>Back to Dashboard</button>
            <h1 className="m-5">Categorias</h1>
            <div className="container-mueble">
                <div className="row justify-content-center">
                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button
                            className="btn btn-outline-secondary rounded-pill w-50 py-3"
                            data-bs-toggle="modal"
                            data-bs-target="#viewcatModal">
                            Ver Categoria
                        </button>
                        
                        <div className="modal fade" id="viewcatModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Categoria</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {categoria.map((item) => (
                                        <div key={item.Id_Categoria}>
                                        <dl className="row p-3">
                                            <dt className="col-sm-3 p-3">ID</dt>
                                            <dd className="col-sm-9 p-3">{item.Id_Categoria}</dd> 

                                            <dt className="col-sm-3 p-3">Categoria</dt>
                                            <dd className="col-sm-9 p-3">{item.Categoria}</dd>                                   
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
                            data-bs-target="#crearcategoriaModal">
                            Crear Categoria
                        </button>
                        <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="crearcategoriaModal" tabIndex="-1" aria-labelledby="crearcategoriaModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="crearcategoriaModalLabel">Crear Categoria</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Categoria</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevaCategoria.Categoria}
                                                        onChange={(e) => setNuevaCategoria({ ...nuevaCategoria, Categoria: e.target.value })} />
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
                            Editar Categoria
                        </button>
                    </div> */}

                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#eliminarcategoriaModal">
                            Borrar Categoria
                        </button>
                        <form onSubmit={eliminarSubmit}>
                            <div className="modal fade" id="eliminarcategoriaModal" tabIndex="-1" aria-labelledby="eliminarcategoriaModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="eliminarcategoriaModalLabel">Eliminar Material</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el ID de la categoria a eliminar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={eliminarCategoria.Id_Categoria}
                                                        onChange={(e)=> setEliminarCategoria({...eliminarCategoria, Id_Categoria:e.target.value})}
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

export default Categorias;