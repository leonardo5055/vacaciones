import React, { useEffect, useState } from 'react';
import Cargando from '../Cargando/Cargando';

const avatarEmpleado = require.context('../../img/avatar', true);

function HistorialAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [cargoFiltro, setCargoFiltro] = useState('');
    const [motivoFiltro, setMotivoFiltro] = useState('');
    const [selectEmpleado, setSelectEmpleado] = useState(null);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones');
                const data = await response.json();

                // Filtrar los datos para excluir los estados "Pendiente"
                const filteredData = data.filter(vacacion => vacacion.estado !== 'Pendiente');

                setEmpleados(filteredData);
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEmpleados();
    }, []);


    const cargosUnicos = [...new Set(empleados.map(empleado => empleado.cargo))].filter(cargo => cargo);
    const motivosUnicos = [...new Set(empleados.map(empleado => empleado.motivo_vacaciones))].filter(motivo => motivo);



    const empleadosFiltrados = empleados.filter(empleado => {
        const nombreCompleto = `${empleado.nombre_empleado} ${empleado.apellido_empleado}`.toLowerCase();
        const coincideNombre = nombreCompleto.includes(searchTerm.toLowerCase());
        const coincideCargo = cargoFiltro ? empleado.cargo === cargoFiltro : true;
        const coincideMotivo = motivoFiltro ? empleado.motivo_vacaciones === motivoFiltro : true;

        return coincideNombre && coincideCargo && coincideMotivo;
    });

    const handleSelectEmpleado = (empleado) => {
        if (selectEmpleado && selectEmpleado.vacacion_id === empleado.vacacion_id) {
            setSelectEmpleado(null); // Deselecciona si ya está seleccionado
        } else {
            setSelectEmpleado(empleado); // Selecciona el empleado
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="input-group mt-5 w-50">
                    <span className="input-group-text bg-white border-end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </span>
                    <input
                        className="form-control border-start-0"
                        type="search"
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/*Caja historial*/}
            <div className='d-flex justify-content-center gap-5 mt-5'>
                <div className='caja-negra text-light text-center fs-4 w-50' style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <h2 className='m-3'>Historial</h2>
                    <hr />
                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <Cargando />
                        </div>
                    ) : (
                        empleadosFiltrados.map((empleado) => (
                            <div>
                                <div
                                    key={empleado.vacacion_id}
                                    className={`d-flex align-items-center m-3 gap-3 ${selectEmpleado?.vacacion_id === empleado.vacacion_id ? 'borde-seleccion' : ''}`}
                                    onClick={() => handleSelectEmpleado(empleado)}
                                >
                                    <img
                                        src={avatarEmpleado(`./${empleado.avatar}`)}
                                        className="rounded-circle"
                                        width={60}
                                        alt={`${empleado.nombre_empleado} ${empleado.apellido_empleado}`}
                                    />
                                    <p>{empleado.nombre_empleado} {empleado.apellido_empleado} </p>
                                    <p>{empleado.fecha_inicio} - {empleado.fecha_fin}</p>
                                    <div>
                                        <span className="circulo-vacaciones me-2"></span>
                                        <span className="text-light text-truncate" style={{ maxWidth: '180px' }}>{empleado.motivo_vacaciones}</span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                    )}
                </div>

                {/*Caja detalles  */}
                {selectEmpleado && (
                    <div className="caja-negra text-light fs-4 p-4">
                        <h2 className='text-center'>Detalles</h2>
                        <hr />
                        <div>
                            <div className="d-flex align-items-center m-3">
                                <img src={selectEmpleado.avatar} className="rounded-circle" width={60} alt={selectEmpleado.nombre_empleado} />
                                <p className="m-3">{selectEmpleado.nombre_empleado} {selectEmpleado.apellido_empleado} - {selectEmpleado.cargo}</p>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <span className="circulo-vacaciones"></span>
                                <p>{selectEmpleado.motivo_vacaciones}</p>
                                <p>{selectEmpleado.fecha_inicio} - {selectEmpleado.fecha_fin}</p>
                            </div>
                            <div className="text-light mt-3">
                                <p>Descripción:</p>
                                <p className='ms-3'>{selectEmpleado.descripcion}</p>
                            </div>
                            <div className='mt-3'>
                                {selectEmpleado.estado === 'Rechazado' && (
                                    <div>
                                        <p>El estado de la solicitud es <strong className='bg-danger text-black'>{selectEmpleado.estado}</strong></p>
                                        <div className="text-light mt-3">
                                            <p>Motivo de rechazo:</p>
                                            <p className='ms-3'>{selectEmpleado.descripcion_rechazo}</p>
                                        </div>
                                    </div>
                                )}
                                {selectEmpleado.estado === 'Aprobado' && (
                                    <p>El estado de la solicitud es <strong className='bg-success text-black'>{selectEmpleado.estado}</strong></p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/*Caja filtros  */}
                <div className='caja-negra text-light fs-4'>
                    <h1 className='m-3'>Filtros</h1>
                    <hr />
                    <div className='m-3'>
                        <select
                            className="form-select form-select-lg mb-3"
                            value={cargoFiltro}
                            onChange={(e) => setCargoFiltro(e.target.value)}
                        >
                            <option value="">Cargo</option>
                            {cargosUnicos.map((cargo, index) => (
                                <option key={index} value={cargo}>{cargo}</option>
                            ))}
                        </select>
                    </div>
                    <hr />
                    <div className='m-3'>
                        <select
                            className="form-select form-select-lg mb-3"
                            value={motivoFiltro}
                            onChange={(e) => setMotivoFiltro(e.target.value)}
                        >
                            <option value="">Motivo</option>
                            {motivosUnicos.map((motivo, index) => (
                                <option key={index} value={motivo}>{motivo}</option>
                            ))}
                        </select>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default HistorialAdmin;
