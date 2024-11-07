// componentes/Navbar/Nav.jsx
import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../../img/logo.jpg';
import "../css/nav.css";

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
            <ul className='d-flex list-unstyled flex-row gap-5 justify-content-center'>
                <li>
                    <NavLink
                        to="/solicitudes"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Solicitud"
                    >
                        Solicitudes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/historial"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Historial"
                    >
                        Historial
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/calendario"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Calendario"
                    >
                        Calendario
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/solicitudes-admin"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-danger"}
                        aria-label="Solicitudes"
                    >
                        Solicitudes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/historial-admin"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-danger"}
                        aria-label="Historial"
                    >
                        Historial
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/crear-usuario"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-danger"}
                        aria-label="Crear usuarios"
                    >
                        Crear usuarios
                    </NavLink>
                </li>
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
