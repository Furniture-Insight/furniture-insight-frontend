import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faDove, faEnvelope, faCamera } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function AboutUs() {

    return (
        <div>
            <div class="about-section">
                <h1> ¿Quiénes Somos? </h1>
                <p>Furniture Insight se dedica a proveer 
                a las personas un mejor día a día, 
                proveyendo lo que todo espacio necesita 
                para sentirse como un hogar.</p>
                
                <h1> ¿Qué hacemos? </h1>
                <p>Nos dedicamos a proveer a todos nuestro 
                clientes los muebles que necesitan 
                para cualquier situación en la que se encuentren.</p>
                
                <h1> Valores </h1>
                <p>Nuestro trabajo se basa en la honestidad, el entusiasmo y el trabajo en equipo.</p>
            </div>
            <div class="footer">
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
            </div>
        </div>
    );
};

export default AboutUs;