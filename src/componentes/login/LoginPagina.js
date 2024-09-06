import React from 'react';
import Login from './Login';
import { authService } from '../servicios/authService';

function LoginPagina() {
    const handleLogin = (email, password) => {
        authService.login(email, password).then(
            response => {alert("bienvenido")}
        )
        .catch(error => {
            alert("ese usuario no existe");
        })
    }

    return (
        <div>
            <Login onSubmit={handleLogin}></Login>
        </div>
    )
}

export default LoginPagina;