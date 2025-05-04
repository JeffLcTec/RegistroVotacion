import React from 'react';
import { useState } from 'react';
import FormularioCandidato from './FormularioCandidato';
import FormularioVotante from './FormularioVotante';
import FormularioOrganizacion from './FormularioOrganizacion';
import EditarVotantesOrganizacion from './EditarVotantesOrganizacion';
import FormularioProcesoVotacion from './FormularioProcesoVotacion';
import AdminPanel from './pages/AdminPanel';

/*$env:NODE_OPTIONS="--openssl-legacy-provider"*/


function App() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [candidatos, setCandidatos] = useState([
    // Universidad Técnica Nacional
    {
      nombre: 'Laura',
      apellido: 'Jiménez',
      correo: 'laura.jimenez@utn.ac.cr',
      contraseña: 'laura123',
      plan: 'Innovación educativa para el futuro.',
      ideas: 'Fortalecer la investigación y los proyectos interdisciplinarios en la UTN.',
      organizacion: 'Universidad Técnica Nacional',
      archivosAdjuntos: []
    },
    {
      nombre: 'Andrés',
      apellido: 'Sánchez',
      correo: 'andres.sanchez@utn.ac.cr',
      contraseña: 'andres123',
      plan: 'Universidad verde y sostenible.',
      ideas: 'Implementar proyectos de energía limpia y huertas urbanas en todos los campus.',
      organizacion: 'Universidad Técnica Nacional',
      archivosAdjuntos: []
    },
  
    // Colegio Científico de Alajuela
    {
      nombre: 'Valeria',
      apellido: 'Castro',
      correo: 'valeria.castro@cca.cr',
      contraseña: 'valeria123',
      plan: 'Más actividades deportivas y culturales.',
      ideas: 'Crear nuevos clubes de arte y tecnología para los estudiantes.',
      organizacion: 'Colegio Científico de Alajuela',
      archivosAdjuntos: []
    },
    {
      nombre: 'Diego',
      apellido: 'Mora',
      correo: 'diego.mora@cca.cr',
      contraseña: 'diego123',
      plan: 'Mejoras en infraestructura educativa.',
      ideas: 'Modernizar los laboratorios de ciencias y tecnología.',
      organizacion: 'Colegio Científico de Alajuela',
      archivosAdjuntos: []
    },
  
    // Centro Educativo La Esperanza
    {
      nombre: 'Fernanda',
      apellido: 'Rojas',
      correo: 'fernanda.rojas@laesperanza.cr',
      contraseña: 'fernanda123',
      plan: 'Educación inclusiva para todos.',
      ideas: 'Desarrollar programas de tutorías para estudiantes con dificultades de aprendizaje.',
      organizacion: 'Centro Educativo La Esperanza',
      archivosAdjuntos: []
    },
    {
      nombre: 'Gabriel',
      apellido: 'Alpízar',
      correo: 'gabriel.alpizar@laesperanza.cr',
      contraseña: 'gabriel123',
      plan: 'Tecnología para el aprendizaje.',
      ideas: 'Implementar tablets y plataformas digitales en todas las clases.',
      organizacion: 'Centro Educativo La Esperanza',
      archivosAdjuntos: []
    }
  ]);
  const [votantes, setVotantes] = useState([]);
  const [mostrarVotantes, setMostrarVotantes] = useState(false);
  const [mostrarProcesos, setMostrarProcesos] = useState(false);
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
      votantes: []
    },
    {
      nombre: 'Colegio Científico de Alajuela',
      tipo: 'Colegio',
      registroVotantes: 'automatica',
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
      nombre: 'Centro Educativo La Esperanza',
      tipo: 'Escuela Privada',
      registroVotantes: 'manual',
      votantes: []
    }
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
  const [organizacionParaVotar, setOrganizacionParaVotar] = useState(null);
  const [cedulaLogin, setCedulaLogin] = useState('');
  const [codigoLogin, setCodigoLogin] = useState('');
  const [votanteLogueado, setVotanteLogueado] = useState(null);
  const [votos, setVotos] = useState([]); 
  const [votoRealizado, setVotoRealizado] = useState(false);

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
    setorganizaciones([...organizaciones, nueva]);
    alert('Organización registrada con éxito');
    setTipoSeleccionado(null);
  };  

  const [rol, setRol] = useState(null);

