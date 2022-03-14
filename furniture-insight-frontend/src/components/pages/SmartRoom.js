import React from "react";
import bed from "../images/bed.jpg";
import chairs from "../images/chairs.jpg";
import table from "../images/table.jpg";
import desk from "../images/desk.jpg";

function SmartRoom() {
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col mb-3">
                    <h4 className="h4 text-center"> Based on your design </h4>
                    <p className="h6 text-center"> Recommendations</p>
                    <img className="center img-thumbnail" src={table} alt="table.jpg"/>
                    <img className="center img-thumbnail" src={chairs} alt="chairs.jpg"/>
                    <img className="center img-thumbnail" src={desk} alt="desk.jpg"/>
                </div>
                <div className="col mb-3">
                    <img className="center img-thumbnail" src={bed} alt="bed.jpg"/>
                </div>
                <div className="col mb-3">
                    <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle> Search Recommendations </button>
                    <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle> Export Grid to PDF </button>
                </div>
            </div>
        </div>
    );
}

export default SmartRoom;