import React from 'react';
import "./estilos/home.css";
import Calendario from "../../imagenes/calendario.png";
import CalendarioI from "../../imagenes/calendarioIMG.png";

function Home() {
    return (
        <body>
            <div className='container d-flex justify-content-between align-items-center text-light m-5'>
                <div>
                    <h2>Dias de vacaciones:</h2>
                    <div>
                        <img src={Calendario} width="32"></img>
                        <p>Desde: 2/9/2024</p>
                        <img src={Calendario} width="32"></img>
                        <p>Hasta: 12/9/2024</p>
                    </div>
                </div>
                <div>
                    <p>Total de dias tomados:</p>
                    <p>11</p>
                </div>
                <div>
                    <p>Dias sobrantes:</p>
                    <p>17</p>
                </div>
                <button className='boton btn text-light rounded-5 p-3'>Tomar vacaciones</button>
            </div>
            <img src={CalendarioI} ></img>
        </body>
    )
}

export default Home
