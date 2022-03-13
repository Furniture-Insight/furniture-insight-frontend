import React from "react";


function Cart() {       

    return (
        <div className="container lh-lg">
            <div className="row">
                <label>Subtotal: </label>
                <label>ITBIS: </label>
                <label>Total: </label>
                <button 
                    type="button"                     
                    className="btn btn-success rounded-pill w-25"
                    data-bs-toggle>Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;