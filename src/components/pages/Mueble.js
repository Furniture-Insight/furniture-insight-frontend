import React from "react";

function Mueble({ clickedMueble }) {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={`data:image/${clickedMueble.mimetype};base64,${clickedMueble.data}`} className="img-fluid rounded-start" style={{ "maxWidth": "33.75rem" }} />
                        <div className="row">
                            <div className="col">
                                <h3 className="h3">{clickedMueble.Precio}</h3>
                            </div>
                            <div className="col">
                                <button className="btn btn-secondary">Agregar al Carrito</button>
                            </div>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <h3 className="h3">{clickedMueble.Nombre}</h3>
                        <div className="mt-3">
                            <dl className="row">
                                <dt className="col-sm-3">Descripcion</dt>
                                <dd className="col-sm-9">{clickedMueble.Descripcion}</dd>

                                <dt className="col-sm-3">Color</dt>
                                <dd className="col-sm-9">{clickedMueble.Color}</dd>                                

                                <dt className="col-sm-3">Material</dt>
                                <dd className="col-sm-9">{clickedMueble.Material.Material}</dd>

                                <dt className="col-sm-3">Categoria</dt>
                                <dd className="col-sm-9">{clickedMueble.SubCategorium.SubCategoria}</dd>

                                <dt className="col-sm-3">Ancho</dt>
                                <dd className="col-sm-9">{clickedMueble.Anchura}</dd>

                                <dt className="col-sm-3">Altura</dt>
                                <dd className="col-sm-9">{clickedMueble.Altura}</dd>

                                <dt className="col-sm-3">Profundidad</dt>
                                <dd className="col-sm-9">{clickedMueble.Profundidad}</dd>

                                <dt className="col-sm-3">Medidas Adicionales</dt>
                                <dd className="col-sm-9">{clickedMueble.Medidas_Adicionales}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Mueble;