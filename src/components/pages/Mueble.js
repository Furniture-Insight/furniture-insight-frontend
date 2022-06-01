import React from "react";
import { useState } from "react";
import Cookies from "universal-cookie";

function Mueble({ clickedMueble}) {

    const cookies = new Cookies();

    const [carrito, setCarrito] = useState({
        Cantidad_Mueble: "",
        Id_Usuario: cookies.get('Id_Usuario'),      
        Id_Mueble: clickedMueble.Id_Mueble
    });         

    const crearCarrito = () => { 
        
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(carrito)
        }

        fetch('https://furniture-insight-app.herokuapp.com/carrito/crear', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if(!response.ok){
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else{
                alert("Mueble agregado al carrito")
            }
        })

    }

    console.log(carrito);

    const handleClick = (event) => {
        event.preventDefault();
        crearCarrito();
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={`data:image/${clickedMueble.mimetype};base64,${clickedMueble.data}`} className="img-fluid rounded-start" style={{ "maxWidth": "33.75rem" }} />
                        <div className="row">
                            <div className="col">
                                <h3 className="h3">RD$ {clickedMueble.Precio}</h3>
                            </div>
                            <div className="col">
                                <button className="btn btn-secondary" onClick={handleClick}>Agregar al Carrito</button>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <h3 className="h3">{clickedMueble.Nombre}</h3>
                        <div className="mt-3">
                            <dl className="row mt-3">
                                <dt className="col-sm-3">Descripcion</dt>
                                <dd className="col-sm-9">{clickedMueble.Descripcion}</dd>

                                <dt className="col-sm-3">Color</dt>
                                <dd className="col-sm-9">{clickedMueble.Color}</dd>

                                <dt className="col-sm-3">Material</dt>
                                <dd className="col-sm-9">{clickedMueble.Materiales.Material}</dd>

                                <dt className="col-sm-3">Categoria</dt>
                                <dd className="col-sm-9">{clickedMueble.Subcategoria.SubCategoria}</dd>

                                <dt className="col-sm-3">Ancho</dt>
                                <dd className="col-sm-9">{clickedMueble.Anchura}</dd>

                                <dt className="col-sm-3">Altura</dt>
                                <dd className="col-sm-9">{clickedMueble.Altura}</dd>

                                <dt className="col-sm-3">Profundidad</dt>
                                <dd className="col-sm-9">{clickedMueble.Profundidad}</dd>

                                <dt className="col-sm-3 mb-3">Medidas Adicionales</dt>
                                <dd className="col-sm-9">{clickedMueble.Medidas_Adicionales}</dd>

                                <dt className="col-sm-3">Cantidad</dt>
                                <dd className="col-sm-9">
                                    <input
                                        required                                
                                        className="form-control w-25"
                                        value={carrito.Cantidad_Mueble}
                                        onChange={(e) => setCarrito({...carrito, Cantidad_Mueble: e.target.value})}/>                                    
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Mueble;