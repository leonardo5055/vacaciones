import React from 'react';
import Calendario from "../../imagenes/calendario.png";
import Historial from "../../imagenes/historia.png";
import "./estilos/nav.css";

function Nav() {
    return (
        <nav className='d-flex align-items-center justify-content-center text-light'>
            <ul className='d-flex list-unstyled flex-row gap-5 justify-content-center'>
                <li>
                    <img src={Calendario} width="25px" alt="calendario"></img>
                    <a href="#" className='text-decoration-none text-light'> Calendario</a>
                </li>
                <li>
                    <img src={Historial} width="25px" alt="calendario"></img>
                    <a href="#" className='text-decoration-none text-light' >Historial</a>
                </li>
            </ul>
        </nav>
    )
}

export default Nav;
