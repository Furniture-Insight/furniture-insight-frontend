import React from "react";
import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logo.png";
import Cookies from "universal-cookie";

function Login({ isUserLogged }) {
    let navigate = useNavigate(); 
    
    const cookies = new Cookies();

    const [usuario, setUsuario] = useState({
        Email: "",
        Contraseña: ""
    });   

    const loginUsuario = () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        }

        fetch('https://furniture-insight-app.herokuapp.com/login',requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if(!response.ok){
                cookies.set('Session', false, {path:'/'})
                alert("Email o Contraseña invalidos")
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else{
                cookies.set('Session', true, {path:'/'})
                alert("Bienvenido")
                navigate('/store', {replace:true})            
            }
            cookies.set('Id_Usuario', data.Usuario, {path:'/'});
            cookies.set('Nombre',data.NombreUsuario, {path:'/'})
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
                        placeholder="Contraseña"
                        value={usuario.Contraseña}
                        onChange={(e) => setUsuario({ ...usuario, Contraseña: e.target.value })} />                    
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