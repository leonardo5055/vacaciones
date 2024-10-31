import React, { useState, useEffect } from 'react';
import Si from '../../img/si.png';
import No from '../../img/no.png';

function SolicitudesAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [visibleUsuario, setVisibleUsuario] = useState(false);

    // Fetch empleados data from API
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/empleados');
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setEmpleados(data);
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmpleados();
    }, []);

    const hizoClick = () => {
        setVisible(true); // Muestra el contenido adicional
    };

    const hizoClickConfir = () => {
        setVisible(false); // Cierra el contenido adicional
    };

    const hizoClick2 = () => {
        setVisibleUsuario(!visibleUsuario); // Muestra el contenido adicional de usuario
    };


    const seleccion = (event) => {
        const element = event.currentTarget;
        element.classList.toggle("borde-seleccion");
    };

    return (
        <div className='d-flex justify-content-center gap-5 mt-5'>
            <div className='caja-negra text-light text-center fs-4'>
                <h2 className=''>Solicitudes pendientes</h2>
                <hr />
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    empleados.map((empleado) => (
                        <div
                            key={empleado.id}
                            className='d-flex align-items-center border-bottom justify-content-between'
                            onClick={(event) => {
                                seleccion(event);
                                hizoClick2(); // Mostrar detalles al hacer clic en todo el div
                            }}
                        >
                            <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                            <div>
                                <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                                <p>10/10/2024 - 10/11/2024</p>
                                <li className='li-azul text-light'> Vacaciones</li>
                            </div>
                            <div className='gap-3'>
                                <button className='btn'><img src={Si} width={30} alt="Aceptar" /></button>
                                <button className='btn' onClick={(e) => { e.stopPropagation(); hizoClick(); }}><img src={No} width={30} alt="Rechazar" /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* rechazar motivo */}
            {visible && (
                <div className="blur-background">
                    <div className="caja-negra borde-rojo px-5 d-flex flex-column text-light text-center p-3">
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label fs-2 mt-3">Motivo de rechazo</label>
                            <hr />
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            <button className='mt-5 caja-rojaa text-light btn' onClick={hizoClickConfir}>
                                Confirmar
                            </button>
                            <br />
                            <button className='mt-3 caja-azul text-light btn' onClick={hizoClickConfir}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* caja 2 */}
            <div className='caja-negra w-50 text-light fs-4 p-4'>
                <h2>Detalles del Usuario</h2>
                <hr />
                {visibleUsuario && (
                    <div>
                        <div className='d-flex align-items-center m-3'>
                            <img src={empleados[0]?.avatar} className='rounded-circle' width={60} alt={empleados[0]?.nombres} />
                            <div className='d-flex flex-column'>
                                <p className='m-3'>Nombre: {empleados[0]?.nombres} {empleados[0]?.apellidos}</p>
                            </div>
                        </div>
                        <hr />
                        <div className='d-flex justify-content-around m-3 text-center'>
                            <div>
                                <div className='caja-blanca rounded-3'>
                                    <p className='caja-rojaa rounded-top'>Octubre</p>
                                    <p className='text-dark '>10</p>
                                    <p className='text-dark'>Jueves</p>
                                </div>
                            </div>
                            <div>
                                <div className='caja-blanca rounded-3'>
                                    <p className='caja-rojaa rounded-top'>Noviembre</p>
                                    <p className='text-dark '>10</p>
                                    <p className='text-dark'>Jueves</p>
                                </div>
                            </div>
                            <div>
                                <p>Días tomados:</p>
                                <p>28</p>
                            </div>
                        </div>
                        <hr />
                        <div className='text-light m-3'>
                            <p>Descripción:</p>
                            <li className='li-azul text-light'> Vacaciones</li>
                        </div>
                        <hr />
                        <p className='text-light m-3'>¿Quién más va a estar ausente?</p>
                        <div>
                            {empleados.map((empleado) => (
                                <div key={empleado.id} className='d-flex align-items-center text-center justify-content-between borde-blanco m-3 gap-2'>
                                    <li className='li-azul text-light ms-3'> </li>
                                    <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                                    <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                                    <p>10/10/2024 - 10/11/2024</p>
                                    <p>Vacaciones</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SolicitudesAdmin;
