import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import bed from "../images/bed.jpg";
import chairs from "../images/chairs.jpg";
import table from "../images/table.jpg";
import desk from "../images/desk.jpg";

function Store() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [muebles, setMuebles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/mueble/all')
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

    console.log(muebles)

    const [busqueda, setBusqueda] = useState(
        {
            buscar: "",
            ancho: "",
            largo: ""
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Data entered");
        console.log(busqueda);
    }

    if(error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else{
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
                                type = "text"                    
                                placeholder="Buscar Mueble"
                                value={busqueda.buscar}
                                onChange={(e) => setBusqueda({...busqueda, buscar: e.target.value})} />
                        </div>
                        <div className="col-1">
                            <input 
                                className="form-control rounded-pill border border-dark"
                                type="text" 
                                placeholder="Ancho"
                                value={busqueda.ancho}
                                onChange={(e) => setBusqueda({...busqueda, ancho: e.target.value})}/>
                        </div>
                        <div className="col-1">
                            <input 
                                className="form-control rounded-pill border border-dark" 
                                type="text"
                                placeholder="Largo"
                                value={busqueda.largo}
                                onChange={(e) => setBusqueda({...busqueda, largo: e.target.value})}/>
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
                <div>
                    <h2 className="h2 text-center">Muebles</h2>
                    <div className="item-container mt-3">
                        {muebles.map((mueble) => (
                            <div className="cards" key={mueble.Id_Mueble}>
                                <h3 className="h3">{mueble.Nombre}</h3>
                                <p>{mueble.Precio}</p>
                            </div>
                        ))}                        
                    </div>
                </div>                           
            </div>
        )   
    }
}

export default Store;