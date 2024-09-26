import React from 'react'
import Logo from '../../img/logo.jpg'

function Login() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <img width="150px" src={Logo} alt="Logo - Empresa" />
            <form className='w-50' action="" method="post">
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInput" />
                    <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="password" class="form-control" id="floatingPassword" />
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <button type="submit" class="btn btn-primary w-100">Continuar</button>
            </form>
        </div>
    )
}

export default Login
