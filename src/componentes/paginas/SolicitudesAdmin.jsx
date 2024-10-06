import React from 'react'
import Usuario from '../../img/usuario.png'
import Si from '../../img/si.png'
import No from '../../img/no.png'

function SolicitudesAdmin() {
    return (
        <div>
            <div className='d-flex justify-content-center gap-5 mt-5'>
                <div className='caja-negra text-light text-center fs-4'>
                    <h1>Solicitudes pendientes</h1>
                    <hr className='linea' />
                    <div className='d-flex align-items-center'>
                        <img src={Usuario} width={60} alt="" />
                        <div className='d-flex flex-column'>
                            <p>Leonardo Durand Caballero</p>
                            <p>10/10/2024 - 10/11/2024</p>
                            <p>Vacaciones</p>
                        </div>
                        <div className='gap-3'>
                            <button className='btn'><img src={Si} width={30} alt="" /></button>
                            <button className='btn'><img src={No} width={30} alt="" /></button>
                        </div>
                    </div>
                    <hr className='linea' />
                </div>
                <div className='caja-negra w-50 text-light fs-4 g-3'>
                    
                </div>
            </div>
        </div>
    )
}

export default SolicitudesAdmin
