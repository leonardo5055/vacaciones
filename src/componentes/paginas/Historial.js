import React from 'react'
import "./estilos/historial.css"

function Historial() {
    return (
        <div>
            <h2 className='text-light d-flex justify-content-center m-5'>Vacaciones tomadas</h2>
            <div className='text-light d-flex justify-content-center align-items-center caja-historial gap-5 w-50 m-5'>
                <div className=''>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <p>Dias de vacaciones: 11</p>
                <p>Dias sobrantes: 17</p>
            </div>
            <div className='text-light d-flex justify-content-center align-items-center caja-historial gap-5 w-50 m-5'>
                <div className=''>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <p>Dias de vacaciones: 11</p>
                <p>Dias sobrantes: 17</p>
            </div>
        </div>
        
    )
}

export default Historial
