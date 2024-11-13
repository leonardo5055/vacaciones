import React, { useEffect, useState } from 'react';
import Cargando from '../Cargando/Cargando';
import Boton from "../Componentes/Boton"

const avatarEmpleado = require.context('../../img/avatar', true);

function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editandoEmpleado, setEditandoEmpleado] = useState(null); // Estado para el empleado que se está editando

    useEffect(() => {
        fetch("https://gestiondevacaciones-api-production.up.railway.app/api/empleados")
            .then(response => response.json())
            .then(data => {
                setEmpleados(data);
                setLoading(false);
            })
            .catch(error => {
                alert("Error al obtener los empleados:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Cargando />;
    }

    const handleEdit = (empleadoId) => {
        if (editandoEmpleado === empleadoId) {
            setEditandoEmpleado(null);
        } else {
            setEditandoEmpleado(empleadoId);
        }
    };

    return (
        <div>
            <h2 className="text-center text-light mb-4 text-decoration-underline mt-3">Lista de Empleados</h2>
            <div className="d-flex justify-content-center">
                <div className="input-group w-50">
                    <span className="input-group-text bg-white border-end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </span>
                    <input
                        className="form-control border-start-0"
                        type="search"
                        placeholder="Buscar"
                    />
                </div>
            </div>
            <div className="container my-5">
                <div className="row">
                    {empleados.map((empleado) => (
                        <div key={empleado.empleado_id} className="col-md-4 mb-3">
                            <div className="card text-light bg-dark shadow position-relative">
                                <button
                                    className="btn btn-danger position-absolute top-0 end-0 m-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </button>

                                <div className="card-body">
                                    <h5 className="card-title">{empleado.nombres} {empleado.apellidos}</h5>
                                    <img className='rounded-pill' width={"150px"} src={avatarEmpleado(`./${empleado.avatar}`)} alt={`${empleado.nombres} ${empleado.apellidos}`} />
                                    <p className="card-text"><strong>Email:</strong> {empleado.email}</p>
                                    <p className="card-text"><strong>Rol:</strong> {empleado.rol}</p>
                                    <p className="card-text"><strong>Fecha de nacimiento:</strong> {empleado.fecha_nacimiento}</p>
                                    <p className="card-text"><strong>Fecha de contratación:</strong> {empleado.fecha_contratacion}</p>
                                    <p className="card-text"><strong>Teléfono:</strong> {empleado.celular}</p>
                                    <p className="card-text"><strong>Cargo:</strong> {empleado.cargo_id}</p>
                                    <p className="card-text"><strong>Días de vacaciones acumulados:</strong> {empleado.dias_vacaciones_acumulados}</p>

                                    <div className='d-flex justify-content-end'>
                                        <Boton tipo="primary" tamanio="10" texto="Editar" onClick={() => handleEdit(empleado.empleado_id)} />
                                    </div>

                                    {/* Editar empleado */}
                                    {editandoEmpleado === empleado.empleado_id && (
                                        <div>
                                            <div className="mb-3">
                                                <label htmlFor="usuario" className="form-label">Email</label>
                                                <input type="email" className="form-control" id="correo" placeholder={empleado.email} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="usuario" className="form-label">Rol</label>
                                                <input type="text" className="form-control" id="RolEdit" placeholder={empleado.rol} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="usuario" className="form-label">Cargo</label>
                                                <input className="form-control" type="text" id="CargoEdit" placeholder={empleado.cargo_id} />
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <Boton tipo="primary" texto="Confirmar" tamanio="50" onClick={() => handleEdit(null)} />
                                                <Boton tipo="danger" texto="Cancelar" tamanio="50" onClick={() => handleEdit(null)} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Empleados;
