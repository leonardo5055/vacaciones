import React from 'react'
import Si from '../../img/si.png'
import No from '../../img/no.png'

function SolicitudesAdmin() {
    let empleado = JSON.parse(localStorage.getItem('EmpleadoInfo'));
    console.log(empleado)

    const mostrarDivAmarillo = () => {
        const divAmarillo = document.querySelector('.caja-amarillaa');
        if (divAmarillo) {
            divAmarillo.style.display = 'block';
        }
    };
    return (
        <div className='d-flex justify-content-center gap-5 mt-5'>
            <div className='caja-negra text-light text-center fs-4'>
                <h2 className='mt-3'>Solicitudes pendientes</h2>
                <hr />
                <div className='d-flex' onClick={mostrarDivAmarillo}>
                    <div className='caja-amarillaa' style={{ display: 'none' }}>ㅤ</div>
                    <div className='d-flex align-items-center'>
                        <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                        <div>
                            <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                            <p>10/10/2024 - 10/11/2024</p>
                            <p> 🔵 Vacaciones</p>
                        </div>
                        <div className='gap-3'>
                            <button className='btn'><img src={Si} width={30} alt="" /></button>
                            <button className='btn'><img src={No} width={30} alt="" /></button>
                        </div>
                    </div>
                </div>
                <hr />
                <div className='d-flex align-items-center'>
                    <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                    <div>
                        <p className='m-3'>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p> 🔵 Vacaciones</p>
                    </div>
                    <div className='gap-3'>
                        <button className='btn'><img src={Si} width={30} alt="" /></button>
                        <button className='btn'><img src={No} width={30} alt="" /></button>
                    </div>
                </div>
                <hr />
                <div className='d-flex align-items-center'>
                    <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                    <div >
                        <p className='m-3'>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p> 🔵 Vacaciones</p>
                    </div>
                    <div className='gap-3'>
                        <button className='btn'><img src={Si} width={30} alt="" /></button>
                        <button className='btn'><img src={No} width={30} alt="" /></button>
                    </div>
                </div>
                <hr />
                <div className='d-flex align-items-center'>
                    <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                    <div>
                        <p className='m-3'>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p> 🔵 Vacaciones</p>
                    </div>
                    <div className='gap-3'>
                        <button className='btn'><img src={Si} width={30} alt="" /></button>
                        <button className='btn'><img src={No} width={30} alt="" /></button>
                    </div>
                </div>
                <hr />
            </div>
            <div className='caja-negra w-50 text-light fs-4'>
                <div className='d-flex align-items-center m-3'>
                    <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                    <div className='d-flex flex-column'>
                        <p className='m-3'>Nombre: {empleado.nombres} {empleado.apellidos}</p>
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
                            <p className='caja-rojaa rounded-top'>noviembre</p>
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
                    <p>Descripcion:</p>
                    <p> 🔵 Vacaciones</p>
                </div>
                <hr />
                <p className='text-light m-3'>¿Quién mas va estar ausente?</p>
                <div>
                    <div className='d-flex justify-content-around align-items-center borde-blanco m-3'>
                        <p>🔵</p>
                        <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                        <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p>Vacaciones</p>
                    </div>
                    <div className='d-flex justify-content-around align-items-center borde-blanco m-3'>
                        <p>🔵</p>
                        <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                        <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p>Vacaciones</p>
                    </div>
                    <div className='d-flex justify-content-around align-items-center borde-blanco m-3'>
                        <p>🔵</p>
                        <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                        <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p>Vacaciones</p>
                    </div>
                    <div className='d-flex justify-content-around align-items-center borde-blanco m-3'>
                        <p>🔵</p>
                        <img src={empleado.avatar} className='rounded-circle' width={60} alt="" />
                        <p>Nombre: {empleado.nombres} {empleado.apellidos}</p>
                        <p>10/10/2024 - 10/11/2024</p>
                        <p>Vacaciones</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SolicitudesAdmin
