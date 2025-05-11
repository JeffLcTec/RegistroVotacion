import React, { useState } from 'react';
import AdminPanel from './pages/AdminPanel';
import VotantesPanel from './pages/VotantesPanel';
import FormularioVotante from './FormularioVotante';
import ResultadosPanel from './pages/ResultadosPanel';

function App() {

  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [modoCandidato, setModoCandidato] = useState(null);
  const [modoOrganizacion, setModoOrganizacion] = useState(null);
  const [modoProceso, setModoProceso] = useState(null);
  const [modoVotante, setModoVotante] = useState(false); // false por defecto
  const [modoResultados, setModoResultados] = useState(false);
  const [rol, setRol] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [correoLogin, setCorreoLogin] = useState('');
  const [claveLogin, setClaveLogin] = useState('');
  const [cedulaLogin, setCedulaLogin] = useState('');
  const [codigoLogin, setCodigoLogin] = useState('');
  const [votantes, setVotantes] = useState([
    {
      nombre: 'Jose Roberto',
      apellido: 'Chacón Barrantes',
      cedula: '208770590',
      correo: 'roberto@correo.com',
      contraseña: 'roberto123'
    }
  ]);  
  const [votanteActual, setVotanteActual] = useState(null);
  const [modoLoginVotante, setModoLoginVotante] = useState(null); // 'login' | 'registro'

  const [campañas, setCampañas] = useState([
    // UTN
    {
      nombre: 'Directiva Tecnología 2025',
      miembros: [
        { puesto: 'Presidente', correo: 'usado1@x.com', nombre: 'Laura Jiménez' }
      ],
      proceso: 'Proceso de Elecciones 2025',
      organizacion: 'Universidad Técnica Nacional',
      votos: 0
    },
    {
      nombre: 'Consejo Verde 2025',
      miembros: [
        { puesto: 'Presidente', correo: 'vp@correo.com', nombre: 'Andrés Sánchez' }
      ],
      proceso: 'Proceso de Elecciones 2025',
      organizacion: 'Universidad Técnica Nacional',
      votos: 0
    },
  
    // CCA
    {
      nombre: 'Futuro Estudiantil',
      miembros: [
        { puesto: 'Presidente', correo: 'lol@gmail.com', nombre: 'Roberto Chacon' }
      ],
      proceso: 'Elecciones Estudiantiles 2025',
      organizacion: 'Colegio Científico de Alajuela',
      votos: 0
    },
    {
      nombre: 'Renovación CCA',
      miembros: [
        { puesto: 'Presidente', correo: 'valeria.castro@cca.cr', nombre: 'Valeria Castro' }
      ],
      proceso: 'Elecciones Estudiantiles 2025',
      organizacion: 'Colegio Científico de Alajuela',
      votos: 0
    },
  
    // La Esperanza
    {
      nombre: 'Progreso Escolar',
      miembros: [
        { puesto: 'Presidente', correo: 'gabriel.alpizar@laesperanza.cr', nombre: 'Gabriel Alpízar' }
      ],
      proceso: 'Elección Académica 2025',
      organizacion: 'Centro Educativo La Esperanza',
      votos: 0
    },
    {
      nombre: 'Inclusión y Futuro',
      miembros: [
        { puesto: 'Presidente', correo: 'fernanda.rojas@laesperanza.cr', nombre: 'Fernanda Rojas' }
      ],
      proceso: 'Elección Académica 2025',
      organizacion: 'Centro Educativo La Esperanza',
      votos: 0
    },
  
    // Cartago
    {
      nombre: 'Cartago Avanza',
      miembros: [
        { puesto: 'Presidente', correo: 'carlos.mora@escuelacentral.cr', nombre: 'Carlos Mora' }
      ],
      proceso: 'Junta Escolar 2025',
      organizacion: 'Escuela Central de Cartago',
      votos: 0
    },
    {
      nombre: 'Educación Moderna',
      miembros: [
        { puesto: 'Presidente', correo: 'julian.castro@escuelacentral.cr', nombre: 'Julián Castro' }
      ],
      proceso: 'Junta Escolar 2025',
      organizacion: 'Escuela Central de Cartago',
      votos: 0
    },
  
    // HNN
    {
      nombre: 'Sindicato Transparente',
      miembros: [
        { puesto: 'Presidente', correo: 'luis.solis@hnn.cr', nombre: 'Luis Solís' }
      ],
      proceso: 'Sindicato HNN 2025',
      organizacion: 'Hospital Nacional de Niños',
      votos: 0
    },
  
    // Red Juvenil
    {
      nombre: 'Red Activa Joven',
      miembros: [
        { puesto: 'Presidente', correo: 'daniela.ramos@redjoven.org', nombre: 'Daniela Ramos' }
      ],
      proceso: 'Asamblea Juvenil 2026',
      organizacion: 'Red de Organizaciones Juveniles',
      votos: 0
    },

    //campañas finalizadas
    {
    nombre: 'Unidad Estudiantil',
    miembros: [{ puesto: 'Presidente', nombre: 'Laura Jiménez', correo: 'laura@utn.cr' }],
    proceso: 'Elecciones Estudiantiles 2024',
    organizacion: 'Universidad Técnica Nacional',
    votos: 42
  },
  {
    nombre: 'Estudiantes al Poder',
    miembros: [{ puesto: 'Presidente', nombre: 'Carlos Mora', correo: 'carlos@utn.cr' }],
    proceso: 'Elecciones Estudiantiles 2024',
    organizacion: 'Universidad Técnica Nacional',
    votos: 65
  },
  {
    nombre: 'Jóvenes por el Cambio',
    miembros: [{ puesto: 'Presidente', nombre: 'Daniela Ramos', correo: 'daniela@red.org' }],
    proceso: 'Asamblea General ONG 2024',
    organizacion: 'Red de Organizaciones Juveniles',
    votos: 88
  },
  {
    nombre: 'Fuerza Juvenil',
    miembros: [{ puesto: 'Presidente', nombre: 'Luis Solís', correo: 'luis@red.org' }],
    proceso: 'Asamblea General ONG 2024',
    organizacion: 'Red de Organizaciones Juveniles',
    votos: 51
  }
  ]);
  
  const [procesos, setProcesos] = useState([
    {
      nombre: 'Proceso de Elecciones 2025',
      sector: 'Educación',
      organizacion: 'Universidad Técnica Nacional',
      descripcion: 'Elecciones para elegir representantes estudiantiles.'
    },
    {
      nombre: 'Elecciones Estudiantiles 2025',
      sector: 'Secundaria',
      organizacion: 'Colegio Científico de Alajuela',
      descripcion: 'Elección de directiva estudiantil.'
    },
    {
      nombre: 'Elección Académica 2025',
      sector: 'Privado',
      organizacion: 'Centro Educativo La Esperanza',
      descripcion: 'Elección de comité de apoyo estudiantil.'
    },
    {
      nombre: 'Junta Escolar 2025',
      sector: 'Primaria',
      organizacion: 'Escuela Central de Cartago',
      descripcion: 'Votación anual escolar.'
    },
    {
      nombre: 'Sindicato HNN 2025',
      sector: 'Salud',
      organizacion: 'Hospital Nacional de Niños',
      descripcion: 'Votación interna de líderes sindicales.'
    },
    {
      nombre: 'Asamblea Juvenil 2026',
      sector: 'Social',
      organizacion: 'Red de Organizaciones Juveniles',
      descripcion: 'Votación de coordinadores de juventud.'
    }
  ]);
  
  const [procesosFinalizados, setProcesosFinalizados] = useState([
  {
    nombre: 'Elecciones Estudiantiles 2024',
    sector: 'Educación',
    organizacion: 'Universidad Técnica Nacional',
    descripcion: 'Elección de representantes estudiantiles para el período 2024-2025.'
  },
  {
    nombre: 'Asamblea General ONG 2024',
    sector: 'Social',
    organizacion: 'Red de Organizaciones Juveniles',
    descripcion: 'Proceso para elegir nuevos coordinadores regionales.'
  }
]);


  const finalizarProceso = (nombreProceso) => {
    const procesoAEliminar = procesos.find(p => p.nombre === nombreProceso);
    if (!procesoAEliminar) return;

    setProcesosFinalizados(prev => [...prev, procesoAEliminar]);
    setProcesos(prev => prev.filter(p => p.nombre !== nombreProceso));
  };
  
  const [creandoProceso, setCreandoProceso] = useState(false);

  const [candidatos, setCandidatos] = useState([
    // UTN
    {
      nombre: 'Laura',
      apellido: 'Jiménez',
      correo: 'usado1@x.com',
      contraseña: 'laura123',
      plan: 'Educación transformadora',
      ideas: 'Rediseñar el currículo estudiantil',
      organizacion: 'Universidad Técnica Nacional',
      archivosAdjuntos: []
    },
    {
      nombre: 'Andrés',
      apellido: 'Sánchez',
      correo: 'vp@correo.com',
      contraseña: 'andres123',
      plan: 'Universidad sostenible',
      ideas: 'Instalación de paneles solares',
      organizacion: 'Universidad Técnica Nacional',
      archivosAdjuntos: []
    },
  
    // CCA
    {
      nombre: 'Roberto',
      apellido: 'Chacon',
      correo: 'lol@gmail.com',
      contraseña: 'roberto123',
      plan: 'Actividades estudiantiles',
      ideas: 'Más ferias científicas y culturales',
      organizacion: 'Colegio Científico de Alajuela',
      archivosAdjuntos: []
    },
    {
      nombre: 'Valeria',
      apellido: 'Castro',
      correo: 'valeria.castro@cca.cr',
      contraseña: 'valeria123',
      plan: 'Mejor infraestructura',
      ideas: 'Remodelar aulas',
      organizacion: 'Colegio Científico de Alajuela',
      archivosAdjuntos: []
    },
  
    // La Esperanza
    {
      nombre: 'Gabriel',
      apellido: 'Alpízar',
      correo: 'gabriel.alpizar@laesperanza.cr',
      contraseña: 'gabriel123',
      plan: 'Tecnología en aulas',
      ideas: 'Clases con tabletas',
      organizacion: 'Centro Educativo La Esperanza',
      archivosAdjuntos: []
    },
    {
      nombre: 'Fernanda',
      apellido: 'Rojas',
      correo: 'fernanda.rojas@laesperanza.cr',
      contraseña: 'fernanda123',
      plan: 'Educación inclusiva',
      ideas: 'Tutorías especializadas',
      organizacion: 'Centro Educativo La Esperanza',
      archivosAdjuntos: []
    },
  
    // Cartago
    {
      nombre: 'Carlos',
      apellido: 'Mora',
      correo: 'carlos.mora@escuelacentral.cr',
      contraseña: 'carlos123',
      plan: 'Gestión participativa',
      ideas: 'Presupuesto escolar abierto',
      organizacion: 'Escuela Central de Cartago',
      archivosAdjuntos: []
    },
    {
      nombre: 'Julián',
      apellido: 'Castro',
      correo: 'julian.castro@escuelacentral.cr',
      contraseña: 'julian123',
      plan: 'Aulas inteligentes',
      ideas: 'Pantallas interactivas',
      organizacion: 'Escuela Central de Cartago',
      archivosAdjuntos: []
    },
  
    // HNN
    {
      nombre: 'Luis',
      apellido: 'Solís',
      correo: 'luis.solis@hnn.cr',
      contraseña: 'luis123',
      plan: 'Transparencia sindical',
      ideas: 'Publicar informes de gestión',
      organizacion: 'Hospital Nacional de Niños',
      archivosAdjuntos: []
    },
  
    // Red Juvenil
    {
      nombre: 'Daniela',
      apellido: 'Ramos',
      correo: 'daniela.ramos@redjoven.org',
      contraseña: 'daniela123',
      plan: 'Liderazgo joven',
      ideas: 'Capacitaciones nacionales',
      organizacion: 'Red de Organizaciones Juveniles',
      archivosAdjuntos: []
    }
  ]);
  
  

  const [organizaciones, setorganizaciones] = useState([
      {
        nombre: 'Universidad Técnica Nacional',
        tipo: 'Universidad Pública',
        registroVotantes: 'publica',
        votantes: []
      },
      {
        nombre: 'Colegio Científico de Alajuela',
        tipo: 'Colegio',
        registroVotantes: 'privada',
        votantes: [
          { cedula: '101110111'},
          { cedula: '101110112'}
        ]
      },
      {
        nombre: 'Centro Educativo La Esperanza',
        tipo: 'Escuela Privada',
        registroVotantes: 'publica',
        votantes: []
      },
      {
        nombre: 'Escuela Central de Cartago',
        tipo: 'Escuela Pública',
        registroVotantes: 'publica',
        votantes: []
      },
      {
        nombre: 'Hospital Nacional de Niños',
        tipo: 'Institución Pública',
        registroVotantes: 'privada',
        votantes: [
          { cedula: '103330111'}
        ]
      },
      {
        nombre: 'Red de Organizaciones Juveniles',
        tipo: 'ONG',
        registroVotantes: 'publica',
        votantes: []
      }
    ]);
    
    
  if (modoResultados) {
    return (
      <ResultadosPanel
        procesosFinalizados={procesosFinalizados}
        campañas={campañas}
        onVolver={() => setModoResultados(false)}
      />
    );
  }
  
  // Mostrar selección de rol
  if (!rol) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'Bebas Neue' }}>
        <h1>¿Qué desea hacer?</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button onClick={() => setRol('votante')} style={botonEstilo('red')}>Votante</button>
          <button onClick={() => setRol('admin')} style={botonEstilo('blue')}>Administrador</button>
          <button onClick={() => setModoResultados(true)} style={botonEstilo('green')}>Ver Resultados</button>
        </div>
      </div>
    );
  }

  // Lógica de ingreso del votante
  if (rol === 'votante' && !votanteActual && !modoLoginVotante) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'Bebas Neue' }}>
        <h1>Bienvenido votante</h1>
        <button style={botonEstilo('green')} onClick={() => setModoLoginVotante('login')}>
          Iniciar sesión
        </button>
        <button style={botonEstilo('orange')} onClick={() => setModoLoginVotante('registro')}>
          Registrarse
        </button>
        <button style={botonEstilo('gray')} onClick={() => setRol(null)}>
          Volver
        </button>
      </div>
    );
  }

  if (rol === 'votante' && modoLoginVotante === 'registro') {
    return (
      <FormularioVotante
        votantes={votantes}
        onRegistrar={(nuevo) => {
          setVotantes([...votantes, nuevo]);
          setVotanteActual(nuevo);
          setModoLoginVotante(null);
        }}
        onCancelar={() => setModoLoginVotante(null)}
      />
    );
  }

  if (rol === 'votante' && modoLoginVotante === 'login') {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'Bebas Neue' }}>
        <h1>Login de Votante</h1>
        <input
          placeholder="Correo"
          style={inputEstilo}
          value={correoLogin}
          onChange={(e) => setCorreoLogin(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Contraseña"
          style={inputEstilo}
          value={claveLogin}
          onChange={(e) => setClaveLogin(e.target.value)}
        /><br />
        <button
          style={botonEstilo('green')}
          onClick={() => {
            const encontrado = votantes.find(
              (v) => v.correo === correoLogin.trim() && v.contraseña === claveLogin.trim()
            );
            if (encontrado) {
              setVotanteActual(encontrado);
              setModoLoginVotante(null);
              setCorreoLogin('');
              setClaveLogin('');
            } else {
              alert('Correo o contraseña incorrectos.');
            }
          }}
        >
          Ingresar
        </button>
        <button style={botonEstilo('gray')} onClick={() => setModoLoginVotante(null)}>
          Volver
        </button>
      </div>
    );
  }

  // Panel votante con sesión activa
  if (rol === 'votante' && votanteActual) {
    return (
      <VotantesPanel
        votanteLogueado={votanteActual}
        setVotanteLogueado={setVotanteActual}
        organizaciones={organizaciones}
        setorganizaciones={setorganizaciones}
        candidatos={candidatos}
        votantes={votantes}
        setVotantes={setVotantes}
        procesos={procesos}
        campañas={campañas}
        setCampañas={setCampañas}
        onCancelar={() => {
          setRol(null);
          setVotanteActual(null);
          setModoLoginVotante(null);
        }}
      />
    );
  }

  // Si es admin y no está autenticado aún
  if (rol === 'admin' && !autenticado) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'Bebas Neue' }}>
        <h1>LOGIN ADMINISTRADOR</h1>
        <input
          type="email"
          placeholder="Correo"
          value={cedulaLogin}
          onChange={(e) => setCedulaLogin(e.target.value)}
          style={inputEstilo}
        />
        <br />
        <input
          type="password"
          placeholder="Contraseña"
          value={codigoLogin}
          onChange={(e) => setCodigoLogin(e.target.value)}
          style={inputEstilo}
        />
        <br />
        <button
          onClick={() => {
            if (cedulaLogin === 'admin@votaciones.com' && codigoLogin === 'admin123') {
              alert('Bienvenido administrador');
              setAutenticado(true);
            } else {
              alert('Credenciales incorrectas');
            }
          }}
          style={botonEstilo('blue')}
        >
          Ingresar
        </button>
        <br />
        <button
          onClick={() => setRol(null)}
          style={{ fontFamily: 'Bebas Neue', fontSize: '35px', marginTop: '3rem', marginBottom: '2rem', borderRadius: '7px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      </div>
      
      
    );
  }

  // Mostrar panel según rol
  if (rol === 'admin' && autenticado) {
    return (
      <AdminPanel
  onCancelar={() => {
    setTipoSeleccionado(null);
    setModoCandidato(null);
    setModoOrganizacion(null);
    setModoProceso(null);
    setModoVotante(false);
  }}
  organizaciones={organizaciones}
  setOrganizaciones={setorganizaciones}
  candidatos={candidatos}
  setCandidatos={setCandidatos}
  votantes={votantes}
  setVotantes={setVotantes}
  procesos={procesos}
  setProcesos={setProcesos}
  procesosFinalizados={procesosFinalizados}
  setProcesosFinalizados={setProcesosFinalizados}
  finalizarProceso={finalizarProceso}
  campañas={campañas}
  setCampañas={setCampañas}
  onCerrarSesion={() => {
    setRol(null);
    setAutenticado(false);
    setCedulaLogin('');
    setCodigoLogin('');
  }}
/>
    );
  }

  
  //if (rol === 'votante') {
  //  return (
  //    <VotantesPanel
  //      organizaciones={organizaciones}
  //      setorganizaciones={setorganizaciones}
  //      candidatos={candidatos}
  //      votantes={votantes}
  //      setVotantes={setVotantes}
  //      procesos={procesos}
  //      campañas={campañas}
  //      setCampañas={setCampañas}
  //      onCancelar={() => {setRol(null);}}
  //    />
  //  );
  //}  

  return null;
}

// Estilos reutilizables
const botonEstilo = (color) => ({
  fontFamily: 'Bebas Neue',
  margin: '1rem',
  padding: '1rem 2rem',
  fontSize: '2rem',
  backgroundColor: color,
  color: 'white',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer'
});

const inputEstilo = {
  fontFamily: 'Bebas Neue',
  fontSize: '1.5rem',
  padding: '0.5rem',
  margin: '1rem',
  borderRadius: '8px',
  width: '300px'
};

export default App;
