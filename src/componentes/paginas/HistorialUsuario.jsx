import React, { useEffect, useState } from 'react';
import Boton from '../Componentes/Boton';

function Historial() {
    const [vacacionesEmpleado, setVacacionesEmpleado] = useState([]);
    const [visible, setVisible] = useState(false);
    const [motivoRechazo, setMotivoRechazo] = useState(""); // Estado para manejar el motivo de rechazo

    // Obtener la información del empleado desde localStorage
    const empleadoInfo = JSON.parse(localStorage.getItem('EmpleadoInfo'));

    const hizoClick = (motivo) => {
        setVisible(!visible);
        setMotivoRechazo(motivo); // Actualiza el motivo de rechazo cuando se hace clic en el botón
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
                    <div key={index} className={`${cajaClase} gap-5 m-5 py-3`}>
                        <div className='mt-3'>
                            {/* Convertir las fechas al formato deseado */}
                            <p>Vacaciones del {vacacion.fecha_inicio}</p>
                            <p>Hasta el {vacacion.fecha_fin}</p>
                        </div>
                        <p className='mt-3'>Días de vacaciones: {vacacion.dias_solicitados}</p>
                        <p className='mt-3'>Días sobrantes: 17 </p> {/* Ajusta los días sobrantes si es necesario */}

                        {/* Agregar el botón si el estado es "Rechazado" */}
                        {vacacion.estado === "Rechazado" && (
                            <Boton tipo="danger" texto="Motivo de rechazo" tamanio="10" onClick={() => hizoClick(vacacion.descripcion_rechazo)} />
                        )}
                    </div>
                );
            })}

            {/* Mostrar el motivo de rechazo en un modal cuando se haga clic */}
            {visible && (
                <div className="blur-background">
                    <div className="caja-negra border-danger px-5 d-flex flex-column text-light text-center p-3 w-25">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2 mt-3">Motivo de rechazo</label>
                            <hr />
                            {/* Mostrar el motivo de rechazo */}
                            <p>{motivoRechazo}</p>
                            <Boton tipo="danger" texto="Cerrar" tamanio="50" onClick={hizoClick} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Historial;
