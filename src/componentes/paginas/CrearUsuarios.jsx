import React from 'react'
import { Link } from 'react-router-dom'
import Boton from '../Componentes/Boton'

function CrearUsuarios() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <form className='w-25 text-light'>
                <h1 className='text-center text-decoration-underline'>Crear usuarios</h1>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control text-light bg-transparent" />
                    <label >Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control bg-transparent text-light" />
                    <label>Contraseña</label>
                </div>
                <Link to="/datos-personales">
                    <Boton tipo="primary" texto="Continuar" tamanio="100">
                    </Boton>
                </Link>
            </form>
        </div>
    )
}

export default CrearUsuarios
