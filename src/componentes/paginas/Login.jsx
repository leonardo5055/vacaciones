import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.jpg';

function Login() {
    const navigate = useNavigate(); // Usar useNavigate para la navegación programática

    const handleSubmit = (e) => {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario
        // Aquí puedes manejar la lógica de autenticación (validar el usuario, etc.)

        // Si la autenticación es exitosa, redirige a /solicitudes
        navigate('/solicitudes');
    };

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <img width="150px" src={Logo} alt="Logo - Empresa" />
            <form className='w-25' onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <label htmlFor="floatingInput" className='text-light'>Email</label>
                    <input type="email" className="form-control text-light bg-transparent" id="floatingInput" required />
                </div>
                <div className="form-floating mb-3">
                    <label htmlFor="floatingPassword" className='text-light'>Contraseña</label>
                    <input type="password" className="form-control text-light bg-transparent" id="floatingPassword" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Continuar</button>
            </form>
        </div>
    );
}

export default Login;
