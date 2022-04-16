import React from "react";
import { useState } from "react";
import { MonthPicker, YearPicker } from "react-dropdown-date";

function Checkout() {   
    const cookies = new Cookies()
    const [tarjeta, setTarjeta] = useState([])
    const [newTarjeta, setNewTarjeta] = useState({
        Numero_Tarjeta: "",
        CVV_CV2: "",
        Fecha_Expiracion: "", 
        Nombre: "",
        UsuarioIdUsuario: cookies.get('Id_Usuario')
    })
    const [clickedTarjeta, setClickedTarjeta] = useState([])
    
    useEffect(() => {
        const getTarjeta = async () => {
            const response = await fetch(`http://localhost:8000/metodopago/obtener/${cookies.get('Id_Usuario')}`);
            const result = await response.json();
            for (const item of result) {
                const last4Num = String(item.MetodoTarjeta.Numero_Tarjeta).slice(-4);
                item.MetodoTarjeta.Numero_Tarjeta = last4Num;
            }
            setTarjeta(result);
        };
        getTarjeta();
    }, [])

    const crearTarjeta = () => {
        fetch('http://localhost:8000/metodotarjeta/crear', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTarjeta)
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Data entered");
        console.log(card);
    }

    const handleClick = () => {        
    }

    return (
        <div className="container lh-lg">
            <div className="row">
                <h5 className="h5">Mis tarjetas</h5>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="cardRadio" />
                    <label class="form-check-label" for="cardRadio">
                        Tarjeta 1
                    </label>
                </div>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="cardRadio2" checked />
                    <label class="form-check-label" for="cardRadio2">
                        Tarjeta 2
                    </label>
                </div>
                <button
                    type="button"
                    className="btn btn-secondary rounded-pill w-25"
                    data-bs-toggle="modal"
                    data-bs-target="#cardModal">Agregar tarjeta</button>

                <button
                    type="button"
                    className="btn btn-secondary rounded-pill w-25"
                    data-bs-toggle="modal"
                    data-bs-target="#cardModal">Procesar Pago</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="cardModalLabel">Agregar tarjeta de credito o debito</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label for="inputNumeroTarjeta" className="col-form-label">Numero de Tarjeta</label>
                                    </div>
                                    <div className="col">
                                        <input 
                                            required 
                                            type="text" 
                                            id="inputNumeroTarjeta" 
                                            className="form-control"
                                            value={card.numero}
                                            onChange={(e) => setCard({...card, numero: e.target.value})} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label for="inputNombreTarjeta" className="col-form-label">Nombre en la Tarjeta</label>
                                    </div>
                                    <div className="col">
                                        <input 
                                            required 
                                            type="text" 
                                            id="inputNombreTarjeta" 
                                            className="form-control"
                                            value={card.nombre}
                                            onChange={(e) => setCard({...card, nombre: e.target.value})} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label for="inputFechaExpTarjeta" className="col-form-label">Fecha de Expiracion</label>
                                    </div>
                                    <div className="col">                                        
                                        <MonthPicker 
                                            numeric
                                            id="month" 
                                            required                                              
                                            classes="form-select"                                             
                                            value={card.mes_expiracion}
                                            onChange={(mes_expiracion) => setCard({...card,mes_expiracion})}/>
                                        <label for="month">Mes</label>
                                    </div>
                                    <div className="col me-0">
                                        <YearPicker 
                                            id="year" 
                                            required 
                                            start={2022} 
                                            end={2040} 
                                            classes="form-select"                                         
                                            value={card.año_expiracion}
                                            onChange={(año_expiracion) => setCard({...card,año_expiracion})}/>
                                        <label for="year">Año</label>
                                    </div>
                                    <div className="col me-0">
                                        <input 
                                            id="inputCVVTarjeta" 
                                            required                                             
                                            className="form-control"
                                            minLength="3"  
                                            maxLength="3"                                      
                                            value={card.cvv}
                                            onChange={(e) => setCard({...card, cvv: e.target.value})}/>
                                        <label for="inputCVVTarjeta">CVV</label>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                className="btn btn-outline-secondary rounded-pill"
                                type="submit"
                                data-bs-dismiss="modal"
                                onClick={handleClick}>Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;