import React from 'react'

function Perfil() {
    let empleado = JSON.parse(localStorage.getItem('EmpleadoInfo'));
    console.log(empleado)

    const date = new Date(empleado.fecha_contratacion);

    // Obtener el día, mes y año
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses son 0-indexados
    const year = date.getUTCFullYear();

    // Formatear como día/mes/año
    empleado.fecha_contratacion = `${day}/${month}/${year}`;

    return (
        <div>
            <h1 className='text-light text-center mt-3'>Perfil</h1>
            <div className='d-flex justify-content-center gap-5 m-5'>
                <div className='caja-negra text-light text-center fs-4'>
                    <img src={empleado.avatar} className="rounded-circle" width={300} alt="" />
                    <form className='m-5 fw-bold'>
                        <div className="collapse mt-3" id="contenidoAdicional">
                            <div className="mb-5">
                                <label htmlFor="usuario" className="form-label">Email</label>
                                <input type="email" className="form-control" id="correo" placeholder="" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label">Telefono</label>
                                <input type="number" className="form-control" id="telefono" placeholder="" />
                            </div>
                        </div>
                    </form>

                    <button className='btn-azul px-4 py-2 rounded-pill text-light border-0 w-100'
                        data-bs-toggle="collapse"
                        data-bs-target="#contenidoAdicional"
                        aria-expanded="false"
                        aria-controls="contenidoAdicional"
                    >Editar perfil</button>
                </div>
                <div className='caja-negra w-50 text-light fs-4 g-3'>
                    <div>
                        <p className='m-3'>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <hr />
                        <p className='m-3'>Email: {empleado.email}</p>
                        <hr />
                        <p className='m-3'>Telefono: {empleado.celular.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2-$3')}</p>
                        <hr />
                        <p className='m-3'>Cargo: {empleado.cargo}</p>
                        <hr />
                        <p className='m-3'>Area: Programacion</p>
                        <hr />
                        <p className='m-3'>
                            Años en la empresa: {empleado.fecha_contratacion}
                        </p>
                        <hr />
                        <p className='m-3'>Fecha de nacimiento: </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil
