import React from "react";
import { useState, useEffect } from "react";

function Categorias() {
    const [categoria, setCategoria] = useState({});
    const [nuevacategoria, setNuevaCategoria] = useState({
        Categoria:""
    })

    const getCategoria = async () => {
        const response = await fetch('http://localhost:8000/categoria/1')
        const result = await response.json()
        setCategoria(result);
    }

    const crearCategoria = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevacategoria)
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
    }, [])

    const crearSubmit = (event) => {
        event.preventDefault();
        crearCategoria();
    }

    return(
        <div className="box text-center">
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
                                    <div>
                                        <dl className="row p-3">
                                            <dt className="col-sm-3 p-3">ID</dt>
                                            <dd className="col-sm-9 p-3">{categoria.Id_Categoria}</dd> 

                                            <dt className="col-sm-3 p-3">Categoria</dt>
                                            <dd className="col-sm-9 p-3">{categoria.Categoria}</dd>                                   
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
                                                        value={nuevacategoria.Categoria}
                                                        onChange={(e) => setNuevaCategoria({ ...nuevacategoria, Categoria: e.target.value })} />
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
                        data-bs-target="#editModal">
                            Editar Categoria
                        </button>
                    </div>

                    <div className="admin-option col-lg-3 col-md-3 m-3">
                        <button className="btn btn-outline-secondary rounded-pill w-50 py-3"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal">
                            Borrar Categoria
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categorias;