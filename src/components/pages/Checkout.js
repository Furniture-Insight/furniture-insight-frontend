import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import mc from '../images/mc.jpg';
import vs from '../images/vs.png';

function Checkout() {
    let navigate = useNavigate();
    const cookies = new Cookies()
    const current = new Date()
    const [tarjeta, setTarjeta] = useState([])
    const [newTarjeta, setNewTarjeta] = useState({
        Numero_Tarjeta: "",
        CVV_CV2: "",
        Fecha_Expiracion: "",
        Nombre: "",
        Id_Usuario: cookies.get('Id_Usuario')
    })
//hmmm
    useEffect(() => {
        const getTarjeta = async () => {
            const response = await fetch(`https://furniture-insight-app.herokuapp.com/metodopago/obtener/${cookies.get('Id_Usuario')}`);
            const result = await response.json();
            for (const item of result) {
                const last4Num = String(item.MetodoTarjeta.Numero_Tarjeta).slice(-4);
                item.MetodoTarjeta.Numero_Tarjeta = last4Num;
            }
            for (const item of result) {
                cookies.set('Id_MetodoPagoTarjeta', item.Id_MetodoPagoTarjeta)
            }
            setTarjeta(result);
        };
        if(cookies.get("Id_Usuario") === undefined){
            alert("Debe hacer Log In o Sign Up para continuar.")
        }
        else{
            getTarjeta();
        }        
    }, [])

    const [factura, setFactura] = useState({
        Fecha_Pedido: `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`,
        Direccion_Envio: "",
        Direccion_Facturacion: "",
        Id_Usuario: cookies.get('Id_Usuario'),
        Id_MetodoPagoTarjeta: cookies.get('Id_MetodoPagoTarjeta'),
        Fecha_Emision: `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`,
        Subtotal: cookies.get('Subtotal'),
        ITBIS: cookies.get('ITBIS'),
        Total: cookies.get('Total')
    })

    console.log(tarjeta);
    console.log(current.getDate())
    const crearTarjeta = () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTarjeta)
        }

        fetch('https://furniture-insight-app.herokuapp.com/metodotarjeta/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Tarjeta agregada")
                }
            })
    }

    const crearFactura = () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(factura)
        }

        fetch('https://furniture-insight-app.herokuapp.com/masterfactura/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Factura creada")
                }
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        crearTarjeta();
    }

    const handleSubmit2 = (event) => {
        event.preventDefault();
        crearFactura();
        console.log(factura)
    }

    const handleClick = () => {
        navigate("/factura", { replace: true });
    }

    console.log(newTarjeta);
    return (
        <div className="container-checkout">
            <div className="row mt-3">
                <h3 className="h3">Mis Tarjetas:</h3>
            </div>
            <div className="row mt-3">
                {tarjeta.map((item) => (
                    <div className="form-check" key={item.Id_MetodoPago}>
                        <input className="form-check-input" type="radio" id="flexTarjetaRadio" />
                        <label className="form-check-label">{item.MetodoTarjeta.Numero_Tarjeta}</label>
                        <label className="form-check-label ms-2">{item.MetodoTarjeta.Nombre}</label>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill w-25"
                    data-bs-toggle="modal"
                    data-bs-target="#cardModal">Agregar tarjeta</button>
            </div>
            <div className="row mt-3">
                <form onSubmit={handleSubmit2}>
                    <div className="">
                        <div className="row">
                            <div className="col">
                                <label className="col-form-label">Direccion de Envio</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={factura.Direccion_Envio}
                                    onChange={(e) => setFactura({ ...factura, Direccion_Envio: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="row mt-3 mb-3">
                            <div className="col">
                                <label className="col-form-label">Direccion de Facturacion</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={factura.Direccion_Facturacion}
                                    onChange={(e) => setFactura({ ...factura, Direccion_Facturacion: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="m-2">
                            <button
                                className="btn btn-outline-success rounded-pill"
                                type="submit"
                            >Pagar</button>
                        </div>
                        <div className="m-2">
                            <button
                                className="btn btn-outline-secondary rounded-pill"
                                type="button"
                                onClick={handleClick}
                            >Ver Factura</button>
                        </div>
                    </div>
                </form>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="cardModalLabel">Agregar tarjeta de credito o debito</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="first-row">
                                    <div className="owner">
                                        <h5>Nombre en Tarjeta</h5>
                                        <div className="input-field mb-3">
                                            <input
                                                required
                                                type="text"
                                                className="form-control"
                                                value={newTarjeta.Nombre}
                                                onChange={(e) => setNewTarjeta({ ...newTarjeta, Nombre: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="cvv">
                                        <h5>CVV</h5>
                                        <div className="input-field mb-3">
                                            <input
                                                required
                                                type="password"
                                                id="inputCvvTarjeta"
                                                className="form-control"
                                                value={newTarjeta.CVV_CV2}
                                                onChange={(e) => setNewTarjeta({ ...newTarjeta, CVV_CV2: e.target.value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="second-row">
                                    <div className="card-number">
                                        <h5>Numero de Tarjeta</h5>
                                        <div className="input-field mb-3">
                                            <input
                                                required
                                                type="text"
                                                className="form-control"
                                                value={newTarjeta.Numero_Tarjeta}
                                                onChange={(e) => setNewTarjeta({ ...newTarjeta, Numero_Tarjeta: e.target.value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="third-row">
                                    <h5>Fecha de Expiración</h5>
                                    <div className="input-date mb-3">
                                        <div className="date">
                                            <input
                                                required
                                                type="text"
                                                className="form-control"
                                                value={newTarjeta.Fecha_Expiracion}
                                                onChange={(e) => setNewTarjeta({ ...newTarjeta, Fecha_Expiracion: e.target.value })}/>
                                        </div>
                                        <div className="cards-cc">
                                            <img src={mc} alt="mc.jpg"/>
                                            <img src={vs} alt="vs.png"/>
                                        </div>   
                                    </div>
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
            </form>
        </div>
    );
};

export default Checkout;