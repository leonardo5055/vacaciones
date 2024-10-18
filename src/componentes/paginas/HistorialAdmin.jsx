import React, { useEffect, useState } from 'react';

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
            <div className='d-flex justify-content-center'>
                <input className="form-control mt-5 w-50" type="search" placeholder="Buscar" aria-label="Buscar" />
            </div>
            <div className='d-flex justify-content-center gap-5 mt-5'>
                <div className='caja-negra text-light text-center fs-4 w-50'>
                    <h2 className='m-3 d-flex'>Historial</h2>
                    <hr />
                    {loading ? (
                        <p>Cargando...</p>
                    ) : (
                        empleados.map((empleado) => (
                            <div>
                                <div key={empleado.id} className='d-flex align-items-center m-3 gap-3'>
                                    <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                                    <p>Nombre: {empleado.nombres} {empleado.apellidos} </p>
                                    <p>10/10/2024 - 10/11/2024</p>
                                    <div>
                                        <p>🔵 Vacaciones</p>
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