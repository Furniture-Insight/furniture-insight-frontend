import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";

function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Email entered: ${user.email}, Password entered: ${user.password}`)
    }
    return (
        <div>      
            <form onSubmit={handleSubmit}>
            <div className="form-login">
                <h3 className="h3 mb-3">Furniture Insight</h3>
                <h4 className="h4 mb-3">Log In</h4>
                <input 
                    className="mb-3 form-control" 
                    type="email" 
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})} />
                <input 
                    className="mb-3 form-control" 
                    type="password" 
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})} />
                <div className="mb-3">
                <Link to="/recoverpass">Forgot Password?</Link>
                </div>
                <button type="submit" className="btn btn-outline-secondary">Log In</button>
            </div>
            </form>
        </div>
    )
}
export default Login;