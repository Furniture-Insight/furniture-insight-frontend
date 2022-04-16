import React from "react";
import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
import Cookies from "universal-cookie";

function Login({ isUserLogged }) {
    //let navigate = useNavigate(); 
    
    const cookies = new Cookies();

    const [usuario, setUsuario] = useState({
        Email: "",
        Contraseña: ""
    });   

    const loginUsuario = () => {
        fetch('https://furniture-insight-app.herokuapp.com/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        }).then(response => response.json())
        .then(data=> {
            cookies.set('Id_Usuario', data.Usuario, {path:'/'});
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUsuario();
        isUserLogged(true)                  
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                    <h1> Furniture Insight </h1>
                    <img className="mb-3" src={logo} width="60" height="65" alt="logo" />
                    <h4 className="h4 mb-3">Log In</h4>
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Email"
                        value={usuario.Email}
                        onChange={(e) => setUsuario({ ...usuario, Email: e.target.value })} />
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    <button
                        type="submit"
                        className="btn btn-outline-secondary rounded-pill"
                        onClick={handleClick}>Log In</button>
                    <div className="mb-3">
                        <Link to="/recoverpass">Forgot Password?</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Login;