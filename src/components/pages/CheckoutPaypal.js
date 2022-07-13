import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import pp from '../images/pp.png'

function CheckoutPaypal() {
    let navigate = useNavigate();
    const cookies = new Cookies()
    const current = new Date()
    const [paypal, setPaypal] = useState([])
    const [newPaypal, setNewPaypal] = useState({
        Mail: "",
        Contraseña: "",
        Id_Usuario: cookies.get('Id_Usuario')
    })

    useEffect(() => {
        const getPaypal = async () => {
            const response = await fetch(`https://furniture-insight-app.herokuapp.com/metodopago/obtener/${cookies.get('Id_Usuario')}`);
            const result = await response.json();
            for (const item of result) {
                cookies.set('Id_MetodoPagoPaypal', item.Id_MetodoPagoPaypal)
                console.log(item)
            }
            setPaypal(result);
        };
        if(cookies.get("Id_Usuario") === undefined){
            alert("Debe realizar Log In o Sign Up para continuar.")
        }
        else{
            getPaypal();
        }        
    }, [])
    
    const [factura, setFactura] = useState({
        Fecha_Pedido: `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`,
        Direccion_Envio: "",
        Direccion_Facturacion: "",
        Id_Usuario: cookies.get('Id_Usuario'),
        Id_MetodoPagoPaypal: cookies.get('Id_MetodoPagoPaypal'),
        Fecha_Emision: `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`,
        Subtotal: cookies.get('Subtotal'),
        ITBIS: cookies.get('ITBIS'),
        Total: cookies.get('Total')
    })

    console.log(paypal);
    const crearPaypal = () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPaypal)
        }

        fetch('https://furniture-insight-app.herokuapp.com/metodopaypal/crear', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                if (!response.ok) {
                    alert("Verificar que todos los campos esten llenos");
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else {
                    alert("Cuenta Paypal agregada")
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
        crearPaypal();
    }

    const handleSubmit2 = (event) => {
        event.preventDefault();
        crearFactura();
        console.log(factura)
    }

    const handleClick = () => {
        navigate("/factura", { replace: true });
    }

    console.log(newPaypal);
    return (
        <div className="container-paypal">
            <div className="row">
                <div className="col" align="center">
                    <div className="row mt-3">
                        <h3 className="h3">Mi Cuenta Paypal</h3>
                    </div>
                    <div className="row mt-3">
                        {paypal.map((item) => (
                            item.Id_MetodoPagoPaypal === null ? 
                            <div className="form-check" key={item.Id_MetodoPagoPaypal}>                                
                                <label className="form-check-label">{item.MetodoPaypal.Mail}</label>
                            </div> :
                            <div className="row mt-3 justify-content-center">
                            <button
                                type="button"
                                className="btn btn-secondary rounded-pill w-50"
                                data-bs-toggle="modal"
                                data-bs-target="#cardModal">Agregar Cuenta</button>
                        </div>                            
                        ))}
                    </div>                    
                </div>
                <div className="col">
                    <div className="row mt-3">
                        <form onSubmit={handleSubmit2}>
                            <div className="">
                                <div className="row">
                                    <div className="col-7">
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
                                    <div className="col-7">
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
                                <div>
                                    <button
                                        className="btn btn-outline-success rounded-pill m-2"
                                        type="submit"
                                    >Pagar</button>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-outline-secondary rounded-pill m-2"
                                        type="button"
                                        onClick={handleClick}
                                    >Ver Factura</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal fade" id="cardModal" tabIndex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="cardModalLabel">Agregar cuenta</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row m-3">
                                        <div className="col">
                                            <label className="col-form-label">Email</label>
                                            <input
                                                required
                                                type="email"
                                                className="form-control"
                                                value={newPaypal.Mail}
                                                onChange={(e) => setNewPaypal({ ...newPaypal, Mail: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="row m-3">
                                        <div className="col">
                                            <label className="col-form-label">Contraseña</label>
                                            <input
                                                required
                                                type="password"
                                                id="inputCvvTarjeta"
                                                className="form-control"
                                                value={newPaypal.Contraseña}
                                                onChange={(e) => setNewPaypal({ ...newPaypal, Contraseña: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="cards-cc ms-4 mb-4">
                                        <img src={pp} alt="pp.png"/>
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
        </div>
    );
};

export default CheckoutPaypal;