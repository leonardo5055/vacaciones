import React, { useEffect, useState } from 'react';
import Cargando from '../Cargando/Cargando';

function HistorialAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const empleado = JSON.parse(localStorage.getItem('EmpleadoInfo'));
    console.log(empleado);

    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/empleados');
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
    }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

    return (
        <div>
            <div className="d-flex justify-content-center">
                <div className="input-group mt-5 w-50">
                    <span className="input-group-text bg-white border-end-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                        </svg>
                    </span>
                    <input className="form-control border-start-0" type="search" placeholder="Buscar" aria-label="Buscar" />
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
                        empleados.map((empleado) => (
                            <div>
                                <div key={empleado.id} className='d-flex align-items-center m-3 gap-3'>
                                    <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                                    <p>{empleado.nombres} {empleado.apellidos} </p>
                                    <p>10/10/2024 - 10/11/2024</p>
                                    <div>
                                        <li className='li-azul'>Vacaciones</li>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
                <div className='caja-negra text-light fs-4 '>
                    <h1>Filtros</h1>
                    <hr />
                    <div className='d-flex gap-3 m-2'>
                        <p>Fecha</p>
                        <input type="date" />
                    </div>
                    <hr />
                    <div className='m-3'>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Empleado</option>
                            {empleados.map(empleado => (
                                <option key={empleado.id} value={empleado.id}>{empleado.nombres} {empleado.apellidos}</option>
                            ))}
                        </select>
                    </div>
                    <hr />
                    <div className='m-3'>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Area</option>
                        </select>
                    </div>
                    <hr />
                    <div className='m-3'>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Cargo</option>
                            {empleados.map(empleado => (
                                <option key={empleado.id} value={empleado.id}>{empleado.cargo}</option>
                            ))}
                        </select>
                    </div>
                    <hr />
                    <div className='m-3'>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Motivo</option>
                        </select>
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default HistorialAdmin;