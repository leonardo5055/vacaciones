import React from 'react';

// Componente de Botón
function Boton({ tipo, texto, tamanio, onClick}) {
  return (
    <button
      className={`btn px-4 py-2 rounded-pill text-light border-0 w-${tamanio} btn-${tipo} mt-3 me-3`}
      onClick={onClick}
    >
      {texto}
    </button>
  );
}

export default Boton;