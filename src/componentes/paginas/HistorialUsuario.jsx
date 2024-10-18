import React, { useEffect, useState } from 'react';

function Historial() {
    const [vacacionesEmpleado, setVacacionesEmpleado] = useState([]);

    useEffect(() => {
        const fetchVacaciones = async () => {
            try {
                const response = await fetch("https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones");
                const data = await response.json();
                const empleadoId = 1; // Cambia esto por el ID dinámico del empleado

                // Filtrar por empleado_id
                const filteredVacaciones = data.filter(vacacion => vacacion.empleado_id === empleadoId);
                setVacacionesEmpleado(filteredVacaciones);
            } catch (error) {
                console.error("Error al obtener las vacaciones:", error);
            }
        };

        fetchVacaciones();
    }, []);

    return (
        <div>
            <h2 className='text-light d-flex justify-content-center m-5'>Vacaciones tomadas</h2>
            {vacacionesEmpleado.map((vacacion, index) => (
                <div key={index} className='d-flex justify-content-around text-light align-items-center caja-verde borde-verde gap-5 m-5'>
                    <div className='mt-3'>
                        {/* Convertir las fechas al formato deseado */}
                        <p>Vacaciones del {new Date(vacacion.fecha_inicio).toLocaleDateString('es-AR')}</p>
                        <p>Hasta el {new Date(vacacion.fecha_fin).toLocaleDateString('es-AR')}</p>
                    </div>
                    <p className='mt-3'>Días de vacaciones: {vacacion.dias_solicitados}</p>
                    <p className='mt-3'>Días sobrantes: 17</p> {/* Ajusta los días sobrantes si es necesario */}
                </div>
            ))}
        </div>
    );
}

export default Historial;
