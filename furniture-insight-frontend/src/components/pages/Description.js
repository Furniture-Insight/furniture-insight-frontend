import React from "react";
import bed from "../images/bed.jpg";

function Description() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">   
                    <img className="center img-thumbnail" src={bed} alt="bed.jpg"/>
                </div>
                <div className="col">
                    <h3 className="h3 text-center"> Nice Bed </h3>
                    <p className="h6 text-center"> This is the bed description </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="h6"> Price: </p>
                </div>
                <div className="col">
                    <button
                    type="button"
                    className="btn btn-success rounded-pill w-25"
                    data-bs-toggle> Add to Cart </button>
                </div>
            </div>
        </div>
    );
}

export default Description;