import React from "react";

function LoginPage() {
    return(
        <div>
            <div>
                <h3>Furniture Insight</h3>
                <input className="form-control" type="email" placeholder="Email"/>
                <input className="form-control" type="password" placeholder="Password"/>
                <button type ="button" className="btn btn-outline-secondary">Log In</button>
            </div>           
        </div>        
    )
}
export default LoginPage;