import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import bed from "../images/bed.jpg";

function Search() {

    const [mueble, setMueble] = useState(
        {
            buscar: "",
            ancho: "",
            largo: ""
        }
    )

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Data entered");
        console.log(mueble);
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
                            type = "text"                    
                            placeholder="Buscar Mueble"
                            value={mueble.buscar}
                            onChange={(e) => setMueble({...mueble, buscar: e.target.value})} />
                    </div>
                    <div className="col-1">
                        <input 
                            className="form-control rounded-pill border border-dark"
                            type="text" 
                            placeholder="Ancho"
                            value={mueble.ancho}
                            onChange={(e) => setMueble({...mueble, ancho: e.target.value})}/>
                    </div>
                    <div className="col-1">
                        <input 
                            className="form-control rounded-pill border border-dark" 
                            type="text"
                            placeholder="Largo"
                            value={mueble.largo}
                            onChange={(e) => setMueble({...mueble, largo: e.target.value})}/>
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
            <div className="row mt-5">
                <div className="col">
                    <h3 className="h3 text-center">"Furniture Selected"</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img className="center img-thumbnail border border-dark" src={bed} alt="bed.jpg" />
                    <h5 className="h5 text-center">"Bed 1"</h5>
                </div>
                <div className="col">
                    <img className="center img-thumbnail border border-dark" src={bed} alt="bed.jpg" />
                    <p className="h5 text-center">"Bed 2"</p>
                </div>
                <div className="col">
                    <img className="center img-thumbnail border border-dark" src={bed} alt="bed.jpg" />
                    <p className="h5 text-center">"Bed 3"</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img className="center img-thumbnail border border-dark" src={bed} alt="bed.jpg" />
                    <p className="h5 text-center">"Bed 4"</p>
                </div>
                <div className="col">
                    <img className="center img-thumbnail border border-dark" src={bed} alt="bed.jpg" />
                    <p className="h5 text-center">"Bed 5</p>
                </div>
                <div className="col">
                    <img className="center img-thumbnail border border-dark" src={bed} alt="bed.jpg" />
                    <p className="h5 text-center">"Bed 6"</p>
                </div>
            </div>
        </div>
    )
}

export default Search;