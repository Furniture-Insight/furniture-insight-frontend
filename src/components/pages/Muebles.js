import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


function Muebles() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }
    const [muebles, setMuebles] = useState([]);
    const [nuevomueble, setNuevoMueble] = useState({
        Id_Material: "",
        Id_SubCategoria: "",
        Nombre: "",
        Descripcion: "",
        Anchura: "",
        Altura: "",
        Profundidad: "",
        Medidas_Adicionales: "",
        Precio: "",
        Color: "",
        Cantidad: "",
    })
    const [editarMueble, setEditarMueble] = useState({
        Nombre: "",
        Descripcion: "",
        Anchura: "",
        Altura: "",
        Profundidad: "",
        Medidas_Adicionales: "",
        Precio: "",
        Color: "",
        Cantidad: "",
        filename: ""
    })
    const [eliminarMueble, setEliminarMueble] = useState({
        Nombre: ""
    })

    const getMuebles = async () => {
        const response = await fetch('https://furniture-insight-app.herokuapp.com/mueble/all')
        const result = await response.json()
        setMuebles(result);
    }

    const crearMuebles = () => {
        const requestOptions = {
            method: 'POST',
            headers: {  'Content-Type': 'application/json' },
            body: JSON.stringify(nuevomueble)
        }

        fetch('https://furniture-insight-app.herokuapp.com/mueble/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Mueble creado.")
                }
            })
    }

    const editarMuebles = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editarMueble)
        }

        fetch(`https://furniture-insight-app.herokuapp.com/mueble/update/${editarMueble.Nombre}`, requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Mueble editado.")
                }
            })
    }

    const eliminarMuebles = () => {
        fetch(`https://furniture-insight-app.herokuapp.com/mueble/delete/${eliminarMueble.Nombre}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("Mueble eliminado.")
            }
        })
    }

    useEffect(() => {
        getMuebles();
    }, [])

    const crearSubmit = (event) => {
        event.preventDefault();
        crearMuebles();
    }

    const editarSubmit = (event) => {
        event.preventDefault();
        editarMuebles();
    }
    
    const eliminarSubmit = (event) => {
        event.preventDefault();
        eliminarMuebles();
    }

    return(
        <div className="box text-center">
            <button
            className="btn btn-outline-secondary rounded-pill m-3"
            onClick={gotoDashboard}>Back to Dashboard</button>
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
                            data-bs-target="#crearmuebleModal">
                            Crear Mueble
                        </button>

                        <form onSubmit={crearSubmit}>
                            <div className="modal fade" id="crearmuebleModal" tabIndex="-1" aria-labelledby="crearmuebleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="crearmuebleModalLabel">Crear Mueble</h4>
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
                                                        value={nuevomueble.Nombre}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Nombre: e.target.value })} />

                                                    <label className="col-form-label">Descripcion</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Descripcion}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Descripcion: e.target.value })} />

                                                    <label className="col-form-label">Anchura</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Anchura}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Anchura: e.target.value })} />

                                                    <label className="col-form-label">Altura</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Altura}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Altura: e.target.value })} />
                                                    
                                                    <label className="col-form-label">Profundidad</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Profundidad}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Profundidad: e.target.value })} />
                                                    
                                                    <label className="col-form-label">Medidas adicionales</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Medidas_Adicionales}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Medidas_Adicionales: e.target.value })} />

                                                    <label className="col-form-label">Precio</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Precio}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Precio: e.target.value })} />

                                                    <label className="col-form-label">Cantidad</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Cantidad}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Cantidad: e.target.value })} />

                                                    <label className="col-form-label">Color</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Color}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Color: e.target.value })} /> 

                                                    <label className="col-form-label">Imagen</label>
                                                    <input
                                                        required
                                                        type="file"
                                                        className="form-control"
                                                        id="formFile"
                                                        value={nuevomueble.filename}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, filename: e.target.value })} />

                                                    <label className="col-form-label">Material (ID)</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Id_Material}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Id_Material: e.target.value })} />

                                                    <label className="col-form-label">SubCategoria (ID)</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={nuevomueble.Id_SubCategoria}
                                                        onChange={(e) => setNuevoMueble({ ...nuevomueble, Id_SubCategoria: e.target.value })} />
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
                        data-bs-target="#editarmuebleModal">
                            Editar Mueble
                        </button>

                        <form onSubmit={editarSubmit}>
                            <div className="modal fade" id="editarmuebleModal" tabIndex="-1" aria-labelledby="editarmuebleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="editarmuebleModalLabel">Editar Mueble</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el nombre del mueble a editar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Nombre}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Nombre:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese la nueva descripcion:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Descripcion}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Descripcion:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese el nuevo precio:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Precio}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Precio:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese la nueva anchura:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Anchura}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Anchura:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese la nueva altura:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Altura}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Altura:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese la nueva profundidad:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Profundidad}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Profundidad:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese las nuevas medidas adicionales:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Medidas_Adicionales}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Medidas_Adicionales:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese el nuevo color:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Color}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Color:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese la nueva cantidad:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Cantidad}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Cantidad:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese el nuevo material:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Id_Material}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Id_Material:e.target.value})}
                                                    />
                                                    <label className="col-form-label mt-3">Ingrese la nueva subcategoria:</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={editarMueble.Id_SubCategoria}
                                                        onChange={(e)=> setEditarMueble({...editarMueble, Id_SubCategoria:e.target.value})}
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
                        data-bs-target="#deletemuebleModal">
                            Borrar Mueble
                        </button>
                        
                        <form onSubmit={eliminarSubmit}>
                            <div className="modal fade" id="deletemuebleModal" tabIndex="-1" aria-labelledby="deletemuebleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h4 className="modal-title" id="deletemuebleModalLabel">Eliminar Mueble</h4>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="row m-3">
                                                <div className="col">
                                                    <label className="col-form-label">Ingrese el nombre del mueble a eliminar</label>
                                                    <input
                                                        required
                                                        type="text"
                                                        className="form-control"
                                                        value={eliminarMueble.Nombre}
                                                        onChange={(e)=> setEliminarMueble({...eliminarMueble, Nombre:e.target.value})}
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

export default Muebles;