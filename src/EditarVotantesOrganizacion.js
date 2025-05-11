import React, { useState } from 'react';

function EditarVotantesOrganizacion({ organizacion, onGuardar, onCancelar }) {
  const [votantes, setVotantes] = useState(organizacion.votantes || []);
  const [nuevaCedula, setNuevaCedula] = useState('');

  const agregarVotante = () => {
    if (!nuevaCedula.trim()) {
      alert('Debe ingresar una cédula.');
      return;
    }
    const nuevo = { cedula: nuevaCedula.trim() };
    setVotantes([...votantes, nuevo]);
    setNuevaCedula('');
  };

  const eliminarVotante = (index) => {
    const nuevos = [...votantes];
    nuevos.splice(index, 1);
    setVotantes(nuevos);
  };

  const guardarCambios = () => {
    const nuevaOrganizacion = { ...organizacion, votantes };
    onGuardar(nuevaOrganizacion);
  };

  return (
    <div style={{ fontFamily: 'Bebas Neue', padding: '2rem' }}>
      <h2>Editar Votantes - {organizacion.nombre}</h2>

      <div>
        <input
          type="text"
          placeholder="Cédula"
          value={nuevaCedula}
          onChange={(e) => setNuevaCedula(e.target.value)}
          style={{ margin: '0.5rem', fontSize: '18px' }}
        />
        <button onClick={agregarVotante} style={{ fontSize: '16px' }}>
          Agregar Votante
        </button>
      </div>

      <ul style={{ fontSize: '20px' }}>
        {votantes.map((v, i) => (
          <li key={i}>
            Cédula: {v.cedula}
            <button
              onClick={() => eliminarVotante(i)}
              style={{ marginLeft: '1rem', fontSize: '16px' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <button onClick={guardarCambios} style={{ fontSize: '18px', marginTop: '1rem' }}>
        Guardar Cambios
      </button>
      <button onClick={onCancelar} style={{ fontSize: '18px', marginLeft: '1rem' }}>
        Cancelar
      </button>
    </div>
  );
}

export default EditarVotantesOrganizacion;
