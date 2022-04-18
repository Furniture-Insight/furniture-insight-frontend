import React from "react";
import { useState, useEffect } from "react";
import { YearPicker, MonthPicker } from 'react-dropdown-date';
import Cookies from 'universal-cookie';

function CheckoutPaypal() {

    const cookies = new Cookies()
    const [payapl, setPaypal] = useState([])
    const [newPaypal, setNewPaypal] = useState({
        Mail: "",
        Contraseña: "",        
        UsuarioIdUsuario: cookies.get('Id_Usuario')
    })
    const [factura, setFactura] = useState({
        Fecha_Pedido: "",
        Direccion_Envio: "",
        Direccion_Facturacion: "",
        Id_Carrito: ""
    })

    useEffect(() => {
        const getPaypal = async () => {
            const response = await fetch(`http://localhost:5000/metodopago/obtener/${cookies.get('Id_Usuario')}`);
            const result = await response.json();           
            setPaypal(result);
        };
        getPaypal();
    }, [])

    const crearPaypal = () => {
        fetch('http://localhost:5000/metodopaypal/crear', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTarjeta)
        })
    }

    const crearFactura = () => {
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        crearPaypal();
    }

    const handleSubmit2 = (event) => {
        event.preventDefault();
        
    }

    console.log(newTarjeta);
    return (
        <div className="container">
            <div className="row mt-3">
                <h3 className="h3">Mis Tarjetas</h3>
            </div>
            <div className="row mt-3">
                {tarjeta.map((item) => (
                    <div className="form-check" key={item.Id_MetodoPago}>
                        <input className="form-check-input" type="radio" id="flexTarjetaRadio" />
                        <label className="form-check-label" for="flexTarjetaRadio">{item.MetodoTarjeta.Numero_Tarjeta}</label>
                        <label className="form-check-label ms-2" for="flexTarjetaRadio">{item.MetodoTarjeta.Nombre}</label>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-secondary rounded-pill w-25"
                    data-bs-toggle="modal"
                    data-bs-target="#cardModal">Agregar tarjeta</button>
            </div>
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-secondary rounded-pill w-25"
                    data-bs-toggle="modal"
                    data-bs-target="#facturaModal">Terminar Pago</button>
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
                                        <label className="col-form-label">Numero de Tarjeta</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={newTarjeta.Numero_Tarjeta}
                                            onChange={(e) => setNewTarjeta({ ...newTarjeta, Numero_Tarjeta: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">CVV</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="text"
                                            id="inputCvvTarjeta"
                                            className="form-control"
                                            value={newTarjeta.CVV_CV2}
                                            onChange={(e) => setNewTarjeta({ ...newTarjeta, CVV_CV2: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Fecha de Expiracion</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={newTarjeta.Fecha_Expiracion}
                                            onChange={(e) => setNewTarjeta({ ...newTarjeta, Fecha_Expiracion: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Nombre de la Tarjeta</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={newTarjeta.Nombre}
                                            onChange={(e) => setNewTarjeta({ ...newTarjeta, Nombre: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-outline-secondary rounded-pill"
                                    type="submit"
                                    data-bs-dismiss="modal"
                                >Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={handleSubmit2}>
                <div className="modal fade" id="facturaModal" tabIndex="-1" aria-labelledby="facturaModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="facturaModalLabel">Terminar Pago</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <label className="col-form-label">Fecha Pedido</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="date"
                                            className="form-control"
                                            value={factura.Fecha_Pedido}
                                            onChange={(e) => setFactura({ ...factura, Fecha_Pedido: e.target.value })} />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Direccion de Envio</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={factura.Direccion_Envio}
                                            onChange={(e) => setFactura({ ...factura, Direccion_Envio: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <label className="col-form-label">Direccion de Facturacion</label>
                                    </div>
                                    <div className="col">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={factura.Direccion_Facturacion}
                                            onChange={(e) => setFactura({ ...factura, Direccion_Facturacion: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-outline-secondary rounded-pill"
                                        type="submit"
                                        data-bs-dismiss="modal"
                                    >Pagar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPaypal;