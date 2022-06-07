import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faUser, faBed, faChair, faUsers, faHammer } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard(){
    return(
        <div class="box">
            <h1 className='text-center m-5'> ¡Bienvenido al Dashboard de Administrador! </h1>
            <h3 className='text-center m-3'> Elija un opcion: </h3>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="admin-option col-lg-3 col-md-3 col-sm-3 col-xs-12 m-3">
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faCouch}/></i>
                            <div class="title">
                                <h4>Muebles</h4>
                            </div>
                        </div>
                    </div>	 

                    <div class="admin-option col-lg-3 col-md-3 col-sm-3 col-xs-12 m-3">
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faBed}/></i>
                            <div class="title">
                                <h4>Categorias</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-3 col-sm-3 col-xs-12 m-3">
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faChair}/></i>
                            <div class="title">
                                <h4>Subcategorias</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-3 col-sm-3 col-xs-12 m-3">
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faHammer}/></i>
                            <div class="title">
                                <h4>Materiales</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-3 col-sm-3 col-xs-12 m-3">
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faUsers}/></i>
                            <div class="title">
                                <h4>Usuarios</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-3 col-sm-3 col-xs-12 m-3">
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faUser}/></i>
                            <div class="title">
                                <h4>Admin</h4>
                            </div>
                        </div>
                    </div>
                </div>		
            </div>
        </div>
    )
}

export default AdminDashboard;