import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import bed from "../images/bed.jpg";
import chairs from "../images/chairs.jpg";
import table from "../images/table.jpg";
import desk from "../images/desk.jpg";

function Store() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [buscandoMuebles, setBuscandoMuebles] = useState(false);
    const [muebles, setMuebles] = useState([]);
    const [muebleUpdated, setMuebleUpdated] = useState("");

    useEffect(() => {
        fetch('https://furniture-insight-app.herokuapp.com/mueble/all')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMuebles(result)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])
    const [busqueda, setBusqueda] = useState(
        {
            Nombre: ""
        }
    )

    const buscarMueblePorNombre = () => {
        fetch(`http://localhost:8000/mueble/mueble/${busqueda.Nombre}`)
            .then(async response => {
                const data = await response.json()
                console.log(data)
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        buscarMueblePorNombre();
        setBuscandoMuebles(true);
    }

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Cargando productos...</div>
    } else {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col mb-3">
                        <h2 className="h2 text-center">Store</h2>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row mt-3 mb-3">
                        <div className="col-3 search-bar">
                            <input
                                className="form-control rounded-pill border border-dark"
                                type="text"
                                placeholder="Buscar Mueble"
                                value={busqueda.buscar}
                                onChange={(e) => setBusqueda({ ...busqueda, Nombre: e.target.value })} />
                        </div>
                        <div className="col-1">
                            <input
                                className="form-control rounded-pill border border-dark"
                                type="text"
                                placeholder="Ancho" />
                        </div>
                        <div className="col-1">
                            <input
                                className="form-control rounded-pill border border-dark"
                                type="text"
                                placeholder="Largo"
                            />
                        </div>
                        <div className="col">
                            <button
                                type="button"
                                className="btn btn-secondary rounded-pill"
                                onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faMagnifyingGlass}
                                /> Search</button>
                        </div>
                    </div>
                </form>
                <div className="row justify-content-center">
                    {muebles.map((mueble) => (
                        <div className="col-auto" key={mueble.Id_Mueble} style={{ "maxWidth": "18rem" }}>
                            <div className="card text-center">
                                <div className="card-body text-dark bg-light">
                                    <h5 className="card-title">{mueble.Nombre}</h5>
                                    <p className="card-text">Precio: {mueble.Precio}</p>
                                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#muebleModal" onClick={() => { setMuebleUpdated(mueble) }}>
                                        Ver Detalles
                                    </button>
                                </div>
                                <div className="modal fade" id="muebleModal" tabIndex="-1" aria-labelledby="muebleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title" id="muebleModalLabel">{muebleUpdated.Nombre}</h5>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <dl className="row">
                                                    <dt className="col-sm-3">Descripcion</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Descripcion}</dd>

                                                    <dt className="col-sm-3">Anchura</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Anchura}</dd>

                                                    <dt className="col-sm-3">Altura</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Altura}</dd>

                                                    <dt className="col-sm-3">Profundidad</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Profundidad}</dd>

                                                    <dt className="col-sm-3">Medidas Adicionales</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Medidas_Adicionales}</dd>

                                                    <dt className="col-sm-3">Color</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Color}</dd>

                                                    <dt className="col-sm-3">Precio</dt>
                                                    <dd className="col-sm-9">{muebleUpdated.Precio}</dd>
                                                </dl>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary">Agregar al Carrito</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Store;