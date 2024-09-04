import React from 'react';
import Calendario from "../../imagenes/calendario.png";
import Historial from "../../imagenes/historia.png";
import "./estilos/nav.css";

function Nav() {
    return (
        <nav className='d-flex align-items-center text-light justify-content-evenly py-3'>
            <div>
                <img src={Calendario} width="25px" alt="calendario"></img>
                <a href="#" className='text-decoration-none text-light'> Calendario</a>
            </div>
            <div>
                <img src={Historial} width="25px" alt="calendario"></img>
                <a href="#" className='text-decoration-none text-light' >Historial</a>
            </div>
        </nav>
    )
}

export default Nav;
