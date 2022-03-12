import React from "react";
import {useState } from "react";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png";

function SignUp() {
    let navigate = useNavigate();

    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Data entered");
        console.log(user);
    }

    const handleClick = () => {
        navigate("/store");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                    <img className="mb-3" src={logo} width="60" height="65" />
                    <h4 className="h4 mb-3">Sign Up</h4>
                    <input 
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="text" 
                        placeholder="First Name" 
                        value={user.firstname}
                        onChange={(e) => setUser({...user, firstname:e.target.value})}/>
                    <input 
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="text" 
                        placeholder="Last Name" 
                        value={user.lastname}
                        onChange={(e) => setUser({...user, lastname:e.target.value})}/>
                    <input 
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="email" 
                        placeholder="Email" 
                        value={user.email}
                        onChange={(e) => setUser({...user, email:e.target.value})}/>
                    <input 
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="password" 
                        placeholder="Password" 
                        value={user.password}
                        onChange={(e) => setUser({...user, password:e.target.value})}/>
                    <button 
                        type="submit" 
                        className="btn btn-outline-secondary rounded-pill"
                        onClick={handleClick}
                        >Sign Up</button>
                </div>
            </form>
        </div>
    )
}
export default SignUp;