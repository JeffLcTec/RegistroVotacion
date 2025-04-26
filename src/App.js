import React from 'react';
import { useState } from 'react';
import FormularioCandidato from './FormularioCandidato';
import FormularioVotante from './FormularioVotante';
import FormularioOrganizacion from './FormularioOrganizacion';


function App() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [candidatos, setCandidatos] = useState([]);
  const [votantes, setVotantes] = useState([]);
  const [mostrarVotantes, setMostrarVotantes] = useState(false);
  const [mostrarCandidatos, setMostrarCandidatos] = useState(false);
  const [mostrarVotantesFinales,setMostrarVotantesFinales] = useState(false);
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState('');
  const [votantesFinales, setVotantesFinales] = useState([
  ]);
  
  const [organizaciones, setorganizaciones] = useState([
    {
      nombre: 'Universidad Técnica Nacional',
      tipo: 'Universidad Pública',
      registroVotantes: 'manual',
      votantes: [{
        nombre: 'Juan Pérez',
        cedula: '101110111',
        codigo: '12345'
      },
      {
        nombre: 'María López',
        cedula: '101110112',
        codigo: '12346'
      },
      {
        nombre: 'Carlos Rodríguez',
        cedula: '101110113',
        codigo: '12347'
      }]
    },
    {
      nombre: 'Colegio Científico de Alajuela',
      tipo: 'Colegio',
      registroVotantes: 'automatica'
    },
    {
      nombre: 'Centro Educativo La Esperanza',
      tipo: 'Escuela Privada',
      registroVotantes: 'manual'
    }
  ]);
  const [mostrarorganizaciones, setMostrarorganizaciones] = useState(false);
  const [modoCandidato, setModoCandidato] = useState(null); 
  const [candidatoEditando, setCandidatoEditando] = useState(null);
  const [esperandoConfirmacion, setEsperandoConfirmacion] = useState(null); 
  const [inputPassword, setInputPassword] = useState('');




  
  const registrarCandidato = (nuevoCandidato) => {
    if (candidatoEditando !== null) {
      const actualizados = [...candidatos];
      actualizados[candidatoEditando.index] = nuevoCandidato;
      setCandidatos(actualizados);
    } else {
      setCandidatos([...candidatos, nuevoCandidato]);
    }

    setTipoSeleccionado(null);
    setModoCandidato(null);
    setCandidatoEditando(null);
  };

  const registrarVotante = (nuevoVotante) => {
    setVotantes([...votantes, nuevoVotante]);
    alert('Votante registrado con éxito');
    setTipoSeleccionado(null);
  };

  const registrarorganizacion = (nueva) => {
    setorganizaciones([...organizaciones, nueva]);
    alert('Organización registrada con éxito');
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
            onClick={() => {setTipoSeleccionado('votante'); setMostrarVotantes(false); setMostrarCandidatos(false);}}
            
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
          {/* COLUMNA CANDIDATO */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                setMostrarCandidatos(false);
                setMostrarVotantes(false);
                setTipoSeleccionado(null);
                setModoCandidato(prev => prev === 'menu' ? null : 'menu');
                setEsperandoConfirmacion(null);
                setInputPassword('');
              }}
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

            {modoCandidato === 'menu' && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>¿QUÉ DESEA HACER?</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <button
                    onClick={() => {
                      setTipoSeleccionado('candidato');
                      setModoCandidato('nuevo');
                      setCandidatoEditando(null);
                    }}
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.6rem',
                      padding: '0.7rem 2rem',
                      border: '2px solid black',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      borderRadius: '8px'
                    }}
                  >
                    REGISTRAR NUEVO CANDIDATO
                  </button>

                  <button
                    onClick={() => setModoCandidato('editar')}
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.6rem',
                      padding: '0.7rem 2rem',
                      border: '2px solid black',
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      borderRadius: '8px'
                    }}
                  >
                    MODIFICAR CANDIDATO EXISTENTE
                  </button>
                </div>
              </div>
            )}

            {modoCandidato === 'editar' && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem' }}>
                  SELECCIONE EL CANDIDATO QUE DESEA MODIFICAR:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {candidatos.map((c, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      <button
                        onClick={() => {
                          setEsperandoConfirmacion({ ...c, index: i });
                          setInputPassword('');
                        }}
                        style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '1.3rem',
                          padding: '0.5rem 1rem',
                          borderRadius: '8px',
                          border: '2px solid black',
                          backgroundColor: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        {c.nombre} {c.apellido}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {esperandoConfirmacion && (
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <h4 style={{ fontFamily: 'Bebas Neue', fontSize: '1.5rem' }}>
                  INGRESE LA CONTRASEÑA DE <br /> {esperandoConfirmacion.nombre} {esperandoConfirmacion.apellido}
                </h4>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '1.2rem',
                    padding: '0.5rem',
                    margin: '0.5rem',
                    borderRadius: '6px'
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      if (inputPassword === esperandoConfirmacion.contraseña) {
                        setCandidatoEditando(esperandoConfirmacion);
                        setTipoSeleccionado('candidato');
                        setModoCandidato('modificando');
                        setEsperandoConfirmacion(null);
                        setInputPassword('');
                      } else {
                        alert('Contraseña incorrecta');
                      }
                    }}
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.3rem',
                      padding: '0.4rem 1.2rem',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    CONFIRMAR
                  </button>
                </div>
              </div>
            )}
          </div>
        {/* Columna: Institución */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => {
            setTipoSeleccionado('organizacion');
            setMostrarCandidatos(false);
            setMostrarVotantes(false);
            setMostrarorganizaciones(false);
          }}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '9rem 4rem',
            fontFamily: 'Bebas Neue',
            fontSize: '4rem',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer'
          }}
        >
          Organización
        </button>
        <button
          onClick={() => {setMostrarorganizaciones(!mostrarorganizaciones); 
          if (!mostrarorganizaciones) {
            // Si estamos ocultando las organizaciones, también ocultamos la lista de votantes finales
            setMostrarVotantesFinales(false);
          }
        }}
          style={{
            backgroundColor: '#fff',
            color: 'green',
            border: '2px solid green',
            padding: '0.5rem 2rem',
            fontFamily: 'Bebas Neue',
            fontSize: '2rem',
            borderRadius: '10px',
            cursor: 'pointer'
          }}
        >
          {mostrarorganizaciones ? 'Ocultar organizaciones' : 'Ver organizaciones'}
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

