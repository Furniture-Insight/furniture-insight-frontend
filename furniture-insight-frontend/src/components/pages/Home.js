import React from "react";
import BannerImage from "../images/bed.jpg"

function Home() {
    return (
        <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
            <div className="headerContainer">
                <h1> Furniture Insight </h1>
            </div>           
        </div>  
    );
}

export default Home;