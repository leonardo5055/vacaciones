import React, { useState, useEffect } from 'react';

function CrearUsuarios() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento: '',
        fechaContratacion: '',
        telefono: '',
        cargo: '',
        rol: '',
        email: '',
        contraseña: '',
        confirmarContraseña: ''
    });

    const [errors, setErrors] = useState({});
    const [cargos, setCargos] = useState([]);

    // Manejar el cambio de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validación del formulario
    const validateForm = () => {
        let tempErrors = {};
        if (!formData.nombre) tempErrors.nombre = "El nombre es obligatorio";
        if (!formData.apellido) tempErrors.apellido = "El apellido es obligatorio";
        if (!formData.fechaNacimiento) tempErrors.fechaNacimiento = "La fecha de nacimiento es obligatoria";
        if (!formData.fechaContratacion) tempErrors.fechaContratacion = "La fecha de contratación es obligatoria";
        if (!formData.telefono || formData.telefono.length < 10) tempErrors.telefono = "El teléfono debe tener al menos 10 caracteres";
        if (!formData.cargo) tempErrors.cargo = "El cargo es obligatorio";
        if (!formData.rol) tempErrors.rol = "El rol es obligatorio";
        if (!formData.email) tempErrors.email = "El correo electrónico es obligatorio";
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo electrónico no es válido";
        if (!formData.contraseña) tempErrors.contraseña = "La contraseña es obligatoria";
        if (formData.contraseña !== formData.confirmarContraseña) tempErrors.confirmarContraseña = "Las contraseñas no coinciden";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {

            // Hacer la solicitud POST
            fetch("https://gestiondevacaciones-api-production.up.railway.app/api/empleados", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Error al crear el usuario.");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Usuario creado exitosamente:", data);
                    // Limpiar el formulario o mostrar un mensaje de éxito si es necesario
                    setFormData({
                        nombre: '',
                        apellido: '',
                        fechaNacimiento: '',
                        fechaContratacion: '',
                        telefono: '',
                        cargo: '',
                        rol: '',
                        email: '',
                        contraseña: '',
                        confirmarContraseña: ''
                    });
                    setErrors({});
                })
                .catch((error) => {
                    alert("Error en la creación del usuario y Empleado:", error);
                    setErrors({ apiError: "Error en la creación del usuario. Intente nuevamente." });
                });
        }
    };



    // Obtener cargos desde la API
    useEffect(() => {
        fetch("https://gestiondevacaciones-api-production.up.railway.app/api/cargo")
            .then((response) => response.json())
            .then((data) => {
                setCargos(data);  // Asignar los cargos a los datos obtenidos
            })
            .catch((error) => {
                console.error("Error al cargar los cargos:", error);
            });
    }, []);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <form className='w-50 text-light' onSubmit={handleSubmit}>
                <h1 className='text-center text-decoration-underline mb-4'>Crear usuarios</h1>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control text-light bg-transparent ${errors.nombre ? 'is-invalid' : ''}`}
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <label>Nombre</label>
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control text-light bg-transparent ${errors.apellido ? 'is-invalid' : ''}`}
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                    />
                    <label>Apellido</label>
                    {errors.apellido && <div className="invalid-feedback">{errors.apellido}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className={`form-control text-light bg-transparent ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                    />
                    <label>Fecha de nacimiento</label>
                    {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className={`form-control bg-transparent text-light ${errors.fechaContratacion ? 'is-invalid' : ''}`}
                        name="fechaContratacion"
                        value={formData.fechaContratacion}
                        onChange={handleChange}
                    />
                    <label>Fecha de contratación</label>
                    {errors.fechaContratacion && <div className="invalid-feedback">{errors.fechaContratacion}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className={`form-control bg-transparent text-light ${errors.telefono ? 'is-invalid' : ''}`}
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                    <label>Teléfono</label>
                    {errors.telefono && <div className="invalid-feedback">{errors.telefono}</div>}
                </div>

                <div className="form-floating mb-3">
                    <select
                        className={`form-select bg-transparent text-light ${errors.cargo ? 'is-invalid' : ''}`}
                        name="cargo"
                        value={formData.cargo}
                        onChange={handleChange}
                    >
                        <option className="text-dark" value="" disabled>Seleccionar Cargo</option>
                        {cargos.map((cargo) => (
                            <option className="text-dark" key={cargo.cargo_id} value={cargo.cargo_id}>
                                {cargo.cargo}
                            </option>
                        ))}
                    </select>
                    <label>Cargo</label>
                    {errors.cargo && <div className="invalid-feedback">{errors.cargo}</div>}
                </div>
                <div className="form-floating mb-3">
                    <select
                        className={`form-select bg-transparent text-light ${errors.rol ? 'is-invalid' : ''}`}
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                    >
                        <option className="text-dark" value="" disabled>Seleccionar Rol</option>
                        <option className="text-dark" value="Empleado">Empleado</option>
                        <option className="text-dark" value="Recursos Humanos">Recursos Humanos</option>
                    </select>
                    <label>Rol</label>
                    {errors.rol && <div className="invalid-feedback">{errors.rol}</div>}
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className={`form-control text-light bg-transparent ${errors.email ? 'is-invalid' : ''}`}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <label>Email</label>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={`form-control bg-transparent text-light ${errors.contraseña ? 'is-invalid' : ''}`}
                        name="contraseña"
                        value={formData.contraseña}
                        onChange={handleChange}
                    />
                    <label>Contraseña</label>
                    {errors.contraseña && <div className="invalid-feedback">{errors.contraseña}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={`form-control bg-transparent text-light ${errors.confirmarContraseña ? 'is-invalid' : ''}`}
                        name="confirmarContraseña"
                        value={formData.confirmarContraseña}
                        onChange={handleChange}
                    />
                    <label>Confirmar Contraseña</label>
                    {errors.confirmarContraseña && <div className="invalid-feedback">{errors.confirmarContraseña}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
        </div>
    );
}

export default CrearUsuarios;