if (!rol) {
  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'Bebas Neue' }}>
      <h1>Seleccione su rol</h1>
      <button onClick={() => setRol('votante')}
        style={{ margin: '1rem', padding: '1rem 2rem', fontSize: '2rem', backgroundColor: 'red', color: 'white', borderRadius: '10px', border: 'none' }}>
        Votante
      </button>
      <button onClick={() => setRol('admin')}
        style={{ margin: '1rem', padding: '1rem 2rem', fontSize: '2rem', backgroundColor: 'blue', color: 'white', borderRadius: '10px', border: 'none' }}>
        Administrador
      </button>
    </div>
  );
}



  return (
    
    <div style={{ padding: '0rem',display: "flex", flexDirection: 'column' , alignItems: 'center',fontFamily: 'Bebas Neue',fontSize:"2.5rem", textAlign: 'center',gap: '1rem'  }}>
      {!modoVotante && (
        <>
      <h1>Registro</h1>
             {/* Columna: Proceso Votacion */}
    
             <button
            onClick={() => {
              setTipoSeleccionado('ProcesoVotacion')
              setMostrarVotantes(false);
              setMostrarCandidatos(false);
              setMostrarProcesos(false);
              setMostrarorganizaciones(false);
              setModoCandidato(null);
              setModoOrganizacion(null);
              setModoVotante(null); 
              setModoProceso(true);
            }}             
            style={{
              backgroundColor: 'orange',
              color: 'white',
              padding: '2rem 1rem',
              fontFamily: 'Bebas Neue',
              fontSize: '2rem',
              border: 'none',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            Proceso de Votacion
          </button>
          <button
            onClick={() => setMostrarProcesos(!mostrarProcesos)}
            style={{
              backgroundColor: '#fff',
              color: 'orange',
              border: '2px solid orange',
              padding: '0.5rem 2rem',
              fontFamily: 'Bebas Neue',
              fontSize: '1.5rem',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {mostrarProcesos ? 'Ocultar Procesos' : 'Ver Procesos'}
          </button>
          {mostrarProcesos && (
  <div style={{ marginTop: '1rem'}}>
    <h2>Lista de Procesos de Votacion</h2>
    <ul style={{ listStyle: 'none', fontSize: '2rem'  }}>
  {procesos.map((p, i) => (
        <li key={i}>{p.nombre} -Sector: {p.sector} - Descripción: {p.descripcion}</li>
      ))}
    </ul>
  
  </div>
)}

      {!tipoSeleccionado && (
        

 
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
          
          {/* Columna: Votante */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              setTipoSeleccionado(null);
              setMostrarVotantes(false);
              setMostrarCandidatos(false);
              setMostrarorganizaciones(false);
              setModoCandidato(null);
              setModoOrganizacion(null);
              setModoVotante(true); 
            }}             
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '9rem 7rem',
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
                setMostrarorganizaciones(false);
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
        {/* Columna: Organización */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
              setTipoSeleccionado(null);
              setMostrarCandidatos(false);
              setMostrarVotantes(false);
              setMostrarorganizaciones(false);
              setModoOrganizacion(prev => prev === 'menu' ? null : 'menu');
              setOrganizacionEditando(null);
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



{modoVotante && organizacionParaVotar && organizacionParaVotar.registroVotantes === 'manual' && (
  <FormularioVotante
    onRegistrar={(nuevoVotante) => {
      // Registrarlo como nuevo votante en algún array, si querés.
      alert('Registro exitoso. Ahora puede votar.');
      // Aquí podrías pasar a la lista de candidatos...
    }}
    votantes={[]} // Lo podés ajustar si querés guardar los votantes nuevos
    candidatos={candidatos.filter(c => c.organizacion === organizacionParaVotar.nombre)}
    onCancelar={() => {
      setModoVotante(false);
      setOrganizacionParaVotar(null);
    }}
  />
)}

{modoVotante && organizacionParaVotar && organizacionParaVotar.registroVotantes === 'automatica' && !votanteLogueado && (
  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>INICIAR SESIÓN PARA VOTAR</h2>

    <input
      placeholder="Cédula"
      value={cedulaLogin}
      onChange={(e) => setCedulaLogin(e.target.value)}
      style={{ 
        fontFamily: 'Bebas Neue', 
        fontSize: '1.5rem', 
        marginBottom: '1rem', 
        padding: '10px', 
        borderRadius: '8px',
        width: '300px'
      }}
    />
    <br />

    <input
      placeholder="Código de Verificación"
      value={codigoLogin}
      onChange={(e) => setCodigoLogin(e.target.value)}
      style={{ 
        fontFamily: 'Bebas Neue', 
        fontSize: '1.5rem', 
        marginBottom: '1rem', 
        padding: '10px', 
        borderRadius: '8px',
        width: '300px'
      }}
    />
    <br />

    <button
      onClick={() => {
        // Validar campos no vacíos
        if (!cedulaLogin || !codigoLogin) {
          alert('Por favor complete ambos campos');
          return;
        }

        // Depuración: Mostrar valores en consola
        console.log('Buscando votante con:', {
          cedula: cedulaLogin.trim(),
          codigo: codigoLogin.trim(),
          organizacion: organizacionParaVotar.nombre
        });

        // Buscar en todas las organizaciones
        const organizacion = organizaciones.find(
          org => org.nombre === organizacionParaVotar.nombre
        );

        if (!organizacion) {
          alert('Organización no encontrada');
          return;
        }

        console.log('Votantes en organización:', organizacion.votantes);

        const votanteEncontrado = organizacion.votantes.find(
          v => v.cedula.toString() === cedulaLogin.trim() && 
               v.codigo.toString() === codigoLogin.trim()
        );

        console.log('Votante encontrado:', votanteEncontrado);

        if (votanteEncontrado) {
          setVotanteLogueado(votanteEncontrado);
          setCedulaLogin('');
          setCodigoLogin('');
          alert('Ingreso exitoso. Ahora puede votar.');
        } else {
          alert('Cédula o código incorrecto. Por favor intente nuevamente.');
        }
      }}
      style={{
        fontFamily: 'Bebas Neue',
        fontSize: '1.5rem',
        padding: '10px 20px',
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        border: 'none',
        marginRight: '10px',
        marginTop: '10px'
      }}
    >
      Ingresar y Votar
    </button>

    <button
      onClick={() => {
        setModoVotante(false);
        setOrganizacionParaVotar(null);
        setCedulaLogin('');
        setCodigoLogin('');
      }}
      style={{
        fontFamily: 'Bebas Neue',
        fontSize: '1.5rem',
        padding: '10px 20px',
        backgroundColor: 'gray',
        color: 'white',
        borderRadius: '8px',
        cursor: 'pointer',
        border: 'none',
        marginTop: '10px'
      }}
    >
      Cancelar
    </button>
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
    onRegistrar={(organizacion) => {
      if (organizacionEditando !== null) {
        const nuevas = [...organizaciones];
        nuevas[organizacionEditando.index] = organizacion;
        setorganizaciones(nuevas);
      } else {
        setorganizaciones([...organizaciones, organizacion]);
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
      setorganizaciones(nuevasOrganizaciones);
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

{modoVotante && (
      <>
        {!organizacionParaVotar && (
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '3rem' }}>Seleccione una organización para votar</h1>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
              {organizaciones.filter(org => candidatos.some(c => c.organizacion === org.nombre)).map((org, i) => (
                <div key={i} style={{ border: '2px solid black', padding: '1rem', borderRadius: '10px', width: '300px' }}>
                  <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>{org.nombre}</h2>
                  <button
                    onClick={() => setOrganizacionParaVotar(org)}
                    style={{
                      marginTop: '1rem',
                      fontSize: '1.5rem',
                      padding: '10px',
                      borderRadius: '8px',
                      backgroundColor: 'green',
                      color: 'white',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    Votar aquí
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {organizacionParaVotar && organizacionParaVotar.registroVotantes === 'manual' && (
          !votanteLogueado ? (
            <FormularioVotante
              onRegistrar={(nuevoVotante) => {
                const nuevasOrganizaciones = organizaciones.map((org) => {
                  if (org.nombre === organizacionParaVotar.nombre) {
                    return {
                      ...org,
                      votantes: [...org.votantes, nuevoVotante]
                    };
                  }
                  return org;
                });
                setorganizaciones(nuevasOrganizaciones);
                setVotanteLogueado(nuevoVotante);
              }}
              votantes={[]}
              candidatos={candidatos.filter(c => c.organizacion === organizacionParaVotar.nombre)}
              onCancelar={() => {
                setModoVotante(false);
                setOrganizacionParaVotar(null);
              }}
            />
          ) : null 
        )}

        {modoVotante && organizacionParaVotar && organizacionParaVotar.registroVotantes === 'automatica' && !votanteLogueado && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>INICIAR SESIÓN PARA VOTAR</h2>

            <input
              placeholder="Cédula"
              value={cedulaLogin}
              onChange={(e) => setCedulaLogin(e.target.value)}
              style={{ 
                fontFamily: 'Bebas Neue', 
                fontSize: '1.5rem', 
                marginBottom: '1rem', 
                padding: '10px', 
                borderRadius: '8px',
                width: '300px'
              }}
            />
            <br />

            <input
              placeholder="Código de Verificación"
              value={codigoLogin}
              onChange={(e) => setCodigoLogin(e.target.value)}
              style={{ 
                fontFamily: 'Bebas Neue', 
                fontSize: '1.5rem', 
                marginBottom: '1rem', 
                padding: '10px', 
                borderRadius: '8px',
                width: '300px'
              }}
            />
            <br />

            <button
              onClick={() => {
                // Validar campos no vacíos
                if (!cedulaLogin || !codigoLogin) {
                  alert('Por favor complete ambos campos');
                  return;
                }

                // Depuración: Mostrar valores en consola
                console.log('Buscando votante con:', {
                  cedula: cedulaLogin.trim(),
                  codigo: codigoLogin.trim(),
                  organizacion: organizacionParaVotar.nombre
                });

                // Buscar en todas las organizaciones
                const organizacion = organizaciones.find(
                  org => org.nombre === organizacionParaVotar.nombre
                );

                if (!organizacion) {
                  alert('Organización no encontrada');
                  return;
                }

                console.log('Votantes en organización:', organizacion.votantes);

                const votanteEncontrado = organizacion.votantes.find(
                  v => v.cedula.toString() === cedulaLogin.trim() && 
                      v.codigo.toString() === codigoLogin.trim()
                );

                console.log('Votante encontrado:', votanteEncontrado);

                if (votanteEncontrado) {
                  setVotanteLogueado(votanteEncontrado);
                  setCedulaLogin('');
                  setCodigoLogin('');
                  alert('Ingreso exitoso. Ahora puede votar.');
                } else {
                  alert('Cédula o código incorrecto. Por favor intente nuevamente.');
                }
              }}
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.5rem',
                padding: '10px 20px',
                backgroundColor: 'blue',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none',
                marginRight: '10px',
                marginTop: '10px'
              }}
            >
              Ingresar y Votar
            </button>

            <button
              onClick={() => {
                setModoVotante(false);
                setOrganizacionParaVotar(null);
                setCedulaLogin('');
                setCodigoLogin('');
              }}
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.5rem',
                padding: '10px 20px',
                backgroundColor: 'gray',
                color: 'white',
                borderRadius: '8px',
                cursor: 'pointer',
                border: 'none',
                marginTop: '10px'
              }}
            >
              Cancelar
            </button>
          </div>
        )}

        {modoVotante && organizacionParaVotar && votanteLogueado && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem' }}>Elija un candidato para votar</h2>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem' }}>
              {candidatos.filter(c => c.organizacion === organizacionParaVotar.nombre).map((candidato, i) => (
                <div key={i} style={{ border: '2px solid black', borderRadius: '10px', padding: '1rem', width: '250px' }}>
                  <h3>{candidato.nombre} {candidato.apellido}</h3>
                  <p style={{ fontSize: '1.2rem' }}>Plan: {candidato.plan}</p>
                  <button
                    onClick={() => {
                      if (votos.some(v => v.cedula === votanteLogueado.cedula)) {
                        alert('Ya ha votado. No puede votar de nuevo.');
                      } else {
                        setVotos([...votos, { cedula: votanteLogueado.cedula, candidato: `${candidato.nombre} ${candidato.apellido}` }]);
                        alert(`Voto registrado para ${candidato.nombre} ${candidato.apellido}. ¡Gracias por participar!`);
                        setModoVotante(false);
                        setOrganizacionParaVotar(null);
                        setVotanteLogueado(null);
                        setCedulaLogin('');
                        setCodigoLogin('');
                      }
                    }}
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.5rem',
                      padding: '10px',
                      backgroundColor: 'green',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Votar por {candidato.nombre}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </>
    )}
  </div>
);
}

export default App;