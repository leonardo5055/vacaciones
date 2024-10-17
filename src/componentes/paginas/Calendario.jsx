import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español para moment
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../index.css'; // Asegúrate de incluir tu archivo de estilos aquí

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

const events = [
    // {
    //     title: 'Vacaciones',
    //     start: new Date(2024, 9, 17, 10, 0),
    //     end: new Date(2024, 9, 20, 12, 0),
    // }
];

function Calendario() {
    const [myEvents, setMyEvents] = useState(events);
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div className="text-light" style={{ height: '500px' }}>
            <h1 className='text-center'>Calendario</h1>
            <div className='d-flex justify-content-center'>
                <Calendar
                    localizer={localizer}
                    events={myEvents}
                    messages={messages}
                    views={['month']}  // Solo muestra la vista mensual
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