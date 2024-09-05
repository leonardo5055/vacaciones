import React from 'react'
import "./estilos/login.css";
import Usuario from "../../imagenes/usuario.png";
import Llave from "../../imagenes/llave.png"

function Login() {
    return (
        <div className='d-flex vh-100 align-items-center justify-content-center'>
            <div className='text-light d-flex flex-column gap-3 text-center w-25'>
                <h1>Iniciar sesion</h1>
                <form action="" className='d-flex flex-column'>
                    <div className="mb-3 d-flex">
                        <div className='caja-ic p-2'>
                            <img src={Usuario} width="32"></img>
                        </div>
                        <input type="text" className="bg-transparent w-100 text-light login-input ps-2" id="usuario" placeholder="Usuario" />
                    </div>
                    <div className="mb-3 d-flex">
                        <div className='caja-ic p-2'>
                            <img className='ic-llave' src={Llave} width="32"></img>
                        </div>
                        <input type="password" className="bg-transparent w-100 text-light login-input ps-2" id="contrasena" placeholder="Contraseña" />
                    </div>
                    <div>
                        <button className='px-4 py-2 rounded-pill w-100 text-light border-0'>Acceder</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
