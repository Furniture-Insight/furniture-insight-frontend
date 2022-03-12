import React from "react";


function Cart() {   

    const handleClick = () => {
        
    }

    return (
        <div className="container lh-lg">
            <div className="row">
                <label>Subtotal: </label>
                <label>ITBIS: </label>
                <label>Total: </label>
                <button 
                    type="button" 
                    onClick={handleClick} 
                    className="btn btn-success rounded-pill w-25"
                    data-bs-toggle="modal" 
                    data-bs-target="#Modal">Proceed to Checkout</button>
            </div>
        </div>
    );
};

export default Cart;