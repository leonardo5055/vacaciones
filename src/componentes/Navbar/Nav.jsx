// componentes/Navbar/Nav.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../img/logo.jpg';
import Usuario from '../../img/usuario.png';
import "../css/nav.css"

function Nav() {
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
                    <NavLink to="/calendario"
                        className={({ isActive }) => (isActive ? 'active ' : '') + "text-decoration-none text-light"}
                        aria-label="Calendario">
                        Calendario
                    </NavLink>
                </li>
            </ul>
            <Link to="/perfil" aria-label="Perfil">
                <img src={Usuario} alt='Icono de usuario' width={32} />
            </Link>
        </nav>
    );
}

export default Nav;
