import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Cookies from 'universal-cookie';

function SignUp({ isUserLogged }) {
    let navigate = useNavigate();
//deploy
    const cookies = new Cookies();

    const [usuario, setUsuario] = useState({
        Id_Genero: "",
        Nombre: "",
        Apellido: "",
        Email: "",
        Contraseña: "",
        Edad: "",
        Direccion_Residencia: ""
    });     

    const createUsuario = () => {

        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        }

        fetch('https://furniture-insight-app.herokuapp.com/user/crear', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if(!response.ok) {
                cookies.set('Session', 0, {path:'/'})
                alert("Verificar que todos los campos esten llenos")
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else{
                cookies.set('Session', 1, {path:'/'})
                alert("Bienvenido")
                navigate('/', {replace:true})
                window.location.reload()
            }
            cookies.set('Id_Usuario', data.Id_Usuario, {path:'/'});
            cookies.set('Nombre',usuario.Nombre, {path:'/'})
        })               
    }

    const validarContraseña = (contraseña) => {
        var contraseñaValida = false;
        if(/[!_@#$%^&*(),.?":{}|<>]/g.test(contraseña) && /\d+/g.test(contraseña) && /[a-zA-Z]/g.test(contraseña) && contraseña.length >= 8){
            contraseñaValida = true;
        }
        else{
            alert("Asegurese que su contraseña tenga simbolos, numeros, letras y un minimo de 8 caracteres.")
        }
        return contraseñaValida;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(validarContraseña(usuario.Contraseña) === true){
            createUsuario();
        }        
    }

    const handleClick = () => {
        isUserLogged(cookies.get('Session'));             
    }    
    

    return (
        <div>
            <form onSubmit={handleSubmit} data-testid="form">
                <div className="form-login">
                    <img className="mb-3" src={logo} width="60" height="65" alt="logo" />
                    <h4 className="h4 mb-3">Sign Up</h4>
                    <input
                        required
                        name="nombre"                        
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Nombre"
                        value={usuario.Nombre}
                        onChange={(e) => setUsuario({ ...usuario, Nombre: e.target.value })} />
                    <input
                        required
                        name="apellido"                        
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Apellido"
                        value={usuario.Apellido}
                        onChange={(e) => setUsuario({ ...usuario, Apellido: e.target.value })} />
                    <input
                        required
                        name="email"                        
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Email"
                        value={usuario.Email}
                        onChange={(e) => setUsuario({ ...usuario, Email: e.target.value })} />                                                              
                    <input 
                        required
                        name="contraseña"                        
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="password"
                        placeholder="Contraseña"
                        value={usuario.Contraseña}
                        onChange={(e) => setUsuario({ ...usuario, Contraseña: e.target.value })} />
                    <select
                        required
                        name="genero"
                        className="mb-3 form-select rounded-pill border border-dark"
                        value={usuario.Id_Genero}
                        onChange={(e) => setUsuario({ ...usuario, Id_Genero: e.target.value })}>
                        <option>Genero</option>
                        <option value="1">Hombre</option>
                        <option value="2">Mujer</option>
                    </select>
                    <input
                        required
                        name="edad"
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Edad"
                        value={usuario.Edad}
                        onChange={(e) => setUsuario({ ...usuario, Edad: e.target.value })} />
                    <input
                        required
                        name="direccion_residencia"
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Direccion Residencia"
                        value={usuario.Direccion_residencia}
                        onChange={(e) => setUsuario({ ...usuario, Direccion_Residencia: e.target.value })} />
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