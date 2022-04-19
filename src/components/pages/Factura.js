import React from 'react';
import { useState, useEffect } from "react";
import Cookies from 'universal-cookie';

function Factura() {

    const cookies = new Cookies();
    const [factura, setFactura] = useState([])
    const [sfactura, setSFactura] = useState({})
    const getFactura = async () => {
        const response = await fetch(`http://localhost:8000/masterfactura/obtener/${cookies.get('Id_Usuario')}`);
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
        getFactura();
    }, [])

    console.log(sfactura);
    console.log(factura);

    return (
        <div>
            <dl className='row border border-dark mt-3'>
                <dt className='col-sm-3'>Fecha_Emision</dt>
                <dd className='col-sm-9'>{sfactura.fecha_emision}</dd>

                <dt className='col-sm-3'>Cliente</dt>
                <dd className='col-sm-9'>{sfactura.nombre} {sfactura.apellido}</dd>

                <dt className='col-sm-3'>Direcion de Envio</dt>
                <dd className='col-sm-9'>{sfactura.direccion_envio}</dd>

                <dt className="col-sm-3">Muebles</dt>

                {factura.map((item) => (
                    <div key={item.Id_MasterDetailFactura}>
                        <dl className='row'>
                            <dt className='col-sm-3'></dt>
                            <dd className="col-sm-9">{item.Mueble.Nombre} {item.Mueble.Precio}</dd>
                        </dl>
                    </div>
                ))}
                <dt className='col-sm-3'>Subtotal</dt>
                <dd className='col-sm-9'>{sfactura.subtotal}</dd>

                <dt className='col-sm-3'>Itbis</dt>
                <dd className='col-sm-9'>{sfactura.itbis}</dd>

                <dt className='col-sm-3'>Total</dt>
                <dd className='col-sm-9'>{sfactura.total}</dd>
            </dl>
        </div>
    )
};
export default Factura;