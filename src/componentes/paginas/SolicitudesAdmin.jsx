import React, { useState, useEffect } from 'react';
import Cargando from '../Cargando/Cargando';

function SolicitudesAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleUsuario, setVisibleUsuario] = useState(false);
    const [selectEmpleado, setSelectEmpleado] = useState(null);

    // Fetch empleados data from API
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/admin/vacaciones');
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setEmpleados(data);
            } catch (error) {
                alert('Error al obtener los empleados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmpleados();
    }, []);

    const handleSelectEmpleado = (empleado) => {
        if (selectEmpleado?.vacacion_id === empleado.vacacion_id) {
            // Si se selecciona el mismo empleado, ocultar los detalles
            setSelectEmpleado(null);
            setVisibleUsuario(false);
        } else {
            // Selecciona un nuevo empleado y muestra sus detalles
            setSelectEmpleado(empleado);
            setVisibleUsuario(true); // Mostrar detalles del usuario
        }
    };

    const handleReject = () => {
        setVisible(true); // Muestra la caja de motivo de rechazo
    };

    const handleConfirmReject = () => {
        setVisible(false); // Cierra la caja de motivo de rechazo
    };

    return (
        <div className='d-flex justify-content-center gap-5 mt-5'>
            <div className='caja-negra text-light text-center fs-4'>
                <h2>Solicitudes pendientes</h2>
                <hr />
                {loading ? (
                    <div className='d-flex justify-content-center align-items-center'>
                        <Cargando />
                    </div>
                ) : (
                    empleados.map((empleado) => (
                        <div
                            key={empleado.vacacion_id}
                            className={`d-flex align-items-center border-bottom justify-content-between ${selectEmpleado?.vacacion_id === empleado.vacacion_id ? 'borde-seleccion' : ''}`}
                            onClick={() => handleSelectEmpleado(empleado)} // Muestra detalles al hacer clic
                        >
                            <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                            <div>
                                <p> {empleado.nombres} {empleado.apellidos}</p>
                                <p>{empleado.fecha_inicio} - {empleado.fecha_fin}</p>
                                <li className='li-azul text-light'>{empleado.motivo}</li>
                            </div>
                            <div className='gap-3'>
                                <button className='btn'>{/* Si */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-success bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button className='btn' onClick={(e) => { e.stopPropagation(); handleReject(); }}> {/* No */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-danger bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Cuadro de motivo */}
            {visible && (
                <div className="blur-background">
                    <div className="caja-negra borde-rojo px-5 d-flex flex-column text-light text-center p-3">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2 mt-3">Motivo de rechazo</label>
                            <hr />
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <button className='mt-5 caja-rojaa text-light btn' onClick={handleConfirmReject}>
                                Confirmar
                            </button>
                            <br />
                            <button className='mt-3 caja-azul text-light btn' onClick={handleConfirmReject}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Caja de detalles del empleado en la derecha */}
            {selectEmpleado && visibleUsuario && (
                <div className='caja-negra w-50 text-light fs-4 p-4'>
                    <h2>Detalles del Usuario</h2>
                    <hr />
                    <div>
                        <div className='d-flex align-items-center m-3'>
                            <img src={selectEmpleado.avatar} className='rounded-circle' width={60} alt={selectEmpleado.nombres} />
                            <div className='d-flex flex-column'>
                                <p className='m-3'>{selectEmpleado.nombres} {selectEmpleado.apellidos}</p>
                                <li className='li-azul text-light'>{selectEmpleado.motivo}</li>
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-around m-3 text-center'>
                            <div>
                                <div className='caja-blanca rounded-3'>
                                    <p className='caja-rojaa rounded-top'>{selectEmpleado.mes_inicio}</p>
                                    <p className='text-dark '>{selectEmpleado.dia_inicio}</p>
                                    <p className='text-dark'>{selectEmpleado.dia_semana_inicio}</p>
                                </div>
                            </div>
                            <div>
                                <div className='caja-blanca rounded-3'>
                                    <p className='caja-rojaa rounded-top'>{selectEmpleado.mes_fin}</p>
                                    <p className='text-dark '>{selectEmpleado.dia_fin}</p>
                                    <p className='text-dark'>{selectEmpleado.dia_semana_fin}</p>
                                </div>
                            </div>
                            <div>
                                <p>Días solicitados:</p>
                                <p>{selectEmpleado.dias_solicitados}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='text-light m-3'>
                            <p>Descripción:</p>
                            <p className='li-azul text-light'>
                                {selectEmpleado.descripcion ? selectEmpleado.descripcion : 'El empleado no escribió nada en la descripción'}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SolicitudesAdmin;
