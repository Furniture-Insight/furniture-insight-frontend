import React from "react";
import bed from "../images/bed.jpg";

function Home() {
    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col mb-3">
                    <h2 className="h2 text-center"> Furniture Insight </h2>
                </div>
            </div>
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
                    <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle> See more like this </button>
                </div>
                <div className="col">
                    <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle> Details </button>
                </div>
            </div>
        </div>
    );
}

export default Home;