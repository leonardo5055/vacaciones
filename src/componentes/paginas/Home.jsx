import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../Componentes/Boton';

function Home() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [diasVacaciones, setDiasVacaciones] = useState(0);
    const [fechaFin, setFechaFin] = useState('');
    const [motivos, setMotivos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Nuevo estado para rastrear la sumisión
    const navigate = useNavigate();

    // Obtener la información del empleado desde localStorage
    const empleadoInfo = JSON.parse(localStorage.getItem('EmpleadoInfo'));

    useEffect(() => {
        const fetchMotivos = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/motivos');
                const data = await response.json();
                setMotivos(data);
            } catch (error) {
                console.error('Error al obtener motivos:', error);
            }
        };

        fetchMotivos();
    }, []);

    const handleFechaInicioChange = (event) => {
        const selectedStartDate = event.target.value;
        setFechaInicio(selectedStartDate);

        if (selectedStartDate && diasVacaciones) {
            const startDate = new Date(selectedStartDate);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + diasVacaciones);
            setFechaFin(endDate.toISOString().split('T')[0]);
        } else {
            setFechaFin('');
        }
    };

    const handleDiasVacacionesChange = (event) => {
        const selectedDays = parseInt(event.target.value);
        setDiasVacaciones(selectedDays);

        if (fechaInicio) {
            const startDate = new Date(fechaInicio);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + selectedDays);
            setFechaFin(endDate.toISOString().split('T')[0]);
        } else {
            setFechaFin('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Deshabilitar el botón y mostrar que la solicitud está en proceso
        setIsSubmitting(true);

        if (!fechaInicio || !diasVacaciones) {
            alert("Por favor, completa todos los campos requeridos.");
            setIsSubmitting(false); // Habilitar el botón de nuevo
            return;
        }

        const motivoSeleccionado = document.getElementById('motivo').value;
        if (motivoSeleccionado === '0') {
            alert("Por favor, selecciona un motivo.");
            setIsSubmitting(false); // Habilitar el botón de nuevo
            return;
        }

        const detalles = document.getElementById('detalles').value;

        const nuevaVacacion = {
            empleado_id: empleadoInfo.usuario_id,
            motivo_id: motivoSeleccionado,
            descripcion: detalles,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            dias_solicitados: diasVacaciones
        };

        try {
            const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/vacaciones', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaVacacion),
            });

            if (!response.ok) {
                throw new Error('Error en la creación de la solicitud de vacaciones');
            }

            const data = await response.json();
            alert(data.message);

            // Redirige al usuario a la página de historial
            navigate('/historial');
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Hubo un problema al enviar la solicitud de vacaciones.');
        } finally {
            setIsSubmitting(false); // Habilitar el botón de nuevo después de la solicitud
        }
    };

    const calcularVacaciones = (fecha) => {
        const fecha1 = new Date(fecha);
        const fecha2 = new Date(); // Fecha actual

        // Obtenemos el año y mes de cada fecha
        const año1 = fecha1.getFullYear();
        const mes1 = fecha1.getMonth();
        const año2 = fecha2.getFullYear();
        const mes2 = fecha2.getMonth();

        // Calculamos la diferencia en meses
        const diferenciaMeses = (año2 - año1) * 12 + (mes1 - mes2);
        return Math.abs(diferenciaMeses); //diferencia de meses
    };

    const mesesDeDiferencia = calcularVacaciones(empleadoInfo.fecha_contratacion);
    console.log("La diferencia en meses es:", mesesDeDiferencia);
    if (mesesDeDiferencia >= 6 && mesesDeDiferencia <= 60) {
        console.log("mas de 6 meses menos de 5 años")
        const diasDeVacaciones = 14;
    }
    else if (mesesDeDiferencia >= 60 && mesesDeDiferencia <= 120) {
        const diasDeVacaciones = 21;
        console.log("mas de 5 años menos de 10 años")
    }
    else if (mesesDeDiferencia >= 240) {
        const diasDeVacaciones = 28;
        console.log("mas de 10 años")
    }

    return (
        <div className="container">
            <h1 className='text-light text-center text-decoration-underline'>Toma tus vacaciones</h1>
            <div className='row justify-content-center'>
                <div className='col-lg-6 col-sm-12'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="fecha_inicio" className="form-label text-light">
                                Fecha de Inicio de Vacaciones
                            </label>
                            <input
                                type="date"
                                id="fecha_inicio"
                                name="fecha_inicio"
                                className="form-control"
                                value={fechaInicio}
                                onChange={handleFechaInicioChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dias_vacaciones" className="form-label text-light">
                                ¿Cuántos días de vacaciones se va a tomar?
                            </label>
                            <select
                                id="dias_vacaciones"
                                className="form-select form-select-lg mb-3"
                                onChange={handleDiasVacacionesChange}
                                value={diasVacaciones}
                                required
                            >
                                <option value="0" disabled>Selecciona una opción</option>
                                {[...Array(28).keys()].map(i => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fecha_fin" className="form-label text-light">
                                Fecha de Fin
                            </label>
                            <input
                                type="date"
                                id="fecha_fin"
                                name="fecha_fin"
                                className="form-control"
                                value={fechaFin}
                                readOnly
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="motivo" className="form-label text-light">
                                Motivo
                            </label>
                            <select id="motivo" className="form-select form-select-lg mb-3" required>
                                <option value="0">Selecciona una opción</option>
                                {motivos.map(motivo => (
                                    <option key={motivo.motivo_id} value={motivo.motivo_id}>
                                        {motivo.motivo}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="detalles" className="form-label text-light">Detalle</label>
                            <textarea className="form-control" id="detalles" rows="3" required></textarea>
                        </div>
                        <Boton tipo="primary" texto="Tomar vacaciones" tamanio="100" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Tomar vacaciones'}
                        </Boton>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Home;
