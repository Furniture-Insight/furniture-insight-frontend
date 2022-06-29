import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faTicket, faBed, faChair, faUsers, faHammer, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

function AdminDashboard(){
    let navigate = useNavigate();

     const gotoMueblesPage = () => {
        navigate("/adminmuebles", {replace:true})
    }

     const gotoCategoriasPage = () => {
        navigate("/admincategorias", {replace:true})
    }
    
    const gotoSubCategoriasPage = () => {
        navigate("/adminsubcategorias", {replace:true})
    }
    
    const gotoMaterialPage = () => {
        navigate("/adminmaterial", {replace:true})
    }

    const gotoUsuariosPage = () => {
        navigate("/adminusuarios", {replace:true})
    }

    const gotoAdminsPage = () => {
        navigate("/admins", {replace:true})
    }

    const gotoTicketsPage = () => {
        navigate("/tickets", {replace:true})
    }

    return(
        <div class="box">
            <h1 className='text-center m-5'> ¡Bienvenido al Dashboard de Administrador! </h1>
            <h3 className='text-center m-3'> Elija un opcion: </h3>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="admin-option col-lg-3 col-md-4 m-3" onClick={gotoMueblesPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faCouch}/></i>
                            <div class="title">
                                <h4>Muebles</h4>
                            </div>
                        </div>
                    </div>	 

                    <div class="admin-option col-lg-3 col-md-4 m-3" onClick={gotoCategoriasPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faBed}/></i>
                            <div class="title">
                                <h4>Categorias</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-4  m-3" onClick={gotoSubCategoriasPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faChair}/></i>
                            <div class="title">
                                <h4>Subcategorias</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-4  m-3" onClick={gotoMaterialPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faHammer}/></i>
                            <div class="title">
                                <h4>Materiales</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-4 m-3" onClick={gotoUsuariosPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faUsers}/></i>
                            <div class="title">
                                <h4>Usuarios</h4>
                            </div>
                        </div>
                    </div>	 
                        
                    <div class="admin-option col-lg-3 col-md-4 m-3" onClick={gotoAdminsPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faUser}/></i>
                            <div class="title">
                                <h4>Admin</h4>
                            </div>
                        </div>
                    </div>

                    <div class="admin-option col-lg-3 col-md-4 m-3" onClick={gotoTicketsPage}>
                        <div class="box-part text-center">
                            <i class="fa-3x" aria-hidden="true"><FontAwesomeIcon icon={faTicket}/></i>
                            <div class="title">
                                <h4>Tickets</h4>
                            </div>
                        </div>
                    </div>
                </div>		
            </div>
        </div>
    )
}

export default AdminDashboard;