import React from "react";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { Buffer } from 'buffer';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons'

function Cart() {
    let navigate = useNavigate();
    const [carrito, setCarrito] = useState([]);
    const [subtotal, setSubtotal] = useState();
    const [ITBIS, setITBIS] = useState();
    const [total, setTotal] = useState();
    const cookies = new Cookies();

    const getCarrito = async () => {
        const response = await fetch(`https://furniture-insight-app.herokuapp.com/carrito/carrito/${cookies.get('Id_Usuario')}`);
        const result = await response.json();
        for (const item of result) {
            const b64 = Buffer.from(item.MuebleCarrito.data).toString("base64");
            item.MuebleCarrito.data = b64;
        }
        setCarrito(result);
    }

    const getSubtotal = async () => {
        const response = await fetch(`https://furniture-insight-app.herokuapp.com/carrito/carrito/${cookies.get('Id_Usuario')}`);
        const result = await response.json();
        var subtotal = 0;
        for (var item of result) {
            subtotal = subtotal + item.MuebleCarrito.Precio
        }
        setSubtotal(subtotal);
        cookies.set('Subtotal', subtotal, { path: '/' })
        return subtotal
    }

    const getITBIS = async () => {
        var result = await getSubtotal()
        var itbis = (parseFloat(result) * 0.18).toFixed(2);
        setITBIS(itbis);
        cookies.set('ITBIS', itbis, { path: '/' })
        return itbis
    }

    const getTotal = async () => {
        var result = await getSubtotal()
        var result2 = await getITBIS()
        var total = parseFloat(result2) + parseFloat(result)
        setTotal(total);
        cookies.set('Total', total, { path: '/' })
        return total
    }

    const quitarMueble = async (Id_Carrito) => {
        fetch(`https://furniture-insight-app.herokuapp.com/carrito/delete/${Id_Carrito}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                alert("Verificar que todos los campos esten llenos");
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                window.location.reload();
            }
    })
}

    useEffect(() => {
        if (cookies.get("Id_Usuario") === undefined) {
            alert("Debe hacer Log In o Sign Up para continuar.")
            navigate("/login", {replace: true});           
        }
        else {
            getCarrito();
            getSubtotal();
            getITBIS();
            getTotal();
        }
    }, [])

    console.log(carrito);

    const handleClick = () => {
        navigate("/checkout", { replace: true });
    }

    const handleClick2 = () => {
        navigate("/checkoutpaypal", { replace: true });
    }

    return (
        <div className="container-cart lh-lg">
            <h1 className="welcome-text"> ¡Bienvenido a su Carrito de Compras!</h1>
            <div className="row">
                <div className="col">
                    <h3 className="h3 mt-3 text-center">Mis Muebles:</h3>
                    <div className="row">
                        {carrito.map((item) => (
                            <div key={item.Id_Carrito}>
                                <div className="card mb-3 mt-3" style={{ "maxWidth": "31.25rem", "marginLeft" : "7.5rem"}}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={`data:image/${item.MuebleCarrito.mimetype};base64,${item.MuebleCarrito.data}`} className="cart-img" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="card-body ms-4">
                                                <div className="row">
                                                    <label className="card-text">{item.MuebleCarrito.Nombre}</label>
                                                    <label className="card-text">Cantidad: {item.Cantidad_Mueble}</label>
                                                    <label className="card-text">Precio: {item.MuebleCarrito.Precio}</label>
                                                    <button className="btn btn-danger w-25 ms-2" onClick={() => quitarMueble(item.Id_Carrito)}>
                                                        <FontAwesomeIcon icon={faTrash}/>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col">
                    <div className="row mt-3">
                        <label>Subtotal: RD$ {subtotal} </label>
                        <label>ITBIS: RD$ {ITBIS}</label>
                        <label>Total: RD$ {total}</label>
                        <button
                            type="button"
                            className="btn btn-outline-success rounded-pill w-50 m-5"
                            data-bs-toggle="modal"
                            data-bs-target="#checkoutModal">Proceder al Checkout</button>
                    </div>
                    <div className="modal fade" id="checkoutModal" tabIndex="-1" aria-labelledby="checkoutModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="checkoutModalLabel">Checkout</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <p className="h5">Seleccione un metodo de pago:</p>
                                    <button className="btn btn-primary me-3" onClick={handleClick2} data-bs-dismiss="modal">
                                        <FontAwesomeIcon icon={faPaypal} className="me-1" />
                                        Pagar con Paypal</button>
                                    <button className="btn btn-secondary" onClick={handleClick} data-bs-dismiss="modal">
                                        <FontAwesomeIcon icon={faCreditCard} className="me-1" />
                                        Pagar con Tarjeta Credito/Debito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;