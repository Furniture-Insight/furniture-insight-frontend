import React from "react";
import { useState } from "react";
import { useNavigate,Link} from "react-router-dom";
import logo from "../images/logo.png";

function Login({isUserLogged}) {      
    let navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        alert("Data entered");
        console.log(user);
    }

   
    const handleClick = () => {               
        isUserLogged(true);          
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                <img className="mb-3" src={logo} width="60" height="65" alt="logo" />
                    <h4 className="h4 mb-3">Log In</h4>
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <div className="mb-3">
                        <Link to="/recoverpass">Forgot Password?</Link>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-secondary rounded-pill"
                        onClick={handleClick}>Log In</button>
                </div>
            </form>
        </div>
    )
}
export default Login;