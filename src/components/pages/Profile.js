import React, { useReducer } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

function Profile(isUserLogged) {

    const cookies = new Cookies();   
    const handleClick = () =>{
        cookies.remove('Id_Usuario');
        cookies.remove('Nombre');
        cookies.set('Session', false, {path:'/'});
        isUserLogged(false);        
    }

    const usuarioNombre = cookies.get('Nombre');

    return(
        <>
            <h1 class="welcome-message">¡Bienvenido a tu perfil, {usuarioNombre}!</h1>
            <div class="row card-deck justify-content-around">
                <div class="col-3 card border-dark m-5">
                    <div class="card-body">
                        <h5 class="card-title pb-3">Account Details</h5>
                        <p class="card-text">Lorem ipsum dolor sit amet</p>
                        <p class="card-text">Lorem ipsum dolor sit amet</p>
                        <p class="card-text">Lorem ipsum dolor sit amet</p>
                    </div>
                </div>
                <div class="col-3 card border-dark m-5">
                    <div class="card-body">
                        <h5 class="card-title pb-3">Tu Lista</h5>
                        <p class="card-text"> COMING SOON </p>
                    </div>
                </div>
                <div class="col-3 card border-dark m-5">
                    <div class="card-body">
                        <h5 class="card-title pb-3">Ajustes</h5>
                        <div class="d-grid col-5">
                            <button type="button" class="btn btn-outline-success m-3"> Editar Datos </button>
                            <Link type="button" class="btn btn-outline-danger m-3" to="/" onClick={handleClick}>Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;