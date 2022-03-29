import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";

function Login({ isUserLogged }) {
    let navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        Nombre: "",
        Contraseña: ""
    });

    const [usuarioToken, setUsuarioToken] = useState({
        accessToken: "",
        refreshToken: ""
    })    

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(usuario)
    };

    const loginUsuario = () => {
        fetch('http://localhost:8000/login', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();            
            if(!response.ok){
                alert("Nombre o Contraseña invalidos")
                const error = (data && data.message) || response.status;
                isUserLogged(false)
                return Promise.reject(error)
            }
            else {
                isUserLogged(true)
                navigate("/home", {replace:true})
            }
            setUsuarioToken(data, console.log(usuarioToken));
        })
    } 

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUsuario();
        console.log(usuario)
        

    }

    const handleClick = () => {        
        // navigate("/home", {replace:true});         
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                    <img className="mb-3" src={logo} width="60" height="65" alt="logo" />
                    <h4 className="h4 mb-3">Log In</h4>
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Nombre"
                        value={usuario.Nombre}
                        onChange={(e) => setUsuario({ ...usuario, Nombre: e.target.value })} />
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="password"
                        placeholder="Contraseña"
                        value={usuario.Contraseña}
                        onChange={(e) => setUsuario({ ...usuario, Contraseña: e.target.value })} />
                    <div className="mb-3">
                        <Link to="/recoverpass">Forgot Password?</Link>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-outline-secondary rounded-pill"
                       >Log In</button>
                </div>
            </form>
        </div>
    )
}
export default Login;