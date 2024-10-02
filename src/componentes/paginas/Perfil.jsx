import React from 'react'
import Usuario from '../../img/usuario.png'

function Perfil() {
    return (
        <div>
            <h1 className='text-light text-center mt-3'>Perfil</h1>
            <div className='d-flex justify-content-center  gap-5 m-5'>
                <div className='caja-negra text-light text-center fs-4'>
                    <img src={Usuario} width={300} alt="" />
                    <hr className='linea' />
                    <p>Leonardo Durand Caballero</p>
                    <hr className='linea' />
                    <p className='d-flex justify-content-start'>Email:</p>
                    <p>leonardodurand@gmail.com</p>
                    <hr className='linea' />
                    <div>
                        <p className='d-flex justify-content-start'>Telefono:</p>
                        <p>11-5838-8355</p>
                    </div>
                    <hr className='linea' />
                    <button className='btn-azul px-4 py-2 rounded-pill text-light border-0 w-100'>Editar perfil</button>
                </div>
                <div className='caja-negra w-50 text-light fs-4 g-3'>
                    <div>
                        <p className='m-3'>Cargo: Jefe de desarrolladores</p>
                        <hr className='linea' />
                        <p className='m-3'>Area: Programacion</p>
                        <hr className='linea' />
                        <p className='m-3'>Años en la empresa: Seis años</p>
                        <hr className='linea' />
                        <p className='m-3'>Experiencia: Diez años</p>
                        <hr className='linea' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil
