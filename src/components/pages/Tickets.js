import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Tickets() {
    let navigate = useNavigate();

    const gotoDashboard = () => {
        navigate("/admindashboard", {replace:true})
    }

    const [tickets, setTickets] = useState([]);
    const [eliminarTicket, setEliminarTicket] = useState({
        ID_Ticket: ""
    })

    const getTickets = async () => {
        const response = await fetch('https://support-ticket-furniture.herokuapp.com/ticket')
        const result = await response.json()
        setTickets(result);
    }

    const eliminarTickets = () => {
        fetch(`https://support-ticket-furniture.herokuapp.com/ticket/delete/${eliminarTicket.ID_Ticket}`, {method: 'DELETE'})
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            else {
                alert("Ticket eliminado.")
            }
        })
    }

    useEffect(() => {
        getTickets();
    }, [])

    const eliminarSubmit = (event) => {
        event.preventDefault();
        eliminarTickets();
    }

    return(
        <div className="box">
            <div className="text-center">
                <button className="btn btn-outline-secondary rounded-pill m-3" onClick={gotoDashboard}>
                    Back to Dashboard
                </button>
                <h1 className="text-center m-5">Tickets de Soporte</h1>          
                <button className="btn btn-outline-danger rounded-pill w-25"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteticketModal">
                            Eliminar Ticket
                        </button>
                <form onSubmit={eliminarSubmit}>
                    <div className="modal fade" id="deleteticketModal" tabIndex="-1" aria-labelledby="deleteticketModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title" id="deleteticketModalLabel">Eliminar Ticket</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row m-3">
                                        <div className="col">
                                            <label className="col-form-label">Ingrese el numero del ticket solucionado</label>
                                            <input
                                                required
                                                type="text"
                                                className="form-control"
                                                value={eliminarTicket.ID_Ticket}
                                                onChange={(e)=> setEliminarTicket({...eliminarTicket, ID_Ticket:e.target.value})}
                                            />                                                   
                                        </div>                                                
                                    </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-outline-secondary rounded-pill"
                                        type="submit"
                                    >Eliminar</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="container-mueble">
                <div className="grid-container">
                    {tickets.map((item) =>  (
                        <div class="box m-5" key={item.ID_Ticket}>
                            <dl className="row">
                                <dt className="col-sm-3">Numero de Ticket</dt>
                                <dd className="col-sm-9">{item.ID_Ticket}</dd>

                                <dt className="col-sm-3">Titulo de Reporte</dt>
                                <dd className="col-sm-9">{item.title}</dd> 

                                <dt className="col-sm-3">Usuario</dt>
                                <dd className="col-sm-9">{item.email}</dd>

                                <dt className="col-sm-3">Descripcion del Error</dt>
                                <dd className="col-sm-9">{item.description}</dd>                                      
                            </dl>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Tickets;