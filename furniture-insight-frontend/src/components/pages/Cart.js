import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";


function Cart() {

    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/checkout", {replace:true});
    }

    return (
        <div className="container lh-lg">
            <h1 align="center"><FontAwesomeIcon icon={faCartShopping}/> Cart </h1>
            <div className="row">
                <label>Subtotal: </label>
                <label>ITBIS: </label>
                <label>Total: </label>
                <button
                    type="button"
                    className="btn btn-success rounded-pill w-25"
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
                            <button className="btn btn-primary me-3">
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
    );
};

export default Cart;