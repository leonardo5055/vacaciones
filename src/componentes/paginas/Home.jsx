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
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                        <option selected></option>
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
                            <option value="3">22</option>
                            <option value="1">23</option>
                            <option value="2">24</option>
                            <option value="3">25</option>
                            <option value="1">26</option>
                            <option value="2">27</option>
                            <option value="3">28</option>
                            <option value="2">29</option>
                            <option value="3">30</option>
                            <option value="3">31</option>
                        </select>
                        <p className='text-light'>Cuantos días de vacaciones se va a tomar?</p>
                        <select className="form-select form-select-lg mb-3" aria-label="Large select example">
                        <option selected></option>
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
                        <option selected></option>
                            <option value="1">Vacaciones</option>
                            <option value="2">Enfermedad</option>
                            <option value="2">Licencia</option>
                        </select>
                        <p className='text-light'>Detalles:</p>
                        <input type="text" className='form-control mb-3' />
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
