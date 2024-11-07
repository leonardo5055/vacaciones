import React, { useState, useEffect } from 'react';
import Si from '../../img/si.png';
import No from '../../img/no.png';
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
                        <Cargando/>
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
                                <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                                <p>{empleado.fecha_inicio} - {empleado.fecha_fin}</p>
                                <li className='li-azul text-light'>{empleado.motivo}</li>
                            </div>
                            <div className='gap-3'>
                                <button className='btn'><img src={Si} width={30} alt="Aceptar" /></button>
                                <button className='btn' onClick={(e) => { e.stopPropagation(); handleReject(); }}><img src={No} width={30} alt="Rechazar" /></button>
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
                                <p className='m-3'>Nombre: {selectEmpleado.nombres} {selectEmpleado.apellidos}</p>
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
