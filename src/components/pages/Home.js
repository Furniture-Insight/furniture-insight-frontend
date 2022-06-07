import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from 'buffer';
import logo2 from "../images/logo2.png"
import bed from "../images/bed.jpg";
import table from "../images/table.jpg";
import chairs from "../images/chairs.jpg";

function Home({clickedMueble}) {

    let navigate = useNavigate();
    const [muebles, setMuebles] = useState([]);

    const getMuebles = async () => {
        const response = await fetch('http://localhost:8000/mueble/all')
        const result = await response.json()
        for (const item of result) {
            const b64 = Buffer.from(item.data).toString("base64");
            item.data = b64;
        }
        setMuebles(result);
    }

    useEffect(() => {
        getMuebles();
    }, [])

    const handleClick = () => {
        navigate("/mueble", {replace:true})
    }
    
    return (
        <>
            <div align="center">
                <div id="carouselHomeSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="carouselHomeSlidesOnly" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="carouselHomeSlidesOnly" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="carouselHomeSlidesOnly" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="carouselHomeSlidesOnly" data-bs-slide-to="3" aria-label="Slide 4"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={logo2} className="d-block w-25 carousel-img" alt="logo.png"/>
                        </div>
                        <div className="carousel-item">
                            <img src={bed} className="d-block w-25 carousel-img" alt="bed.jpg"/>
                        </div>
                        <div className="carousel-item">
                            <img src={table} className="d-block w-25 carousel-img" alt="table.jpg"/>
                        </div>
                        <div className="carousel-item">
                            <img src={chairs} className="d-block w-25 carousel-img" alt="chairs.jpg"/>
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
                <div className="card-static border-dark h-25 w-75 m-3">
                    {muebles.filter(mueble => mueble.Id_Mueble === 9).map((mueble) => (
                        <div className="container" key={mueble.Id_Mueble}>
                            <div className="row px-5">
                                <div className="col p-5">
                                    <img src={`data:image/${clickedMueble.mimetype};base64,${mueble.data}`} className="mx-auto d-block w-50 pb-5" alt="mueble.jpg"/>
                                    <div className="row">
                                        <div className="col">
                                            <a type="button" className="btn btn-outline-dark btn-homepage" href="/store">See more like this</a>
                                        </div>
                                        <div className="col" onClick={handleClick}>
                                            <a type="button" className="btn btn-outline-dark btn-homepage" onClick={() => clickedMueble(mueble)}>Details</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col text-center p-5 mt-5">
                                    <h3 className="mt-5">{mueble.Nombre}</h3>
                                    <h5 className="my-3">{mueble.Descripcion}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            </div>
        </>
    );
}

export default Home;