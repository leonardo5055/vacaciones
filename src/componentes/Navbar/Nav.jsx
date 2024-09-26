import React from 'react';
import Logo from '../../img/logo.jpg'
import Usuario from '../../img/usuario.png'
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className='d-flex align-items-center justify-content-between text-light'>
            <img src={Logo} width={90} alt="" />
            <ul className='d-flex list-unstyled flex-row gap-5 justify-content-center'>
                <li><Link to="/solicitudes"><a href="#" className='text-decoration-none text-light'>Solicitud</a></Link></li>
                <li><Link to="/historial"><a href="#" className='text-decoration-none text-light'>Historial</a></Link></li>
                <li><a href="#" className='text-decoration-none text-light'>Calendario</a></li>
            </ul>
            <Link to="/perfil"><img src={Usuario} width={32} ></img></Link>
        </nav>
    )
}
export default Nav;