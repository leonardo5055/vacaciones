import React, { useState, useEffect } from 'react';

function CrearUsuarios() {
    // Estado para los campos del formulario
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        fecha_contratacion: '',
        celular: '',
        cargo_id: '',
        rol: '',
        email: '',
        password: '',
        confirmarpassword: ''
    });

    const [errors, setErrors] = useState({});
    const [cargos, setcargos] = useState([]);

    // Manejar el cambio de input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validación del formulario
    const validateForm = () => {
        let tempErrors = {};
        if (!formData.nombres) tempErrors.nombres = "El nombres es obligatorio";
        if (!formData.apellidos) tempErrors.apellidos = "El apellidos es obligatorio";
        if (!formData.fecha_nacimiento) tempErrors.fecha_nacimiento = "La fecha de nacimiento es obligatoria";
        if (!formData.fecha_contratacion) tempErrors.fecha_contratacion = "La fecha de contratación es obligatoria";
        if (!formData.celular || formData.celular.length < 10) tempErrors.celular = "El teléfono debe tener al menos 10 caracteres";
        if (!formData.cargo_id) tempErrors.cargo_id = "El cargo_id es obligatorio";
        if (!formData.rol) tempErrors.rol = "El rol es obligatorio";
        if (!formData.email) tempErrors.email = "El correo electrónico es obligatorio";
        if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "El correo electrónico no es válido";
        if (!formData.password) tempErrors.password = "La password es obligatoria";
        if (formData.password !== formData.confirmarpassword) tempErrors.confirmarpassword = "Las passwords no coinciden";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    // Manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log(formData)
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
                        nombres: '',
                        apellidos: '',
                        fecha_nacimiento: '',
                        fecha_contratacion: '',
                        celular: '',
                        cargo_id: '',
                        rol: '',
                        email: '',
                        password: '',
                        confirmarpassword: ''
                    });
                    setErrors({});
                })
                .catch((error) => {
                    alert("Error en la creación del usuario y Empleado:", error);
                    setErrors({ apiError: "Error en la creación del usuario. Intente nuevamente." });
                });
        }
    };



    // Obtener cargo_ids desde la API
    useEffect(() => {
        fetch("https://gestiondevacaciones-api-production.up.railway.app/api/cargo")
            .then((response) => response.json())
            .then((data) => {
                setcargos(data);  // Asignar los cargo_ids a los datos obtenidos
            })
            .catch((error) => {
                console.error("Error al cargar los cargo_ids:", error);
            });
    }, []);

    return (
        <div className='d-flex flex-column justify-content-center align-items-center my-5'>
            <form className='w-50 text-light' onSubmit={handleSubmit}>
                <h1 className='text-center text-decoration-underline mb-4'>Crear usuarios</h1>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control text-light bg-transparent ${errors.nombres ? 'is-invalid' : ''}`}
                        name="nombres"
                        value={formData.nombres}
                        onChange={handleChange}
                    />
                    <label>nombres</label>
                    {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={`form-control text-light bg-transparent ${errors.apellidos ? 'is-invalid' : ''}`}
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                    />
                    <label>apellidos</label>
                    {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className={`form-control text-light bg-transparent ${errors.fecha_nacimiento ? 'is-invalid' : ''}`}
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                    />
                    <label>Fecha de nacimiento</label>
                    {errors.fecha_nacimiento && <div className="invalid-feedback">{errors.fecha_nacimiento}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="date"
                        className={`form-control bg-transparent text-light ${errors.fecha_contratacion ? 'is-invalid' : ''}`}
                        name="fecha_contratacion"
                        value={formData.fecha_contratacion}
                        onChange={handleChange}
                    />
                    <label>Fecha de contratación</label>
                    {errors.fecha_contratacion && <div className="invalid-feedback">{errors.fecha_contratacion}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="number"
                        className={`form-control bg-transparent text-light ${errors.celular ? 'is-invalid' : ''}`}
                        name="celular"
                        value={formData.celular}
                        onChange={handleChange}
                    />
                    <label>Teléfono Celular</label>
                    {errors.celular && <div className="invalid-feedback">{errors.celular}</div>}
                </div>

                <div className="form-floating mb-3">
                    <select
                        className={`form-select bg-transparent text-light ${errors.cargo_id ? 'is-invalid' : ''}`}
                        name="cargo_id"
                        value={formData.cargo_id}
                        onChange={handleChange}
                    >
                        <option className="text-dark" value="">Seleccionar Cargo</option>
                        {cargos.map((cargo) => (
                            <option className="text-dark" key={cargo.cargo_id} value={cargo.cargo_id}>
                                {cargo.cargo}
                            </option>
                        ))}
                    </select>
                    <label>Cargo</label>
                    {errors.cargo_id && <div className="invalid-feedback">{errors.cargo_id}</div>}
                </div>
                <div className="form-floating mb-3">
                    <select
                        className={`form-select bg-transparent text-light ${errors.rol ? 'is-invalid' : ''}`}
                        name="rol"
                        value={formData.rol}
                        onChange={handleChange}
                    >
                        <option className="text-dark" value="" disabled>Seleccionar rol</option>
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
                        className={`form-control bg-transparent text-light ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label>Contraseña</label>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={`form-control bg-transparent text-light ${errors.confirmarpassword ? 'is-invalid' : ''}`}
                        name="confirmarpassword"
                        value={formData.confirmarpassword}
                        onChange={handleChange}
                    />
                    <label>Confirmar password</label>
                    {errors.confirmarpassword && <div className="invalid-feedback">{errors.confirmarpassword}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
        </div>
    );
}

export default CrearUsuarios;
