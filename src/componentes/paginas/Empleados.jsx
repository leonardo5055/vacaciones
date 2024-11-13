import React, { useEffect, useState } from 'react';
import Cargando from '../Cargando/Cargando';

const avatarEmpleado = require.context('../../img/avatar', true);

function Empleados() {
    const [empleados, setEmpleados] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://gestiondevacaciones-api-production.up.railway.app/api/empleados")
            .then(response => response.json())
            .then(data => {
                setEmpleados(data);
                setLoading(false);
            })
            .catch(error => {
                alert("Error al obtener los empleados:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <Cargando />;
    }

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Lista de Empleados</h2>
            <div className="row">
                {empleados.map((empleado) => (
                    <div key={empleado.empleado_id} className="col-md-4 mb-3">
                        <div className="card text-light bg-dark shadow">
                            <div className="card-body">
                                <h5 className="card-title">{empleado.nombres} {empleado.apellidos}</h5>
                                <img className='rounded-pill' width={"150px"} src={avatarEmpleado(`./${empleado.avatar}`)} alt={`${empleado.nombres} ${empleado.apellidos}`} />
                                <p className="card-text"><strong>Email:</strong> {empleado.email}</p>
                                <p className="card-text"><strong>Rol:</strong> {empleado.rol}</p>
                                <p className="card-text"><strong>Fecha de nacimiento:</strong> {empleado.fecha_nacimiento}</p>
                                <p className="card-text"><strong>Fecha de contratación:</strong> {empleado.fecha_contratacion}</p>
                                <p className="card-text"><strong>Teléfono:</strong> {empleado.celular}</p>
                                <p className="card-text"><strong>Cargo:</strong> {empleado.cargo_id}</p>
                                <p className="card-text"><strong>Días de vacaciones acumulados:</strong> {empleado.dias_vacaciones_acumulados}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Empleados;
