import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import logo from "../images/logo.png";

const apiUrl = 'https://furniture-insight-app.herokuapp.com/login';

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [apiUrl];
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${accessToken}`;
            config.headers.authorization = `Bearer ${refreshToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

function Login({ isUserLogged }) {
    let navigate = useNavigate();
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    const [jwt, setJwt] = useState({
        storedAccessToken,
        storedRefreshToken
    })

    const getJwt = async () => {
        const user = usuario;
        const { data } = await axios.post(apiUrl, user);
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setJwt(data.accessToken);
        setJwt(data.refreshToken);

    }

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),

    }

    const loginUsuario = () => {
        fetch('https://furniture-insight-app.herokuapp.com/login', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();
                if (!response.ok) {
                    alert("Nombre o Contraseña invalidos")
                    const error = (data && data.message) || response.status;
                    isUserLogged(false)
                    return Promise.reject(error)
                }
                else {
                    isUserLogged(true)
                    navigate("/home", { replace: true })
                }
            })
    }

    const handleSubmit = (event) => {
        event.preventDefault();        
        getJwt();
        console.log(jwt)      
    }

    const handleClick = () => {
        //  navigate("/home", {replace:true});         
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