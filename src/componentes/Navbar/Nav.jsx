// componentes/Navbar/Nav.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.jpg';
import "../Css/nav.css";

function Nav() {
    const navigate = useNavigate();

    // Obtener la información del empleado desde localStorage
    const empleadoInfo = JSON.parse(localStorage.getItem('EmpleadoInfo'));
    console.log(empleadoInfo)

    const handleLogout = () => {
        // Elimina el token de localStorage
        localStorage.removeItem('Token');
        localStorage.removeItem('EmpleadoInfo');
        navigate('/');
    };

    return (
        <nav className='d-flex align-items-center justify-content-between p-3'>
            <Link to="/" aria-label="Inicio">
                <img src={Logo} width={90} alt="Logo de la Empresa" />
            </Link>
            <ul className='d-flex list-unstyled flex-row gap-5 justify-content-center align-items-center'>
                <li>
                    <NavLink
                        to="/solicitudes"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Solicitud"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                        </svg>
                        Solicitudes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/historial"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Historial"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-clock-history" viewBox="0 0 16 16">
                            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                        </svg>
                        Historial
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/calendario"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Calendario"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                        </svg>
                        Calendario
                    </NavLink>
                </li>
                {empleadoInfo.rol === "Recursos Humanos" && (
                    <li className="btn-group" role="group">
                        <button type="button" className="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Administrador
                        </button>
                        <ul className="dropdown-menu">
                            <li>
                                <NavLink to="/solicitudes-admin" className="dropdown-item" aria-label="solicitudes-admin">Solicitudes</NavLink>
                            </li>
                            <li>
                                <NavLink to="/historial-admin" className="dropdown-item" aria-label="historial-admin">Historial</NavLink>
                            </li>
                            <li>
                                <NavLink to="/crear-usuario" className="dropdown-item" aria-label="crear-usuario">Crear Usuario</NavLink>
                            </li>
                        </ul>
                    </li>
                )}

            </ul>
            <div className="d-flex align-items-center">
                {empleadoInfo && (
                    <>
                        <div class="btn-group">
                            <button type="button" class="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <span className="text-light me-2">
                                    {empleadoInfo.nombres} {empleadoInfo.apellidos}
                                </span>
                                <img
                                    src={empleadoInfo.avatar}
                                    alt='Icono de usuario'
                                    className="rounded-circle"
                                    width={50}
                                />
                            </button>
                            <ul className="dropdown-menu">
                                <li><Link to="/perfil" aria-label="Perfil" class="dropdown-item">Perfil</Link></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                            </ul>
                        </div>
                    </>
                )}

            </div>
        </nav>
    );
}

export default Nav;
