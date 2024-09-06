import React,  { useState } from 'react'
import "./estilos/login.css";
import Usuario from "../../imagenes/usuario.png";
import Llave from "../../imagenes/llave.png"

function Login({ onSubmit, loding}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {//manejador de eventos
        e.preventDefault(); //evita que el evento por defecto se ejecute
        onSubmit(email, password)
    }

    return (
        <div className='d-flex vh-100 align-items-center justify-content-center'>
            <div className='text-light d-flex flex-column gap-3 text-center w-25'>
                <h1>Iniciar sesion</h1>

                <form onSubmit={handleSubmit} className='d-flex flex-column'>
                    <div className="mb-3 d-flex">
                        <div className='caja-ic p-2'>
                            <img src={Usuario} width="32"></img>
                        </div>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email"
                            required
                            className="bg-transparent login-input w-100 text-light login-input ps-2"
                            placeholder="email" />
                    </div>
                    <div className="mb-3 d-flex">
                        <div className='caja-ic p-2'>
                            <img className='ic-llave' src={Llave} width="32"></img>
                        </div>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="contrasena"
                            required
                            className="bg-transparent login-input w-100 text-light login-input ps-2"
                            placeholder="Contraseña" />
                    </div>
                    <div>
                        <button type='submit' className='px-4 py-2 rounded-pill w-100 text-light border-0'>Acceder</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login