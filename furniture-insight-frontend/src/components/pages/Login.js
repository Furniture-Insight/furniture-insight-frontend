import React from "react";
import {Link} from "react-router-dom";

function Login() {
    return (
        <div>
            <div>
            
            </div>
            <div className="form-login">
                <h3 className="h3 mb-3">Furniture Insight</h3>
                <h4 className="h4 mb-3">Log In</h4>
                <input className="mb-3 form-control" type="email" placeholder="Email" />
                <input className="mb-3 form-control" type="password" placeholder="Password" />
                <div className="mb-3">
                <Link to="/recoverpass">Forgot Password?</Link>
                </div>
                <button type="button" className="btn btn-outline-secondary">Log In</button>
            </div>
        </div>
    )
}
export default Login;