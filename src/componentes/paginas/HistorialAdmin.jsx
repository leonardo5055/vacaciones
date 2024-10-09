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
                        empleados.map((emp) => (
                            <div key={emp.id} className='d-flex align-items-center m-3 gap-3'>
                                <img src={emp.avatar} className='rounded-circle' width={60} alt={emp.nombres} />
                                <div>
                                    <p>Nombre: {emp.nombres} {emp.apellidos}</p>
                                    <p>10/10/2024 - 10/11/2024</p>
                                    <p>🔵 Vacaciones</p>
                                </div>
                                <hr />
                            </div>
                        ))
                    )}
                </div>
                <div className='caja-negra text-light fs-4 '>
                    <h1>Filtros</h1>
                    <hr />
                    <div>
                        <p>Fecha</p>
                        <input type="date" />
                    </div>
                    <hr />
                    <div>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Empleado</option>
                            
                        </select>

                        {empleados.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.nombres} {emp.apellidos}</option>
                            ))}
                    </div>
                    <hr />
                    <div>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Area</option>
                        </select>
                    </div>
                    <hr />
                    <div>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Cargo</option>
                        </select>
                    </div>
                    <hr />
                    <div>
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
