import React, { useEffect, useState } from 'react';

function Historial() {
    const [vacacionesEmpleado, setVacacionesEmpleado] = useState([]);
    const [visible, setVisible] = useState(false);

    // Obtener la información del empleado desde localStorage
    const empleadoInfo = JSON.parse(localStorage.getItem('EmpleadoInfo'));

    const hizoClick = () => {
        setVisible(!visible); // Muestra el contenido adicional
    };

    useEffect(() => {
        const fetchVacaciones = async () => {
            try {
                const response = await fetch("https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones");
                const data = await response.json();

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
                    cajaClase += 'caja-aprobado';
                } else if (vacacion.estado === "Pendiente") {
                    cajaClase += 'caja-pendiente';
                } else if (vacacion.estado === "Rechazado") {
                    cajaClase += 'caja-rechazado';
                }
                return (
                    <div key={index} className={`${cajaClase} gap-5 m-5`}>
                        <div className='mt-3'>
                            {/* Convertir las fechas al formato deseado */}
                            <p>Vacaciones del {new Date(vacacion.fecha_inicio).toLocaleDateString('es-AR')}</p>
                            <p>Hasta el {new Date(vacacion.fecha_fin).toLocaleDateString('es-AR')}</p>
                        </div>
                        <p className='mt-3'>Días de vacaciones: {vacacion.dias_solicitados}</p>
                        <p className='mt-3'>Días sobrantes: 17 </p> {/* Ajusta los días sobrantes si es necesario */}

                        {/* Agregar el botón si el estado es "Rechazado" */}
                        {vacacion.estado === "Rechazado" && (
                            <button className="btn btn-rojo text-light" onClick={hizoClick}>
                                Motivo de rechazo
                            </button>
                        )}
                    </div>
                );
            })}
            {visible && (
                <div className="blur-background">
                    <div className="caja-negra borde-rojo px-5 d-flex flex-column text-light text-center p-3 w-25">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2 mt-3">Motivo de rechazo</label>
                            <hr />
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, magni accusamus pariatur consequuntur corporis at blanditiis! Deleniti neque voluptate saepe eveniet, eos tempore harum odit delectus labore consequatur placeat ipsa.</p>
                            <button className='mt-5 caja-rojaa text-light btn' onClick={hizoClick}>
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Historial;