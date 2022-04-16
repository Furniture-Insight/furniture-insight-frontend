import React from "react";
<<<<<<< HEAD
import BannerImage from "../images/bed.jpg"

function Home() {
    return (
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className="headerContainer">
                <h1> Furniture Insight </h1>
            </div>           
        </div>  
=======
import bed from "../images/bed.jpg";
import table from "../images/table.jpg";
import chairs from "../images/chairs.jpg";

function Home() {
    
    return (
        <>
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
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselHomeSlidesOnly" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>                    
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselHomeSlidesOnly" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>                    
                    </button>
                </div>
            </div>
            <div className="container justify-content-center">
                <div className="row px-5">
                    <div className="col p-5">
                        <img src={table} className="mx-auto d-block w-50" alt="table.jpg"/>
                        <div className="d-flex justify-content-around">
                            <a type="button" className="btn btn-secondary btn-homepage" href="/store">See more like this</a>
                            <a type="button" className="btn btn-secondary btn-homepage" href="/description">Details</a>
                        </div>
                    </div>
                    <div className="col text-center p-5 mt-5">
                        <h3 className="my-3">Furniture Name</h3>
                        <p>Brief Description</p>
                    </div>
                </div>
            </div>
        </>
>>>>>>> e423253eeb3faed8d112a55d80b35f2f39019372
    );
}

export default Home;