import React from "react";

function AboutUs() {

    return (
        <div>
            <div className="about-section">
                <h1>Quienes somos</h1>
                <p>Placeholder text</p>
                
                <h1>Que hacemos</h1>
                <p>Placeholder text</p>
                
                <h1>Valores</h1>
                <p>Placeholder text</p>
            </div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6 col-sm-3" align="right">
                        <p>Phone</p>
                    </div>
                    <div className="col-6 col-sm-3" align="left">
                        <p>Twitter</p>
                </div>
            </div>
                <div className="row justify-content-center">
                    <div className="col-6 col-sm-3" align="right">
                        <p>E-Mail</p>
                    </div>
                    <div className="col-6 col-sm-3" align="left">
                        <p>Instagram</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;