import React, { useState, useEffect } from 'react';
import Cargando from '../Cargando/Cargando';
import Boton from '../Componentes/Boton';

const avatarEmpleado = require.context('../../img/avatar', true);

function SolicitudesAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleSi, setVisibleSi] = useState(false);
    const [visibleUsuario, setVisibleUsuario] = useState(false);
    const [selectEmpleado, setSelectEmpleado] = useState(null);
    const [descripMotivoRechazo, setDescripMotivoRechazo] = useState('');


    // Fetch empleados data from API
    useEffect(() => {
        fetchEmpleados();
    }, []);

    const fetchEmpleados = async () => {
        try {
            const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/admin/vacaciones');
            if (!response.ok) {
                throw new Error('Error en la red');
            }
            const data = await response.json();
            setEmpleados(data);

            // Seleccionar automáticamente el primer empleado si hay datos
            if (data.length > 0) {
                setSelectEmpleado(data[0]);
                setVisibleUsuario(true);
            }
        } catch (error) {
            alert('Error al obtener los empleados:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectEmpleado = (empleado) => {
        // Si el empleado seleccionado ya es el actual, no hacer nada
        if (selectEmpleado?.vacacion_id === empleado.vacacion_id) {
            return;
        }

        // Selecciona el nuevo empleado y muestra sus detalles
        setSelectEmpleado(empleado);
        setVisibleUsuario(true); // Asegurarse de que se muestren los detalles del usuario
    };


    const handleReject = () => {
        setVisible(!visible); // Muestra o oculta la caja de motivo de rechazo
    };

    const handleConfirmReject = async () => {
        if (!descripMotivoRechazo) {
            alert('Por favor, proporciona una descripción para el rechazo.');
            return;
        }

        // Confirmar antes de rechazar la solicitud
        const confirmRejection = window.confirm('¿Estás seguro de que deseas rechazar esta solicitud?');
        if (!confirmRejection) {
            return;
        }

        try {
            const response = await fetch(`https://gestiondevacaciones-api-production.up.railway.app/api/admin/vacaciones/${selectEmpleado.vacacion_id}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'Rechazado',
                    descripcion_rechazo: descripMotivoRechazo,
                }),
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al rechazar la solicitud. Intenta nuevamente.');
            }

            // Limpiar los estados
            setDescripMotivoRechazo('');
            setVisible(false);
            fetchEmpleados();

            alert('La solicitud de vacaciones ha sido rechazada correctamente.');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };




    const handleConfir = () => {
        setVisibleSi(!visibleSi); // Muestra la caja de confirmar
    };

    const handleConfirConfir = async () => {
        // Confirmar antes de aprobar la solicitud
        const confirmApproval = window.confirm('¿Estás seguro de que deseas aprobar esta solicitud?');
        if (!confirmApproval) {
            return;
        }

        try {
            const response = await fetch(`https://gestiondevacaciones-api-production.up.railway.app/api/admin/vacaciones/${selectEmpleado.vacacion_id}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'Aprobado',
                    descripcion_rechazo: null,
                }),
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al aprobar la solicitud. Intenta nuevamente.');
            }

            setVisibleSi(false);
            fetchEmpleados();

            alert('La solicitud de vacaciones ha sido aprobada correctamente.');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };


    return (
        <div className="d-flex justify-content-center gap-5 mt-5 mx-5">
            {/* Contenedor de solicitudes pendientes */}
            <div className="caja-negra text-light text-center fs-4 col-auto" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <div className="sticky-top caja-negra">
                    <h2 className="pt-3">Solicitudes Pendientes</h2>
                    <hr />
                </div>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Cargando />
                    </div>
                ) : (
                    empleados.map((empleado) => (
                        <div
                            key={empleado.vacacion_id}
                            className={`d-flex align-items-center border-bottom justify-content-between p-3 ${selectEmpleado?.vacacion_id === empleado.vacacion_id ? 'borde-seleccion' : ''}`}
                            onClick={() => handleSelectEmpleado(empleado)}
                        >
                            <div className="col-auto">
                                <img src={avatarEmpleado(`./${empleado.avatar}`)} className="rounded-circle" width={60} alt={empleado.nombres} />
                            </div>

                            <div className="flex-grow-1 d-flex flex-column align-items-start ms-3">
                                <p className="mb-1 fw-bold text-truncate" style={{ maxWidth: '200px' }}>{empleado.nombres} {empleado.apellidos}</p>
                                <p className="fs-6 mb-1 text-truncate" style={{ maxWidth: '200px' }}>{empleado.fecha_inicio} - {empleado.fecha_fin}</p>
                                <div className="d-flex align-items-center">
                                    <span className="circulo-vacaciones me-2"></span>
                                    <span className="text-light text-truncate" style={{ maxWidth: '180px' }}>{empleado.motivo}</span>
                                </div>
                            </div>

                            {/* Botones de aprobación/rechazo */}
                            <div className="col-auto d-flex gap-2">
                                <button className="btn p-0" onClick={(e) => { e.stopPropagation(); handleConfir(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="text-success bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                </button>
                                <button className="btn p-0" onClick={(e) => { e.stopPropagation(); handleReject(); }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="text-danger bi bi-x-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Cuadro de motivo rechazo */}
            {visible && (
                <div className="blur-background">
                    <div className="caja-rechazado px-5 d-flex flex-column text-light text-center p-3">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2 mt-3">Motivo de rechazo</label>
                            <hr />
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={descripMotivoRechazo} // Asigna el valor de la variable
                                onChange={(e) => setDescripMotivoRechazo(e.target.value)} // Actualiza la variable cuando cambia el texto
                            ></textarea>

                            <div className='d-flex justify-content-center'>
                                <Boton tipo="success" texto="Confirmar" tamanio="50" onClick={handleConfirmReject} />
                                <Boton tipo="danger" texto="Cancelar" tamanio="50" onClick={handleReject} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Cuadro confirmar */}
            {visibleSi && (
                <div className="blur-background">
                    <div className="caja-aprobado px-5 d-flex flex-column text-light text-center p-3">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2 mt-3">Confirmar</label>
                            <hr />
                            <p>Seguro que quiere confimar la solicitud de {selectEmpleado.nombres} {selectEmpleado.apellidos}</p>
                            <div className='d-flex justify-content-center'>
                                <Boton tipo="success" texto="Si" tamanio="25" onClick={handleConfirConfir} />
                                <Boton tipo="danger" texto="No" tamanio="25" onClick={handleConfir} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Caja de detalles del empleado en la derecha */}
            {selectEmpleado && visibleUsuario && (
                <div className="caja-negra text-light fs-4 p-4 col" style={{ maxHeight: 'max-content' }}>
                    <h2>Detalles del Usuario</h2>
                    <hr />
                    <div>
                        <div className="d-flex align-items-center m-3">
                            <img src={avatarEmpleado(`./${selectEmpleado.avatar}`)} className="rounded-circle" width={60} alt={selectEmpleado.nombres} />
                            <div className="d-flex flex-column">
                                <p className="m-3">{selectEmpleado.nombres} {selectEmpleado.apellidos}</p>
                                <div>
                                    <span className="circulo-vacaciones"></span>
                                    <span className="text-light">{selectEmpleado.motivo}</span>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-around text-center">
                            <div>
                                <div className="caja-blanca rounded-3 me-3">
                                    <p className="bg-danger rounded-top">{selectEmpleado.mes_inicio}</p>
                                    <p className="text-dark">{selectEmpleado.dia_inicio}</p>
                                    <p className="text-dark">{selectEmpleado.dia_semana_inicio}</p>
                                </div>
                            </div>
                            <div>
                                <div className="caja-blanca rounded-3 me-3">
                                    <p className="bg-danger rounded-top">{selectEmpleado.mes_fin}</p>
                                    <p className="text-dark">{selectEmpleado.dia_fin}</p>
                                    <p className="text-dark">{selectEmpleado.dia_semana_fin}</p>
                                </div>
                            </div>
                            <div>
                                <p>Fecha solicitada</p>
                                <p>Falta la info del back-end</p>
                            </div>
                        </div>
                        <div className="borde-blanco d-flex rounded-3 fs-5 align-items-center justify-content-center mt-3">
                            <p className="border-end border-3 pe-3">{selectEmpleado.dias_solicitados} días solicitados</p>
                            <p className="ps-3">falta back-end dias disponibles</p>
                        </div>
                        <hr />
                        <div className="text-light m-3">
                            <p>Descripción:</p>
                            <p className="li-azul text-light">
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
