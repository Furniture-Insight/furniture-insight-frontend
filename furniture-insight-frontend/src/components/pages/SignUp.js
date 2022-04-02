import React from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function SignUp({ isUserLogged }) {
    // let navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        Id_Genero: "",
        Nombre: "",
        Apellido: "",
        Contraseña: "",
        Edad: "",
        Direccion_Residencia: ""
    });

    const [cliente, setCliente] = useState({
        Id_Usuario: "",
        Email: ""
    })


    const createUsuario = () => {
        fetch('http://localhost:8000/user/crear', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        }).then((response) => response.json())
            .then(data => this.setCliente({ ...cliente, Id_Usuario: data.Id_Usuario }))
            .then(console.log(cliente))
    }

    const createCliente = () => {
        fetch('http://localhost:8000/client/createClient', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        }).then(() => {
            console.log(cliente)
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createUsuario();
        createCliente();
    }

    const handleClick = () => {
        isUserLogged(true);
        // navigate("/home", {replace:true});      
    }

    return (
        <div>
            <form onSubmit={handleSubmit} data-testid="form">
                <div className="form-login">
                    <h1> Furniture Insight </h1>
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
                        type="email"
                        placeholder="Email"
                        value={cliente.Email}
                        onChange={(e) => setCliente({ ...cliente, Email: e.target.value })} />
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