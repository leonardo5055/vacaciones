import React, { useEffect, useState } from 'react';
import Cargando from '../Cargando/Cargando';

function HistorialAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
    const [cargoFiltro, setCargoFiltro] = useState(''); // Estado para el filtro de cargo
    const [motivoFiltro, setMotivoFiltro] = useState(''); // Estado para el filtro de motivo

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones');
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setEmpleados(data); // Guarda los empleados en el estado
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
            } finally {
                setLoading(false); // Cambia el estado de carga
            }
        };

        fetchEmpleados();
    }, []);

    // Extrae cargos únicos y motivos únicos
    const cargosUnicos = [...new Set(empleados.map(empleado => empleado.cargo))].filter(cargo => cargo);
    const motivosUnicos = [...new Set(empleados.map(empleado => empleado.motivo_vacaciones))].filter(motivo => motivo);

    // Filtra empleados según el término de búsqueda, cargo y motivo
    const empleadosFiltrados = empleados.filter(empleado => {
        const nombreCompleto = `${empleado.nombre_empleado} ${empleado.apellido_empleado}`.toLowerCase();
        const coincideNombre = nombreCompleto.includes(searchTerm.toLowerCase());
        const coincideCargo = cargoFiltro ? empleado.cargo === cargoFiltro : true;
        const coincideMotivo = motivoFiltro ? empleado.motivo_vacaciones === motivoFiltro : true;

        return coincideNombre && coincideCargo && coincideMotivo;
    });

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
                        aria-label="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                    />
                </div>
            </div>

            <div className='d-flex justify-content-center gap-5 mt-5'>
                <div className='caja-negra text-light text-center fs-4 w-50'>
                    <h2 className='m-3 d-flex'>Historial</h2>
                    <hr />
                    {loading ? (
                        <div className='d-flex justify-content-center align-items-center'>
                            <Cargando />
                        </div>
                    ) : (
                        empleadosFiltrados.map((empleado) => (
                            <div key={empleado.vacacion_id}>
                                <div className='d-flex align-items-center m-3 gap-3'>
                                    <img
                                        src={empleado.avatar}
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

                <div className='caja-negra text-light fs-4'>
                    <h1>Filtros</h1>
                    <hr />
                    <div className='m-3'>
                        <select
                            className="form-select form-select-lg mb-3"
                            aria-label="Large select example"
                            value={cargoFiltro}
                            onChange={(e) => setCargoFiltro(e.target.value)} // Actualiza el filtro de cargo
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
                            aria-label="Large select example"
                            value={motivoFiltro}
                            onChange={(e) => setMotivoFiltro(e.target.value)} // Actualiza el filtro de motivo
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
