import React from 'react'
import Usuario from '../../img/usuario.png'

function Perfil() {
    return (
        <div>
            <h1 className='text-light text-center'>Perfil</h1>
            <div className='d-flex justify-content-around'>
                <div className='caja-negra'>
                    <img src={Usuario} width={300} alt="" />
                    <hr className='linea'/>
                    <p className='text-light text-center'>Leonardo Durand Caballero</p>
                    <hr className='linea'/>
                    <p className='text-light'>Email:</p>
                    <p className='text-light text-center'>leonardodurand@gmail.com</p>
                    <hr className='linea'/>
                    <p className='text-light'>Telefono:</p>
                    <p className='text-light text-center'>11-5838-8355</p>
                    <hr className='linea'/>
                    <button className='btn-azul px-4 py-2 rounded-pill text-light border-0'>Editar perfil</button>

                </div>
                <div className='caja-negra'>

                </div>

            </div>
        </div>
    )
}

export default Perfil
