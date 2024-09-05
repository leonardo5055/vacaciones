import React from 'react';
import "./estilos/home.css";
import Calendario from "../../imagenes/calendario.png";
import CalendarioI from "../../imagenes/calendarioIMG.png";

function Home() {
    return (
        <main className='d-flex flex-column align-items-center'>
            <div className='d-flex justify-content-between align-items-center text-light my-5 caja gap-5 p-4 rounded'>
                <div>
                    <h2>Dias de vacaciones:</h2>
                    <div >
                        <div className='d-flex align-items-center gap-2 mb-3'>
                            <img src={Calendario} width="32"></img>
                            <p>Desde: 2/9/2024</p>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <img src={Calendario} width="32"></img>
                            <p>Hasta: 12/9/2024</p>
                        </div>
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <p>Total de dias tomados:</p>
                    <p>11</p>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <p>Dias sobrantes:</p>
                    <p>17</p>
                </div>
                <button className='boton btn text-light rounded-5 p-3'>Tomar vacaciones</button>
            </div>
            <img src={CalendarioI}></img>
        </main>
    )
}

export default Home
