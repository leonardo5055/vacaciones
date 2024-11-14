import React, { useEffect, useState } from 'react';
import Cargando from '../Cargando/Cargando';
import Boton from "../Componentes/Boton"

const avatarEmpleado = require.context('../../img/avatar', true);

function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editandoEmpleado, setEditandoEmpleado] = useState(null);
    const [cargos, setCargos] = useState([]);
    const [formData, setFormData] = useState({});
    const [searchTerm, setSearchTerm] = useState("");



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

        fetch("https://gestiondevacaciones-api-production.up.railway.app/api/cargo")
            .then(response => response.json())
            .then(dataCargo => {
                setCargos(dataCargo);
            })
            .catch(error => {
                console.error("Error al cargar los cargos:", error);
            });
    }, []);


    const handleEdit = (empleadoId) => {
        if (editandoEmpleado === empleadoId) {
            setEditandoEmpleado(null);
        } else {
            setEditandoEmpleado(empleadoId);
            const empleado = empleados.find(e => e.empleado_id === empleadoId);
            setFormData({
                email: empleado.email,
                rol: empleado.rol,
                cargo: empleado.cargo_id
            });
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };


    const empleadosFiltrados = empleados.filter(empleado => {
        const fullName = `${empleado.nombres} ${empleado.apellidos}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });


    const handleConfirm = (empleadoId) => {
        const empleado = empleados.find(e => e.empleado_id === empleadoId);

        // Preparar el objeto con los cambios
        const cambios = {
            email: formData.email !== undefined ? formData.email : empleado.email,
            rol: formData.rol !== undefined ? formData.rol : empleado.rol,
            cargo_id: formData.cargo !== undefined ? formData.cargo : empleado.cargo_id,
        };

        // Si no se ha hecho ningún cambio, muestra una alerta
        if (cambios.email === empleado.email && cambios.rol === empleado.rol && cambios.cargo_id === empleado.cargo_id) {
            alert("No has realizado cambios");
            return;
        }

        // Enviar los cambios a la API
        fetch(`https://gestiondevacaciones-api-production.up.railway.app/api/admin/empleados/${empleadoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cambios)
        })
            .then(response => response.json())
            .then(updatedEmpleado => {
                // Mostrar el alert primero
                alert("Los cambios se realizaron correctamente");

                // Recargar la página después del alert
                window.location.reload();
            })
            .catch(error => {
                alert("Error al actualizar el empleado:", error);
            });

    };


    if (loading) {
        return <Cargando />;
    }


    return (
        <div>
            <h2 className="text-center text-light mb-4 text-decoration-underline mt-3">Lista de Empleados</h2>
            <div className="container my-5 d-flex flex-column align-items-center">
                <div className="input-group my-5 w-50">
                    <span className="input-group-text bg-white border-end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </span>
                    <input
                        className="form-control border-start-0"
                        type="search"
                        placeholder="Buscar por nombre o apellido"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="row w-100 d-flex justify-content-start">
                    {empleadosFiltrados.map((empleado) => (
                        <div key={empleado.empleado_id} className="col-md-4 mb-3 d-flex justify-content-center">
                            <div className="card text-light bg-dark shadow position-relative w-100">
                                <button
                                    className="btn btn-danger position-absolute top-0 end-0 m-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                    </svg>
                                </button>
                                <div className="card-body">
                                    <h5 className="card-title">{empleado.nombres} {empleado.apellidos}</h5>
                                    <img
                                        className='rounded-pill'
                                        width={"150px"}
                                        src={avatarEmpleado(`./${empleado.avatar}`)}
                                        alt={`${empleado.nombres} ${empleado.apellidos}`}
                                    />
                                    <p className="card-text"><strong>Email:</strong> {empleado.email}</p>
                                    <p className="card-text"><strong>Rol:</strong> {empleado.rol}</p>
                                    <p className="card-text"><strong>Fecha de nacimiento:</strong> {empleado.fecha_nacimiento}</p>
                                    <p className="card-text"><strong>Fecha de contratación:</strong> {empleado.fecha_contratacion}</p>
                                    <p className="card-text"><strong>Teléfono:</strong> {empleado.celular}</p>
                                    <p className="card-text"><strong>Cargo:</strong> {empleado.cargo}</p>
                                    <p className="card-text"><strong>Días de vacaciones acumulados:</strong> {empleado.dias_vacaciones_acumulados}</p>

                                    <div className='d-flex justify-content-end'>
                                        <Boton tipo="primary" tamanio="10" texto="Editar" onClick={() => handleEdit(empleado.empleado_id)} />
                                    </div>

                                    {editandoEmpleado === empleado.empleado_id && (
                                        <div className='mt-3'>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control text-light bg-transparent"
                                                    value={formData.email}
                                                    onChange={e => handleChange("email", e.target.value)}
                                                />
                                                <label className="form-label">Email</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <select
                                                    className="form-select bg-transparent text-light"
                                                    value={formData.rol}
                                                    onChange={e => handleChange("rol", e.target.value)}
                                                >
                                                    <option className="text-dark" value="Empleado">Empleado</option>
                                                    <option className="text-dark" value="Recursos Humanos">Recursos Humanos</option>
                                                </select>
                                                <label className="form-label">Rol</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <select
                                                    className="form-select bg-transparent text-light"
                                                    value={formData.cargo}
                                                    onChange={e => handleChange("cargo", e.target.value)}
                                                >
                                                    <option className="text-dark" value="">Seleccionar Cargo</option>
                                                    {cargos.map(cargo => (
                                                        <option className="text-dark" key={cargo.cargo_id} value={cargo.cargo_id}>
                                                            {cargo.cargo}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label className="form-label">Cargo</label>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <Boton tipo="primary" texto="Confirmar" tamanio="50" onClick={() => handleConfirm(empleado.empleado_id)} />
                                                <Boton tipo="danger" texto="Cancelar" tamanio="50" onClick={() => setEditandoEmpleado(null)} />
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
