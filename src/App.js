import { useState } from 'react';
import FormularioCandidato from './FormularioCandidato';
import FormularioVotante from './FormularioVotante';


function App() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [votantes, setVotantes] = useState([]);
  const [mostrarVotantes, setMostrarVotantes] = useState(false);
  const [mostrarCandidatos, setMostrarCandidatos] = useState(false);
  
  const registrarCandidato = (nuevo) => {
    setCandidatos([...candidatos, nuevo]);
    alert('Candidato registrado con éxito');
    setTipoSeleccionado(null);
  };

  const registrarVotante = (nuevoVotante) => {
    setVotantes([...votantes, nuevoVotante]);
    alert('Votante registrado con éxito');
    setTipoSeleccionado(null);
  };
  
  return (
    <div style={{ padding: '0rem', fontFamily: 'Bebas Neue',fontSize:"2.5rem", textAlign: 'center' }}>
      <h1>Registro</h1>
   

      {!tipoSeleccionado && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>

          {/* Columna: Votante */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setTipoSeleccionado('votante')}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '9rem 6rem',
              fontFamily: 'Bebas Neue',
              fontSize: '4rem',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Votante
          </button>
          <button
            onClick={() => setMostrarVotantes(!mostrarVotantes)}
            style={{
              backgroundColor: '#fff',
              color: 'red',
              border: '2px solid red',
              padding: '0.5rem 2rem',
              fontFamily: 'Bebas Neue',
              fontSize: '2rem',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {mostrarVotantes ? 'Ocultar Votantes' : 'Ver Votantes'}
          </button>
        </div>
          {/* Columna: Candidato */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setTipoSeleccionado('candidato')}
            style={{
              backgroundColor: 'blue',
              color: 'white',
              padding: '9rem 5rem',
              fontFamily: 'Bebas Neue',
              fontSize: '4rem',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Candidato
          </button>
          <button
        onClick={() => setMostrarCandidatos(!mostrarCandidatos)}
        style={{
          backgroundColor: '#fff',
          color: 'blue',
          border: '2px solid blue',
          padding: '0.5rem 2rem',
          fontFamily: 'Bebas Neue',
          fontSize: '2rem',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        {mostrarCandidatos ? 'Ocultar Candidatos' : 'Ver Candidatos'}
      </button>
        </div>
      </div>)} 

   
{mostrarVotantes && (
  <div style={{ marginTop: '2rem' }}>
    <h2>Lista de Votantes</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
  {votantes.map((v, i) => (
        <li key={i}>{v.nombre} {v.apellido} - Cédula: {v.cedula}</li>
      ))}
    </ul>
  
  </div>
)}

{mostrarCandidatos && (
  <div style={{ marginTop: '2rem' }}>
    <h2>Lista de Candidatos</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {candidatos.map((c, i) => (
        <li key={i}>{c.nombre} {c.apellido} - Plan: {c.plan}</li>
      ))}
    </ul>
  </div>
)}

  {tipoSeleccionado === 'candidato' && (
  <FormularioCandidato
    onRegistrar={registrarCandidato}
    candidatos={candidatos}
    onCancelar={() => setTipoSeleccionado(null)}
  />
)}

{tipoSeleccionado === 'votante' && (
  <FormularioVotante
    onRegistrar={registrarVotante}
    votantes={votantes}
    candidatos={candidatos}
    onCancelar={() => setTipoSeleccionado(null)}
  />
)}

    </div>
  );
}

export default App;