import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.jpg';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/usuarios/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('Token', data.usuario.empleado_id); // Guarda el token
                localStorage.setItem('EmpleadoInfo', JSON.stringify(data.usuario)); // Guarda la información del empleado
                // Si el inicio de sesión es exitoso, redirige a /solicitudes
                navigate('/solicitudes');
            } else {
                // Si hay un error, muestra el mensaje al usuario
                setError(data.message);
            }
        } catch (err) {
            // Si ocurre algún error en el fetch o en la API, lo manejamos aquí
            setError('Error en la conexión con el servidor.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (token) {
            // Si el token existe, redirige a /solicitudes
            navigate('/solicitudes');
        }
    }, [navigate]);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <img width="150px" src={Logo} alt="Logo - Empresa" />
            <form className='w-25' onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div class="form-floating mb-3 text-light">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control text-light bg-transparent" id="floatingInput" required placeholder="Email" />
                    <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating mb-3 text-light">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="form-control text-light bg-transparent" id="floatingInput" required placeholder="Contraseña" />
                    <label for="floatingPassword">Contraseña</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Continuar</button>
            </form>
        </div>
    );
}

export default Login;

