import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español para moment
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/Calendario.css'; // Asegúrate de incluir tu archivo de estilos aquí

// Configura moment en español
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

let empleado = JSON.parse(localStorage.getItem('EmpleadoInfo')); // Obtén la información del empleado
console.log(empleado);

function Calendario() {
    const [myEvents, setMyEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // Función para obtener las vacaciones
        const fetchVacaciones = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones');
                const data = await response.json();

                // Filtrar las vacaciones por empleado_id
                const vacacionesEmpleado = data.filter(vacacion => vacacion.empleado_id === empleado.empleado_id);

                // Transformar las vacaciones en eventos del calendario
                const eventosVacaciones = vacacionesEmpleado.map(vacacion => {
                    // Convertir las fechas de inicio y fin a objetos Date con año, mes, día, hora, minuto
                    const fechaInicio = new Date(vacacion.fecha_inicio);
                    const fechaFin = new Date(vacacion.fecha_fin);

                    console.log(fechaInicio)

                    return {
                        title: 'Vacaciones', // Título fijo como 'Vacaciones'
                        start: new Date(
                            fechaInicio.getFullYear(),
                            fechaInicio.getMonth(),
                            fechaInicio.getDate() + 1,
                            fechaInicio.getHours(),
                            fechaInicio.getMinutes(),
                            fechaInicio.getSeconds()
                        ), // Desglose de la fecha inicio
                        end: new Date(
                            fechaFin.getFullYear(),
                            fechaFin.getMonth(),
                            fechaFin.getDate() + 1,
                            fechaFin.getHours(),
                            fechaFin.getMinutes(),
                            fechaFin.getSeconds()
                        ), // Desglose de la fecha fin
                        allDay: false, // Puedes ajustar esto si no es un evento de todo el día
                    };
                });


                setMyEvents(eventosVacaciones); // Actualizar los eventos
            } catch (error) {
                alert('Error al obtener las vacaciones:', error);
            }
        };

        fetchVacaciones(); // Llamar a la función para obtener los datos
    }, []); // Ejecutar solo una vez al montar el componente

    return (
        <div className="text-light mx-5">
            <h1 className="text-center">Calendario</h1>
            <div className="d-flex justify-content-center">
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    messages={messages}
                    views={['month']} // Solo muestra la vista mensual
                    date={currentDate} // Controla la fecha actual
                    onNavigate={(newDate) => setCurrentDate(newDate)} // Permite la navegación entre meses y años
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 700, width: 1500 }}
                />
            </div>
        </div>
    );
}

export default Calendario;
