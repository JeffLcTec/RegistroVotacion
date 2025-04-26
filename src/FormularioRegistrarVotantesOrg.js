import React, { useState } from 'react';

function FormularioRegistrarVotantesOrg({ onRegistrar, onCancelar }) {
  const [votanteActual, setVotanteActual] = useState({
    nombre: '',
    cedula: '',
    correo: ''
  });

  const [listaVotantes, setListaVotantes] = useState([]);
  const [registroFinalizado, setRegistroFinalizado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVotanteActual((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const agregarVotante = () => {
    if (votanteActual.nombre && votanteActual.cedula ) {
    const codigoVotante = Math.floor(10000 + Math.random() * 90000).toString();

    const nuevoVotante = {
      ...votanteActual,
      codigo: codigoVotante
    };
      setListaVotantes((prev) => [...prev, nuevoVotante]);
      setVotanteActual({ nombre: '', cedula: '' }); // Limpiar campos
    } else {
      alert('Por favor, completa todos los campos antes de agregar un votante.');
    }
  };
  
  const finalizarRegistro = () => {
    if (listaVotantes.length === 0) {
      alert('No has agregado ningún votante.');
      return;
    }
    setRegistroFinalizado(true);
    if (onRegistrar) onRegistrar(listaVotantes); // pasar los votantes a quien llame este form
  };

  return (
    <div style={{ fontFamily: 'Bebas Neue', padding: '1rem' }}>
      {!registroFinalizado ? (
        <>
          <h2>Agregar Votante</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={votanteActual.nombre}
            onChange={handleChange}
            style={{ margin: '0.5rem', fontSize: '20px'  }}
          />
          <input
            type="text"
            name="cedula"
            placeholder="Cédula"
            value={votanteActual.cedula}
            onChange={handleChange}
            style={{ margin: '0.5rem', fontSize: '20px' }}
          />

          <div>
            <button type="button" onClick={agregarVotante} style={{ margin: '0.5rem' , fontSize: '15px' }}>
              Agregar Votante
            </button>
            <button type="button" onClick={finalizarRegistro} style={{ margin: '0.5rem', fontSize: '15px' }}>
              Finalizar Registro
            </button>
            <button type="button" onClick={onCancelar} style={{ margin: '0.5rem' , fontSize: '15px'}}>
              Cancelar
            </button>
          </div>

          {listaVotantes.length > 0 && (
            <div>
               <h3 style={{ fontSize: '25px' }}>Votantes Agregados</h3>
               <ul style={{ fontSize: '25px' }}>
                {listaVotantes.map((v, i) => (
                  <li key={i}>
                    {v.nombre} - ID: {v.cedula} - Codigo: {v.codigo}
                  </li>
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
              <li key={i}>
                {v.nombre} - ID: {v.cedula} - Codigo: {v.codigo}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default FormularioRegistrarVotantesOrg;
