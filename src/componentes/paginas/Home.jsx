import React from 'react'
import Calendario from '../../img/calendario.png'
import { Link } from 'react-router-dom'

function Home() {
    return (
        <div className="container">
            <h1 className='text-light text-center text-decoration-underline'>Toma tus vacaciones</h1>
            <div className='row justify-content-center'>
                <div className='col-lg-6 col-md-8 col-sm-12'>
                    <form action="">
                        <p className='text-light'>Ingrese el comienzo de sus vacaciones</p>
                        <input type="date" id="fecha_inicio" name="fecha_inicio" class="form-control" />
                        <p className='text-light mt-3'>¿Cuantos días de vacaciones se va a tomar?</p>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Selecciona una opción</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="1">4</option>
                            <option value="2">5</option>
                            <option value="3">6</option>
                            <option value="1">7</option>
                            <option value="2">8</option>
                            <option value="3">9</option>
                            <option value="1">10</option>
                            <option value="2">11</option>
                            <option value="3">12</option>
                            <option value="1">13</option>
                            <option value="2">14</option>
                            <option value="3">15</option>
                            <option value="1">16</option>
                            <option value="2">17</option>
                            <option value="3">18</option>
                            <option value="3">19</option>
                            <option value="1">20</option>
                            <option value="2">21</option>
                        </select>
                        <p className='text-light'>Ingrese el motivo</p>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                            <option selected>Selecciona una opción</option>
                            <option value="1">Vacaciones</option>
                            <option value="2">Enfermedad</option>
                            <option value="2">Licencia</option>
                        </select>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label text-light">Detalle:</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <Link to="/historial"><button className='btn btn-primary px-4 py-2 rounded-pill'>Tomar vacaciones</button></Link>

                    </form>
                </div>
                <div className='col-lg-6 d-none d-lg-block'>
                    <img src={Calendario} alt="" className="img-fluid" />
                </div>
            </div>
        </div>

    )
}

export default Home
