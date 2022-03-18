import React from "react";
import {useState } from "react";
import {useNavigate} from "react-router-dom";
import logo from "../images/logo.png";

function SignUp() {
    let navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        Nombres: "",
        Apellidos: "",
        Email: "",
        Password: "",
        Sexos: "",
        Edades: "",
        Direccion_residencia: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8000/usuarioCliente/crearUsuario', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(usuario)
        }).then(() =>{
            console.log(usuario);
            console.log("new user created");
        })
    }

    const handleClick = () => {
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                    <img className="mb-3" src={logo} width="60" height="65" alt="logo" />
                    <h4 className="h4 mb-3">Sign Up</h4>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="text" 
                        placeholder="Nombre" 
                        value={usuario.Nombres}
                        onChange={(e) => setUsuario({...usuario, Nombres:e.target.value})}/>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="text" 
                        placeholder="Apellido" 
                        value={usuario.Apellidos}
                        onChange={(e) => setUsuario({...usuario, Apellidos:e.target.value})}/>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="email" 
                        placeholder="Email" 
                        value={usuario.Email}
                        onChange={(e) => setUsuario({...usuario, Email:e.target.value})}/>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="password" 
                        placeholder="Password" 
                        value={usuario.Password}
                        onChange={(e) => setUsuario({...usuario, Password:e.target.value})}/>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="text" 
                        placeholder="Sexo" 
                        value={usuario.Sexos}
                        onChange={(e) => setUsuario({...usuario, Sexos:e.target.value})}/>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="number" 
                        placeholder="Edad"
                        value={usuario.Edades}
                        onChange={(e) => setUsuario({...usuario, Edades:e.target.value})}/>
                    <input 
                        required
                        className="mb-3 form-control rounded-pill border border-dark" 
                        type="text" 
                        placeholder="Direccion Residencia" 
                        value={usuario.Direccion_residencia}
                        onChange={(e) => setUsuario({...usuario, Direccion_residencia:e.target.value})}/>
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