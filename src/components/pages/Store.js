import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import imgnotfound from "../images/ImageNotFound.png"

function Store({clickedMueble}) {
    let navigate = useNavigate();
    const [muebles, setMuebles] = useState([]);
    const [busqueda, setBusqueda] = useState("")
    
    const getMuebles = async () => {
        const response = await fetch('https://furniture-insight-app.herokuapp.com/mueble/all')
        const result = await response.json()
        for (const item of result) {
            if(item.data === null) {
                item.data = {imgnotfound}
            }
            else{
                const b64 = Buffer.from(item.data).toString("base64");
            item.data = b64;
            }            
        }
        setMuebles(result);
    }

    useEffect(() => {
        getMuebles();
    }, [])  
    
    const [pagmueble, setPagMueble] = useState(0);
    const mueblesPorPagina = 2;
    const numeroDeMueblesVisitado = pagmueble * mueblesPorPagina;


    console.log(muebles)

    const handleClick = () => {
        navigate("/mueble", {replace:true})
    }
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col mb-3">
                    <h2 className="h2 text-center my-4">Tienda de Muebles</h2>
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
                    <div className="col-3">
                    <input
                            className="form-control rounded-pill border border-dark"
                            type="text"
                            placeholder="Buscar Mueble por Categoria"
                            onChange={event => setBusqueda(event.target.value)} />                        
                    </div>
                </div>
            </form>
            <div className="col">
                <div className="row card-deck row-cols-2 mt-5">
                    {
                        // eslint-disable-next-line array-callback-return
                        muebles.filter(mueble => {
                            if (busqueda === "") {
                                return mueble
                            } else if (mueble.Nombre.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                                return mueble
                            }else if (mueble.Subcategoria.SubCategoria.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                                return mueble
                            }
                        }).map((mueble) => (
                            <div className="col" key={mueble.Id_Mueble}>
                                <div onClick={handleClick}>
                                    <div className="card border-secondary text-center mb-5" style={{ "maxWidth": "33.75rem" , "minHeight": "200px"}} onClick={() => clickedMueble(mueble)}>
                                        <div className="row mt-3 g-0">
                                            <div className="col-md-4">
                                            {
                                                mueble.data === undefined?
                                                <img src={imgnotfound} className="img-fluid rounded-start"/>
                                                :
                                                <img src={`data:image/${clickedMueble.mimetype};base64,${mueble.data}`} className="img-fluid rounded-start" />
                                                }                                                
                                            </div>
                                            <div className="col-md-8 align-self-center">
                                                <div className="card-body">
                                                    <h5 className="card-title">{mueble.Nombre}</h5>
                                                    <p className="card-text">RD$ {mueble.Precio}</p>
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