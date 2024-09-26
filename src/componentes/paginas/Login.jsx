import React from 'react'
import Logo from '../../img/logo.jpg'
import Usuario from '../../img/usuario.png'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <img width="150px" src={Logo} alt="Logo - Empresa" />
            <form className='w-25' action="" method="post">
                <div class="form-floating mb-3">
                    <label htmlFor="" className='text-light'>Email</label>
                    <input type="email" className="form-control text-light bg-transparent" id="floatingInput" />
                </div>
                <div class="form-floating mb-3">
                    <label htmlFor="" className='text-light'>Contraseña</label>
                    <input type="password" className="form-control text-light bg-transparent" id="floatingPassword" />
                </div>
                <Link to="/solicitudes"><button type="submit" class="btn btn-primary w-100">Continuar</button></Link>
            </form>
        </div>
    )
}

export default Login
