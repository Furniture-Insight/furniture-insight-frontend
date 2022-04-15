import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Buffer } from 'buffer';

function Store({clickedMueble}) {
    let navigate = useNavigate();
    const [muebles, setMuebles] = useState([]);
    const [busqueda, setBusqueda] = useState("")

    const getMuebles = async () => {
        const response = await fetch('https://furniture-insight-app.herokuapp.com/mueble/all')
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
    
    const buscarMueblePorNombre = () => {
        fetch(`http://localhost:8000/mueble/mueble/${busqueda.Nombre}`)
            .then(async response => {
                const data = await response.json()
                console.log(data)
            })
    }

    const handleClick = () => {
        navigate("/mueble", {replace:true})
    }
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col mb-3">
                    <h2 className="h2 text-center">Store</h2>
                </div>
            </div>
            <form>
                <div className="row mt-3 mb-3">
                    <div className="col-3 search-bar">
                        <input
                            className="form-control rounded-pill border border-dark"
                            type="text"
                            placeholder="Buscar Mueble"
                            onChange={event => setBusqueda(event.target.value)} />
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
                            className="btn btn-secondary rounded-pill">
                            <FontAwesomeIcon icon={faMagnifyingGlass}
                            /> Search</button>
                    </div>
                </div>
            </form>
            <div className="col">
                <div className="row row-cols-2">

                    {
                        muebles.filter(mueble => {
                            if (busqueda === "") {
                                return mueble
                            } else if (mueble.Nombre.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                                return mueble
                            }
                        }).map((mueble) => (
                            <div className="col" key={mueble.Id_Mueble}>
                                <div onClick={handleClick}>
                                    <div className="card border-secondary text-center mb-3" style={{ "maxWidth": "33.75rem" }} onClick={() => clickedMueble(mueble)}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={`data:image/${clickedMueble.mimetype};base64,${mueble.data}`} className="img-fluid rounded-start" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{mueble.Nombre}</h5>
                                                    <p className="card-text">{mueble.Precio}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Store;