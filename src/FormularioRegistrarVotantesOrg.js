import React, { useState } from 'react';

function FormularioRegistrarVotantesOrg({ onRegistrar, onCancelar }) {
  const [cedula, setCedula] = useState('');
  const [listaVotantes, setListaVotantes] = useState([]);
  const [registroFinalizado, setRegistroFinalizado] = useState(false);

  const agregarVotante = () => {
    if (!cedula.trim()) {
      alert('Debe ingresar una cédula.');
      return;
    }
    setListaVotantes(prev => [...prev, { cedula: cedula.trim() }]);
    setCedula('');
  };

  const finalizarRegistro = () => {
    if (listaVotantes.length === 0) {
      alert('No has agregado ningún votante.');
      return;
    }
    setRegistroFinalizado(true);
    if (onRegistrar) onRegistrar(listaVotantes);
  };

  return (
    <div style={{ fontFamily: 'Bebas Neue', padding: '1rem' }}>
      {!registroFinalizado ? (
        <>
          <h2>Agregar Votante (solo cédula)</h2>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            style={{ margin: '0.5rem', fontSize: '20px' }}
          />

          <div>
            <button type="button" onClick={agregarVotante} style={{ margin: '0.5rem', fontSize: '15px' }}>
              Agregar Votante
            </button>
            <button type="button" onClick={finalizarRegistro} style={{ margin: '0.5rem', fontSize: '15px' }}>
              Finalizar Registro
            </button>
            <button type="button" onClick={onCancelar} style={{ margin: '0.5rem', fontSize: '15px' }}>
              Cancelar
            </button>
          </div>

          {listaVotantes.length > 0 && (
            <div>
              <h3 style={{ fontSize: '25px' }}>Votantes Agregados</h3>
              <ul style={{ fontSize: '25px' }}>
                {listaVotantes.map((v, i) => (
                  <li key={i}>Cédula: {v.cedula}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          <h2>Registro Finalizado</h2>
          <ul>
            {listaVotantes.map((v, i) => (
              <li key={i}>Cédula: {v.cedula}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default FormularioRegistrarVotantesOrg;
