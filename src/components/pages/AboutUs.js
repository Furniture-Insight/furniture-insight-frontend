import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faDove, faEnvelope, faCamera } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function AboutUs() {

    return (
        <div>
            <div className="about-section text-center">
                <h1>Acerca de Furniture Insight</h1>
                <h5>Nos dedicamos a proveer a nuestros clientes un mejor día a día, 
                brindandoles todo lo necesario para convertir cualquier espacio en un hogar.</h5>
            </div>

            <h2 className="text-center">Quiénes Somos</h2>
            
            <div className="row my-3">
                <div className="column d-flex justify-content-center">
                    <div className="card-about">
                        <div className="container-about">
                            <h2> Nuestra Misión </h2>
                            <h5>Furniture Insight se dedica a proveer 
                            a las personas un mejor día a día, 
                            proveyendo lo que todo espacio necesita 
                            para sentirse como un hogar.</h5>
                        </div>
                    </div>
                </div>
                <div className="column d-flex justify-content-center">
                    <div className="card-about">
                        <div className="container-about">
                            <h2> ¿Qué Hacemos? </h2>
                            <h5>Nos dedicamos a proveer a todos nuestro 
                            clientes los muebles que necesitan 
                            para cualquier situación en la que se encuentren.</h5>
                        </div>
                    </div>
                </div>
                <div className="column d-flex justify-content-center">
                    <div className="card-about">
                        <div className="container-about">
                            <h2> Valores </h2>
                            <h5>Nuestro trabajo se basa en la honestidad, 
                            el entusiasmo y el trabajo en equipo.</h5>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <h5 className="text-center"> Contáctanos </h5>
                <div className="row justify-content-center">
                    <div className="col-6 col-sm-3" align="right">
                        <a href="tel:+18092695790"><FontAwesomeIcon icon={faPhone}/> Phone </a>
                    </div>
                    <div className="col-6 col-sm-3" align="left">
                        <a href="https://twitter.com/FurnitureInsight"><FontAwesomeIcon icon={faDove} /> Twitter </a>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-6 col-sm-3" align="right">
                        <a href="mailto:furniture.insight@gmail.com"><FontAwesomeIcon icon={faEnvelope}/> E-Mail </a>
                    </div>
                    <div className="col-6 col-sm-3" align="left">
                        <a href="https://www.instagram.com/furnitureinsight/"><FontAwesomeIcon icon={faCamera}/> Instagram </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutUs;