import React from "react";
import { useState } from "react";
import logo from "../images/logo.png";

function RecoverPass() {

    const [user, setUser] = useState({
        email: "",

    })

    const handleSubmit = (event) =>{
        event.preventDefault();
        alert("Data entered");
        console.log(user);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                    <img className="mb-3" src={logo} width="60" height="65" />
                    <h4 className="h4 mb-3">Recover Password</h4>
                    <input 
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="email" 
                        placeholder="Email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email:e.target.value})}
                        />
                    <button type="submit" className="btn btn-outline-secondary rounded-pill">Recover</button>
                </div>
            </form>
        </div>
    )
}
export default RecoverPass;