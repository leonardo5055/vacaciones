import React from 'react'


function HistorialAdmin() {
    let empleado = JSON.parse(localStorage.getItem('EmpleadoInfo'));
    console.log(empleado)

    return (
        <div>
            <div className='d-flex justify-content-center'>
                <input className="form-control mt-5 w-50" type="search" placeholder="Buscar" aria-label="Buscar"/>
            </div>
            <div className='d-flex justify-content-center gap-5 mt-5'>
                <div className='caja-negra text-light text-center fs-4 w-50'>
                    <h2 className='m-3 d-flex'>Historial</h2>
                    <hr />
                    <div className='d-flex align-items-center m-3 gap-3'>
                        <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                        <div>
                            <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                            <p>10/10/2024 - 10/11/2024</p>
                            <p>🔵 Vacaciones</p>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className='caja-negra text-light fs-4'>
                    <h1>En proceso</h1>
                </div>
            </div>
        </div>
    )
}

export default HistorialAdmin
