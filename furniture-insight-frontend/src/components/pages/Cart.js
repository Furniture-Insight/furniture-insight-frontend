import React from "react";
import bed from "../images/bed.jpg"

function Cart(){
    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col mb-3">
                    <h2 className="h2 text-center">Cart</h2>
                </div>
            </div>
            <div className="row">
                <img className="img-small" src={bed} alt="bed.jpg"/>
            </div>
        </div>
    );
};

export default Cart;