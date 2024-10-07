import React from 'react'

function Historial() {
    return (
        <div>
            <h2 className='text-light d-flex justify-content-center m-5'>Vacaciones tomadas</h2>
            <div className='d-flex justify-content-around text-light align-items-center caja-amarilla borde-amarillo gap-5 m-5'>
                <div className='mt-3'>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <p className='mt-3'>Dias de vacaciones: 11</p>
                <p className='mt-3'>Dias sobrantes: 17</p>
            </div>
            <div className='d-flex justify-content-around text-light align-items-center caja-verde borde-verde gap-5 m-5'>
                <div className='mt-3'>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <p className='mt-3'>Dias de vacaciones: 11</p>
                <p className='mt-3'>Dias sobrantes: 17</p>
            </div>
            <div className='d-flex justify-content-around text-light align-items-center caja-roja borde-rojo gap-5 m-5'>
                <div className='mt-3'>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <div>
                    <p className='mt-3'>Dias de vacaciones: 11</p>
                    <p className='mt-3'>Dias sobrantes: 17</p>
                </div>
                <button className='btn-rojo px-4 py-2 rounded-pill text-light border-0'>Motivo de rechazo</button>
            </div>
            <div className='d-flex justify-content-around text-light align-items-center caja-verde borde-verde gap-5 m-5'>
                <div className='mt-3'>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <p className='mt-3'>Dias de vacaciones: 11</p>
                <p className='mt-3'>Dias sobrantes: 17</p>
            </div>
            <div className='d-flex justify-content-around text-light align-items-center caja-verde borde-verde gap-5 m-5'>
                <div className='mt-3'>
                    <p>Vacaciones del 2 de septiembre</p>
                    <p>Hasta el 12 de septiembre</p>
                </div>
                <p className='mt-3'>Dias de vacaciones: 11</p>
                <p className='mt-3'>Dias sobrantes: 17</p>
            </div>

        </div>
    )
}

export default Historial