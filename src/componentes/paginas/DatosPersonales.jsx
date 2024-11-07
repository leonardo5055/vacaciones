import React from 'react'
import { Link } from 'react-router-dom'

function DatosPersonales() {
    return (
        <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
            <form className='w-25 text-light'>
                <h1 className='text-center text-decoration-underline'>Crear usuarios</h1>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control text-light bg-transparent" />
                    <label >Nombre</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control text-light bg-transparent" />
                    <label >Apellido</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control text-light bg-transparent" />
                    <label >Fecha de nacimiento</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control bg-transparent text-light" />
                    <label>Fecha de contratacion</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control bg-transparent text-light" />
                    <label>Telefono</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control bg-transparent text-light" />
                    <label>Cargo</label>
                </div>
                <Link to="/solicitudes">
                    <button type="button" className="btn btn-primary w-100">Crear usuario</button>
                </Link>
            </form>
        </div>
    )
}

export default DatosPersonales
