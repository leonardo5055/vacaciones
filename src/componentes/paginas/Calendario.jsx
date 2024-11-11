import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/Calendario.css'; // Asegúrate de incluir tu archivo de estilos aquí

moment.locale('es');
const localizer = momentLocalizer(moment);

const messages = {
    allDay: 'Todo el día',
    previous: 'Anterior',
    next: 'Siguiente',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango.'
};

let empleado = JSON.parse(localStorage.getItem('EmpleadoInfo'));
console.log(empleado);

function Calendario() {
    const [myEvents, setMyEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEvent, setSelectedEvent] = useState(null); // Estado para el evento seleccionado

    useEffect(() => {
        const fetchVacaciones = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones');

                if (!response.ok) {
                    throw new Error('Error al obtener los datos de vacaciones');
                }

                const data = await response.json();

                const eventosVacaciones = data
                    .filter(vacacion => vacacion.empleado_id === empleado.empleado_id) // Filtra por el empleado
                    .map(vacacion => {
                        const [diaInicio, mesInicio, anioInicio] = vacacion.fecha_inicio.split('/');
                        const [diaFin, mesFin, anioFin] = vacacion.fecha_fin.split('/');
                        console.log("Fecha Inicia")
                        console.log(parseInt(diaInicio), " ", mesInicio, " ", anioInicio);
                        console.log("Fecha Fin")
                        console.log(parseInt(diaFin), " ", mesFin, " ", anioFin)

                        return {
                            title: `${vacacion.motivo_vacaciones} - ${vacacion.estado}`,
                            start: new Date(anioInicio, mesInicio - 1, parseInt(diaInicio)), // mesInicio - 1 para ajustar a Date
                            end: new Date(anioFin, mesFin - 1, parseInt(diaFin) + 1),
                            fecha_inicio: vacacion.fecha_inicio,
                            fecha_fin: vacacion.fecha_fin,
                            allDay: true,
                            description: vacacion.descripcion || "Sin descripción", // Descripción de la vacación
                            estado: vacacion.estado, // Estado de la vacación
                            motivoRechazo: vacacion.motivo_rechazo_id, // Motivo de rechazo si existe
                        };
                    });

                setMyEvents(eventosVacaciones);
            } catch (error) {
                console.error('Error al obtener las vacaciones:', error);
                alert(`Error al obtener las vacaciones: ${error.message}`);
            }
        };

        fetchVacaciones();
    }, []);


    // Función para determinar el estilo de cada evento según su estado
    const eventPropGetter = (event) => {
        let cajaClase = ''; // Clase por defecto

        if (event.estado === 'Aprobado') cajaClase = 'event-aprobado';
        else if (event.estado === 'Pendiente') cajaClase = 'event-pendiente';
        else if (event.estado === 'Rechazado') cajaClase = 'event-rechazado';

        return { className: cajaClase };
    };


    return (
        <div className="text-light mx-5">
            <h1 className="text-center">Calendario</h1>
            <div className="d-flex justify-content-center">
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    messages={messages}
                    views={['month']}
                    date={currentDate}
                    onNavigate={(newDate) => setCurrentDate(newDate)}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700, width: 1500 }}
                    eventPropGetter={eventPropGetter}
                    onSelectEvent={(event) => setSelectedEvent(event)}
                    popup // Activar el popup para eventos adicionales
                />

            </div>

            {/* Modal para mostrar detalles del evento */}
            {selectedEvent && (
                <div className="event-details-modal" onClick={() => setSelectedEvent(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>{selectedEvent.title}</h2>
                        <p><strong>Fecha Inicio:</strong> {selectedEvent.fecha_inicio}</p>
                        <p><strong>Fecha Fin:</strong> {selectedEvent.fecha_fin}</p>
                        <p><strong>Descripción:</strong> {selectedEvent.description}</p>
                        <p><strong>Estado:</strong> {selectedEvent.estado}</p>
                        {selectedEvent.estado === 'Rechazado' && (
                            <p><strong>Motivo de Rechazo:</strong> {selectedEvent.motivoRechazo}</p>
                        )}
                        <button onClick={() => setSelectedEvent(null)}>Cerrar</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Calendario;
