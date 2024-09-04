import React from 'react'
import "./estilos/login.css";
import Usuario from "../../imagenes/usuario.png";
import Llave from "../../imagenes/llave.png"

function Login() {
    return (
        <body>
            <div className='d-flex align-items-center justify-content-center'>
                <div className='text-light'>
                    <h1>Iniciar sesion</h1>
                    <form action="">
                        <div className="mb-3">
                            <img src={Usuario} width="32"></img>
                            <input type="text" className="placeholder form-control bg-transparent text-light" id="usuario" placeholder="Usuario" />
                        </div>
                        <div className="mb-3">
                            <img src={Llave} width="32"></img>
                            <input type="password" className="placeholder form-control bg-transparent text-light" id="contrasena" placeholder="Contraseña" />
                        </div>
                    </form>
                    <div className='col'>
                        <button className='mb-2 px-4 py-2 rounded-pill w-100 text-light border-0'>Acceder</button>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default Login
