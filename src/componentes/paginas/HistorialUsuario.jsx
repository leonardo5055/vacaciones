import React, { useEffect, useState } from 'react';

function Historial() {
    const [vacacionesEmpleado, setVacacionesEmpleado] = useState([]);

    // Obtener la información del empleado desde localStorage
    const empleadoInfo = JSON.parse(localStorage.getItem('EmpleadoInfo'));

    useEffect(() => {
        const fetchVacaciones = async () => {
            try {
                const response = await fetch("https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones");
                const data = await response.json();// Cambia esto por el ID dinámico del empleado

                // Filtrar por empleado_id
                const filteredVacaciones = data.filter(vacacion => vacacion.empleado_id === empleadoInfo.usuario_id);
                setVacacionesEmpleado(filteredVacaciones);
            } catch (error) {
                alert("Error al obtener las vacaciones:", error);
            }
        };

        fetchVacaciones();
    }, []);

    return (
        <div>
            <h2 className='text-light d-flex justify-content-center m-5'>Vacaciones tomadas</h2>
            {vacacionesEmpleado.map((vacacion, index) => {
                // Determinar las clases según el estado de la vacación
                let cajaClase = 'd-flex justify-content-around text-light align-items-center ';
                if (vacacion.estado === "Aprobado") {
                    cajaClase += 'caja-verde borde-verde';
                } else if (vacacion.estado === "Pendiente") {
                    cajaClase += 'caja-amarilla borde-amarillo';
                } else if (vacacion.estado === "Rechazado") {
                    cajaClase += 'caja-roja borde-roja';
                }

                return (
                    <div key={index} className={`${cajaClase} gap-5 m-5`}>
                        <div className='mt-3'>
                            {/* Convertir las fechas al formato deseado */}
                            <p>Vacaciones del {new Date(vacacion.fecha_inicio).toLocaleDateString('es-AR')}</p>
                            <p>Hasta el {new Date(vacacion.fecha_fin).toLocaleDateString('es-AR')}</p>
                        </div>
                        <p className='mt-3'>Días de vacaciones: {vacacion.dias_solicitados}</p>
                        <p className='mt-3'>Días sobrantes: 17</p> {/* Ajusta los días sobrantes si es necesario */}
                    </div>
                );
            })}
        </div>

    );
}

export default Historial;
