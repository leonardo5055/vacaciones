import React, { useState, useEffect } from 'react';
import Si from '../../img/si.png';
import No from '../../img/no.png';

function SolicitudesAdmin() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch empleados data from API
    useEffect(() => {
        const fetchEmpleados = async () => {
            try {
                const response = await fetch('https://gestiondevacaciones-api-production.up.railway.app/api/empleados');
                if (!response.ok) {
                    throw new Error('Error en la red');
                }
                const data = await response.json();
                setEmpleados(data); // Guardar empleados en el estado
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
            } finally {
                setLoading(false); // Cambia el estado de carga
            }
        };

        fetchEmpleados();
    }, []); // Array vacío para que se ejecute solo una vez al montar el componente

    return (
        <div className='d-flex justify-content-center gap-5 mt-5'>
            <div className='caja-negra text-light text-center fs-4'>
                <h2 className='mt-3'>Solicitudes pendientes</h2>
                <hr />
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    empleados.map((empleado) => (
                        <div key={empleado.id} className='d-flex align-items-center border-bottom'>
                            <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                            <div>
                                <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                                <p>10/10/2024 - 10/11/2024</p>
                                <p> 🔵 Vacaciones</p>
                            </div>
                            <div className='gap-3'>
                                <button className='btn'><img src={Si} width={30} alt="Aceptar" /></button>
                                <button className='btn'><img src={No} width={30} alt="Rechazar"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#contenidoAdicional"

                                    aria-controls="contenidoAdicional"
                                /></button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="collapse caja-negra h-50" id="contenidoAdicional">
                <div className="mb-5 text-light text-center">
                    <div class="mb-3 m-3">
                        <label for="exampleFormControlTextarea1" className="form-label fs-2">Motivo de rechazo</label>
                        <hr />
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                </div>
            </div>
            <div className='caja-negra w-50 text-light fs-4'>
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
                        <p>Dias tomados:</p>
                        <p>28</p>
                    </div>
                </div>
                <hr />
                <div className='text-light m-3'>
                    <p>Descripción:</p>
                    <p> 🔵 Vacaciones</p>
                </div>
                <hr />
                <p className='text-light m-3'>¿Quién más va estar ausente?</p>
                <div>
                    {empleados.map((empleado) => (
                        <div key={empleado.id} className='d-flex justify-content-around align-items-center borde-blanco m-3 gap-3'>
                            <p>🔵</p>
                            <img src={empleado.avatar} className='rounded-circle' width={60} alt={empleado.nombres} />
                            <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                            <p>10/10/2024  10/11/2024</p>
                            <p>Vacaciones</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SolicitudesAdmin;
