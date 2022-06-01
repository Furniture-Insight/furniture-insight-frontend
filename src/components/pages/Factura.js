import React from 'react';
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

function Factura() {

    const cookies = new Cookies();
    const [factura, setFactura] = useState([])
    const [sfactura, setSFactura] = useState({})
    const getFactura = async () => {
        const response = await fetch(`https://furniture-insight-app.herokuapp.com/masterfactura/obtener/${cookies.get('Id_Usuario')}`);
        const result = await response.json();
        const property = {
            nombre: result["0"].Usuario.Nombre,
            apellido: result["0"].Usuario.Apellido,
            fecha_emision: result["0"].MasterFactura.Fecha_Emision,
            direccion_envio: result["0"].Direccion_Envio,
            itbis: result["0"].MasterFactura.ITBIS,
            total: result["0"].MasterFactura.Total,
            subtotal: result["0"].MasterFactura.Subtotal,
        }
        setSFactura(property)
        setFactura(result);
    }

    useEffect(() => {
        if(cookies.get("Id_Usuario") === undefined){
            alert("Debe hacer Log In o Sign Up para continuar.")
        }
        else{
            getFactura();
        }        
    }, [])

    console.log(sfactura);
    console.log(factura);

    return (
        <div className="container-factura">
        <h1> ¡Gracias por tu preferencia! </h1>
            <dl className='row mt-3 p-5'>
                <dt className='col-sm-3 p-3'>Fecha de Impresion</dt>
                <dd className='col-sm-9 p-3'>{sfactura.fecha_emision}</dd>

                <dt className='col-sm-3 p-3'>Nombre de cliente</dt>
                <dd className='col-sm-9 p-3'>{sfactura.nombre} {sfactura.apellido}</dd>

                <dt className='col-sm-3 p-3'>Direcion de Envio</dt>
                <dd className='col-sm-9 p-3'>{sfactura.direccion_envio}</dd>
                <hr className='hr'/>
                <dt className="col-sm-3 p-3">Lista de Productos</dt>

                {factura.map((item) => (
                    <div key={item.Id_MasterDetailFactura}>
                        <dl className='row p-3'>
                            <dt className='col-sm-3 p-3'></dt>
                            <dd className="col-sm-9 p-3">{item.Mueble.Nombre} {item.Mueble.Precio}</dd>
                        </dl>
                    </div>
                ))}
                <hr className='hr'/>
                <dt className='col-sm-3 p-3'>Subtotal</dt>
                <dd className='col-sm-9 p-3'>RD$ {sfactura.subtotal}</dd>

                <dt className='col-sm-3 p-3'>ITBIS</dt>
                <dd className='col-sm-9 p-3'>RD$ {sfactura.itbis}</dd>
                <hr className='hr'/>
                <dt className='col-sm-3 p-3'>TOTAL</dt>
                <dd className='col-sm-9 p-3'>RD$ {sfactura.total}</dd>
                <hr className='hr'/>
            </dl>
        </div>
    )
};
export default Factura;