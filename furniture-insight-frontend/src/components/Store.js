import React from "react";
import bed from "./images/bed.jpg";
import chairs from "./images/chairs.jpg";
import table from "./images/table.jpg";
import desk from "./images/desk.jpg";

function Store() {
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col mb-3">
                    <h2 className="h2 text-center">Store</h2>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                <div className="col-3 search-bar">                    
                    <input className="form-control" placeholder="Search"/>
                </div>
                <div className="col-1">
                    <input className="form-control" placeholder="width"/>
                </div>
                <div className="col-1">
                    <input className="form-control" placeholder="length"/>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-secondary">Search</button>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col">
                    <h3 className="h3 text-center">Categories</h3>
                </div>
            </div>
            <div className="row">
                <div className="col">   
                    <img className="center img-thumbnail" src={bed} alt="bed.jpg"/>
                    <h5 className="h5 text-center">Beds</h5>
                </div>
                <div className="col">
                    <img className="center img-thumbnail" src={chairs} alt="chairs.jpg"/>
                    <p className="h5 text-center">Chairs</p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img className="center img-thumbnail" src={table} alt="table.jpg"/>        
                    <p className="h5 text-center">Tables</p>
                </div>
                <div className="col">
                    <img className="center img-thumbnail" src={desk} alt="desk.jpg"/>
                    <p className="h5 text-center">Desks</p>
                </div>
            </div>
        </div>
    )
}

export default Store;