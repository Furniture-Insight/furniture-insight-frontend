import React from "react";
import bed from "../images/bed.jpg";
import table from "../images/table.jpg";
import chairs from "../images/chairs.jpg";
function Home() {
    return (
        <div align="center">
            <div id="carouselHomeSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={bed} className="d-block w-25" alt="bed.jpg"/>
                    </div>
                    <div className="carousel-item">
                        <img src={table} className="d-block w-25" alt="table.jpg"/>
                    </div>
                    <div className="carousel-item">
                        <img src={chairs} className="d-block w-25" alt="chairs.jpg"/>
                    </div>
                </div>
                <button className="carousel-control-prev" type="">

                </button>
            </div>
        </div>
    );
}

export default Home;