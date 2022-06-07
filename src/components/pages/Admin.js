import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

function Admin() {
    let navigate = useNavigate();

    const [admin, setAdmin] = useState({
        Id_Usuario: "",
        Id_Empleado: ""
    })

    const loginAdmin = () => {
        const requestOptions = {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(admin)
        }

        fetch('http://localhost:8000/admin', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if(!response.ok){
                alert("Id de usuario o de empleado invalidos.")
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else{
                alert("Bienvenido, admin")
                navigate("/admindashboard", {replace:true})
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginAdmin();
    }
 
    return(
        <div>            
            <form onSubmit={handleSubmit}>
                <div className="form-login">
                    <img className="mb-3" src={logo} width="60" height="65" alt="logo"/>
                    <h4 className="h4 mb-3"></h4>
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Id Usuario"
                        value={admin.Id_Usuario}
                        required
                        onChange={(e) => setAdmin({...admin, Id_Usuario:e.target.value})}
                    />
                    <input
                        className="mb-3 form-control rounded-pill border border-dark"
                        type="text"
                        placeholder="Id Empleado"
                        value={admin.Id_Empleado}
                        required
                        onChange={(e) => setAdmin({...admin, Id_Empleado:e.target.value})}
                    />
                    <button
                        type="submit"
                        className="btn btn-outline-secondary rounded-pill"
                    >Log In</button>
                </div>
            </form>
        </div>
    )
}

export default Admin;