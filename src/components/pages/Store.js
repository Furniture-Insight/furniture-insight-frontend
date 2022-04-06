import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Buffer } from 'buffer';

function Store() {
    const [muebles, setMuebles] = useState([]);   

    const getMuebles = async () => {
        const response = await fetch('http://localhost:8000/mueble/all')
        const result = await response.json()
        for (const item of result) {
            const b64 = Buffer.from(item.data).toString("base64");
            item.data = b64;           
        }
        setMuebles(result);
    }    

    useEffect(() => {
        getMuebles();        
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
    }
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
                    <div className="col" key={mueble.Id_Mueble}>
                        <div className="card mb-3" style={{ "maxWidth": "33.75rem" }}>
                            <div className="row g-0">
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <div className="col-md-4">
                                            <img src={`data:image/jpg;base64,${mueble.data}`} className="img-fluid rounded-start" />
                                        </div>
                                        <h5 className="card-title">{mueble.Nombre}</h5>
                                        <p className="card-text">{mueble.Precio}</p>
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

export default Store;