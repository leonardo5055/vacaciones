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
                <button className='btn-rojo px-4 py-2 rounded-pill text-light border-0'
                    data-bs-toggle="collapse"
                    data-bs-target="#contenidoAdicional"
                    aria-expanded="false"
                    aria-controls="contenidoAdicional"
                >Motivo de rechazo</button>
                <div className="collapse caja-negra h-50 m-3 rounded" id="contenidoAdicional">
                    <div className="mb-5 text-light text-center">
                        <div class="mb-3 m-3">
                            <label for="exampleFormControlTextarea1" className="form-label fs-3">Motivo de rechazo:</label>
                            <p>Hay muchos empleados con vacaciones en esas semanas</p>
                        </div>
                    </div>
                </div>
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