{mostrarorganizaciones && (
  <div style={{ marginTop: '2rem' }}>
    <h2>Lista de organizaciones</h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {organizaciones.map((inst, i) => (
        <li key={i} style={{ marginBottom: '1rem' }}>
          {inst.nombre} - Registro: {inst.registroVotantes}
          <button 
            style={{ marginLeft: '1rem', fontSize: '17px', borderRadius: '5px' }}
            onClick={() => {
              setVotantesFinales(inst.votantes || []); // Asumiendo que cada organización tiene una lista de votantes
              setMostrarVotantesFinales(true);
              setOrganizacionSeleccionada(inst.nombre);
            }}
          >
            Ver Votantes Registrados
          </button>
        </li>
      ))}
    </ul>
  </div>
)}
{mostrarorganizaciones && mostrarVotantesFinales && (
  <div style={{ marginTop: '2rem' }}>
    <h2>Lista de Votantes Registrados de {organizacionSeleccionada} </h2>
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {votantesFinales.map((v, i) => (
        <li key={i}>{v.nombre} {v.apellido} - Cédula: {v.cedula} - Codigo: {v.codigo} </li>
        
      ))}
      
    </ul>
  </div>
   
)}


{tipoSeleccionado === 'candidato' && (
  <FormularioCandidato
    onRegistrar={(candidato) => {
      if (candidatoEditando !== null) {
        const nuevos = [...candidatos];
        nuevos[candidatoEditando.index] = candidato;
        setCandidatos(nuevos);
      } else {
        setCandidatos([...candidatos, candidato]);
      }
      alert('Información guardada correctamente');
      setTipoSeleccionado(null);
      setModoCandidato(null);
      setCandidatoEditando(null);
    }}
    candidatos={candidatos}
    candidatoEditando={candidatoEditando}
    organizaciones={organizaciones}
    onCancelar={() => {
      setTipoSeleccionado(null);
      setModoCandidato(null);
      setCandidatoEditando(null);
      setEsperandoConfirmacion(null);
      setInputPassword('');
    }}
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

{tipoSeleccionado === 'organizacion' && (
  <FormularioOrganizacion
    onRegistrar={registrarorganizacion}
    organizaciones={organizaciones}
    onCancelar={() => setTipoSeleccionado(null)}
  />
)}



    </div>
  );
}

export default App;