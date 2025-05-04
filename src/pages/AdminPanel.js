import React from 'react';
import { useState } from 'react';
import FormularioCandidato from '../FormularioCandidato';
import FormularioVotante from '../FormularioVotante';
import FormularioOrganizacion from '../FormularioOrganizacion';
import EditarVotantesOrganizacion from '../EditarVotantesOrganizacion';
import FormularioProcesoVotacion from '../FormularioProcesoVotacion';


/*$env:NODE_OPTIONS="--openssl-legacy-provider"*/


function AdminPanel({ organizaciones, setOrganizaciones, candidatos, setCandidatos, votantes, setVotantes }) {
  
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [mostrarProcesos, setMostrarProcesos] = useState(false);
  const [mostrarCandidatos, setMostrarCandidatos] = useState(false);
  const [mostrarVotantesFinales,setMostrarVotantesFinales] = useState(false);
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState('');
  const [votantesFinales, setVotantesFinales] = useState([
  ]);
  const [mostrarorganizaciones, setMostrarorganizaciones] = useState(false);
  const [modoCandidato, setModoCandidato] = useState(null); 
  const [modoProceso, setModoProceso] = useState(null);
  const [candidatoEditando, setCandidatoEditando] = useState(null);
  const [esperandoConfirmacion, setEsperandoConfirmacion] = useState(null); 
  const [inputPassword, setInputPassword] = useState('');
  const [modoOrganizacion, setModoOrganizacion] = useState(null);
  const [organizacionEditando, setOrganizacionEditando] = useState(null);
  const [modoVotante, setModoVotante] = useState(false);
  
  const [procesos, setProcesos] = useState([
    {
      nombre: 'Proceso de Elecciones 2025',
      sector: 'Educación',
      descripcion: 'Elecciones para elegir representantes estudiantiles.',
    },
    {
      nombre: 'Proceso de Elecciones 2026',
      sector: 'Salud',
      descripcion: 'Elecciones para elegir representantes de salud.',
    }
  ]);
  const [creandoProceso, setCreandoProceso] = useState(false);
  
// Función para crear proceso
const crearProceso = (nuevo) => {
  setProcesos([...procesos, nuevo]);
  setCreandoProceso(false);
  alert('Proceso de votación creado exitosamente');
};

const [campañas, setCampañas] = useState([
  {
    nombre: 'Directiva Tecnología 2025',
    miembros: [
      { puesto: 'Presidente', correo: 'usado1@x.com' },
    ]
  }
]);
  
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
    setOrganizaciones([...organizaciones, nueva]);
    alert('Organización registrada con éxito');
    setTipoSeleccionado(null);
  };  
  
  return (
    
    <div style={{ padding: '0rem',display: "flex", flexDirection: 'column' , alignItems: 'center',fontFamily: 'Bebas Neue',fontSize:"2.5rem", textAlign: 'center',gap: '1rem'  }}>
      {!modoVotante && (
        <>
      <h1>ADMIN</h1>
             

      {!tipoSeleccionado && (
 
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        
          {/* Columna: Proceso de Votación */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                setTipoSeleccionado('ProcesoVotacion');
                setMostrarCandidatos(false);
                setMostrarProcesos(false);
                setMostrarorganizaciones(false);
                setModoCandidato(null);
                setModoOrganizacion(null);
                setModoProceso(true);
              }}             
              style={{
                width: '400px',
                height: '400px',
                backgroundColor: 'orange',
                color: 'white',
                padding: '9rem 5rem',
                fontFamily: 'Bebas Neue',
                fontSize: '4rem',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              PROCESO DE VOTACIÓN
            </button>

            <button
              onClick={() => setMostrarProcesos(!mostrarProcesos)}
              style={{
                backgroundColor: '#fff',
                color: 'orange',
                border: '2px solid orange',
                padding: '0.5rem 2rem',
                fontFamily: 'Bebas Neue',
                fontSize: '2rem',
                borderRadius: '10px',
                cursor: 'pointer'
              }}
            >
              {mostrarProcesos ? 'OCULTAR PROCESOS' : 'VER PROCESOS'}
            </button>
          </div>
                 
          

          {/* COLUMNA CANDIDATO */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => {
                setMostrarCandidatos(false);
                setMostrarorganizaciones(false);
                setTipoSeleccionado(null);
                setModoCandidato(prev => prev === 'menu' ? null : 'menu');
                setEsperandoConfirmacion(null);
                setInputPassword('');
              }}
              style={{
                width: '400px',
                height: '400px',
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
        {/* Columna: Organización */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              setTipoSeleccionado(null);
              setMostrarCandidatos(false);
              setMostrarorganizaciones(false);
              setModoOrganizacion(prev => prev === 'menu' ? null : 'menu');
              setOrganizacionEditando(null);
            }}
            style={{
              width: '400px',
              height: '400px',
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

          {/* Menú de opciones */}
          {modoOrganizacion === 'menu' && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>
                ¿QUÉ DESEA HACER CON LAS ORGANIZACIONES?
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                <button
                  onClick={() => {
                    setTipoSeleccionado('organizacion');
                    setModoOrganizacion('nuevo');
                    setOrganizacionEditando(null);
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
                  REGISTRAR NUEVA ORGANIZACIÓN
                </button>

                <button
                  onClick={() => setModoOrganizacion('editar')}
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
                  MODIFICAR VOTANTES DE UNA ORGANIZACIÓN
                </button>
              </div>
            </div>
          )}

          {/* Lista para seleccionar organización a modificar */}
          {modoOrganizacion === 'editar' && (
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '1.8rem' }}>
                SELECCIONE LA ORGANIZACIÓN QUE DESEA MODIFICAR:
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
              {organizaciones
                .filter((org) => org.registroVotantes === 'automatica')
                .map((org, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setOrganizacionEditando({ ...org, index: i });
                        setTipoSeleccionado('editarVotantes'); 
                        setModoOrganizacion(null);
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
                      {org.nombre}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botón Ver organizaciones */}
          <button
            onClick={() => {
              setMostrarorganizaciones(!mostrarorganizaciones);
              if (!mostrarorganizaciones) setMostrarVotantesFinales(false);
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

{mostrarVotantesFinales && (
  <div style={{ marginTop: '2rem' }}>
    <h3>Votantes registrados en {organizacionSeleccionada}:</h3>
    {votantesFinales.length === 0 ? (
      <p>No hay votantes registrados.</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {votantesFinales.map((v, i) => (
          <li key={i}>
            {v.nombre} {v.apellido} - Cédula: {v.cedula}
          </li>
        ))}
      </ul>
    )}
  </div>
)}

{mostrarProcesos && (
  <div style={{ marginTop: '2rem', textAlign: 'center', fontFamily: 'Bebas Neue' }}>
    <h2 style={{ fontSize: '2.2rem' }}>Lista de Procesos de Votación</h2>
    {procesos.length === 0 ? (
      <p style={{ fontSize: '1.5rem' }}>No hay procesos registrados aún.</p>
    ) : (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {procesos.map((p, i) => (
          <li key={i} style={{ 
            marginBottom: '1rem', 
            padding: '1rem', 
            border: '1px solid #ccc', 
            borderRadius: '10px', 
            backgroundColor: '#f9f9f9',
            maxWidth: '600px',
            marginInline: 'auto'
          }}>
            <strong>{p.nombre}</strong><br />
            Sector: {p.sector}<br />
            Organización: {p.organizacion || 'No asignada'}<br />
            {p.descripcion && <div>Descripción: {p.descripcion}</div>}
          </li>
        ))}
      </ul>
    )}
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
    campañas={campañas}
    setCampañas={setCampañas}
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

{tipoSeleccionado === 'ProcesoVotacion' && (
  <FormularioProcesoVotacion
    organizaciones={organizaciones}
    onCrear={(nuevoProceso) => {
      setProcesos([...procesos, nuevoProceso]);
      alert('Proceso creado exitosamente');
      setTipoSeleccionado(null);
      setModoProceso(false);
    }}
    onCancelar={() => {
      setTipoSeleccionado(null);
      setModoProceso(false);
    }}
  />
)}

{tipoSeleccionado === 'organizacion' && (
  <FormularioOrganizacion
  onRegistrar={(organizacion) => {
    if (organizacionEditando !== null) {
      const nuevas = [...organizaciones];
      nuevas[organizacionEditando.index] = organizacion;
      setOrganizaciones(nuevas);
    } else {
      setOrganizaciones([...organizaciones, organizacion]);
    }
    alert('Información guardada correctamente');
    setTipoSeleccionado(null);
    setModoOrganizacion(null);
    setOrganizacionEditando(null);
  }}
  organizaciones={organizaciones}
  organizacionEditando={organizacionEditando} 
  onCancelar={() => {
    setTipoSeleccionado(null);
    setModoOrganizacion(null);
    setOrganizacionEditando(null);
  }}
/>

)}

{tipoSeleccionado === 'editarVotantes' && (
  <EditarVotantesOrganizacion
    organizacion={organizacionEditando}
    onGuardar={(orgActualizada) => {
      const nuevasOrganizaciones = organizaciones.map((org) => 
        org.nombre === organizacionEditando.nombre ? orgActualizada : org
      );
      setOrganizaciones(nuevasOrganizaciones);
      alert('Organización actualizada exitosamente');
      setTipoSeleccionado(null);
      setOrganizacionEditando(null);
    }}    
    onCancelar={() => {
      setTipoSeleccionado(null);
      setOrganizacionEditando(null);
    }}
  />
)}
</>
)}

  </div>
);
}

export default AdminPanel;