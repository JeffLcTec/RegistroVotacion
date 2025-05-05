import React, { useState } from 'react';
import AdminPanel from './pages/AdminPanel';
import VotantesPanel from './pages/VotantesPanel';

function App() {

  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [modoCandidato, setModoCandidato] = useState(null);
  const [modoOrganizacion, setModoOrganizacion] = useState(null);
  const [modoProceso, setModoProceso] = useState(null);
  const [modoVotante, setModoVotante] = useState(false); // false por defecto
  const [rol, setRol] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [cedulaLogin, setCedulaLogin] = useState('');
  const [codigoLogin, setCodigoLogin] = useState('');
  const [votantes, setVotantes] = useState([]);

  const [campañas, setCampañas] = useState([
    {
      nombre: 'Directiva Tecnología 2025',
      miembros: [
        { puesto: 'Presidente', correo: 'usado1@x.com', nombre: 'Laura Jiménez' },
        { puesto: 'Vicepresidente', correo: 'vp@correo.com', nombre: 'Andrés Sánchez' }
      ],
      proceso: 'Proceso de Elecciones 2025',
      organizacion: 'Universidad Técnica Nacional',
      votos: 0,
    },
    {
      nombre: 'Directiva Tecnología 2025',
      miembros: [
        { puesto: 'Presidente', correo: 'usado1@x.com', nombre: 'Laura Jiménez' },
        { puesto: 'Vicepresidente', correo: 'vp@correo.com', nombre: 'Andrés Sánchez' }
      ],
      proceso: 'Proceso de Elecciones 2025',
      organizacion: 'Universidad nigger Nacional',
      votos: 0,
    },
    {
      nombre: 'Campaña Salud 2026',
      miembros: [
        { puesto: 'Presidente', correo: 'salud@correo.com', nombre: 'Nombre Desconocido' } // No está en candidatos
      ],
      proceso: 'Proceso de Elecciones 2026',
      votos: 0,
    },
    {
      nombre: 'Unidad Escolar Progresista',
      miembros: [
        { puesto: 'Tesorero', correo: 'tesorero@escolar.com', nombre: 'Gabriel Alpízar' }
      ],
      proceso: 'Elecciones Junta Administrativa 2025',
      votos: 0,
    },
    {
      nombre: 'Consejo Joven Futuro',
      miembros: [
        { puesto: 'Coordinador General', correo: 'coordinador@redjoven.org', nombre: 'Nombre Desconocido' }
      ],
      proceso: 'Asamblea Nacional de Asociaciones 2026',
      votos: 0,
    },
    {
      nombre: 'Sindicato Transparente',
      miembros: [
        { puesto: 'Secretario General', correo: 'secretario@hnn.cr', nombre: 'Nombre Desconocido' }
      ],
      proceso: 'Proceso Electoral Interno 2025',
      votos: 0,
    },
    {
      nombre: 'Futuro Estudiantil',
      miembros: [
        { puesto: 'Presidente', correo: 'lol@gmail.com', nombre: 'Roberto Chacon' }
      ],
      proceso: 'Elecciones Estudiantiles 2025',
      organizacion: 'Colegio Científico de Alajuela',
      votos: 2,
    },
  ]);
  
  const [procesos, setProcesos] = useState([
    {
      nombre: 'Proceso de Elecciones 2025',
      sector: 'Educación',
      organizacion: 'Universidad Técnica Nacional',
      descripcion: 'Elecciones para elegir representantes estudiantiles.',
    },
    {
      nombre: 'Elecciones Junta Administrativa 2025',
      sector: 'Administración',
      organizacion: 'Escuela Central de Cartago',
      descripcion: 'Elección anual de la junta administrativa escolar.',
    },
    {
      nombre: 'Votación Consejo Consultivo 2026',
      sector: 'Tecnología',
      organizacion: 'Colegio de Profesionales en Informática',
      descripcion: 'Designación de nuevos miembros del consejo técnico consultivo.',
    },
    {
      nombre: 'Asamblea Nacional de Asociaciones 2026',
      sector: 'Social',
      organizacion: 'Red de Organizaciones Juveniles',
      descripcion: 'Votación para elegir coordinadores nacionales por sector.',
    },
    {
      nombre: 'Proceso Electoral Interno 2025',
      sector: 'Salud',
      organizacion: 'Hospital Nacional de Niños',
      descripcion: 'Elecciones sindicales internas para el período 2025-2027.',
    },
    {
      nombre: 'Elecciones Estudiantiles 2025',
      sector: 'estudiantil',
      organizacion: 'Colegio Científico de Alajuela',
      descripcion: 'Elecciones para elegir representantes estudiantiles.',
    }
  ]);
  
  const [creandoProceso, setCreandoProceso] = useState(false);

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
        votantes: [
          { nombre: 'Juan Pérez', cedula: '101110111', codigo: '12345' },
          { nombre: 'María López', cedula: '101110112', codigo: '12346' },
          { nombre: 'Carlos Rodríguez', cedula: '101110113', codigo: '12347' }
        ]
      },
      {
        nombre: 'Centro Educativo La Esperanza',
        tipo: 'Escuela Privada',
        registroVotantes: 'manual',
        votantes: []
      },
      {
        nombre: 'Escuela Central de Cartago',
        tipo: 'Escuela Pública',
        registroVotantes: 'manual',
        votantes: []
      },
      {
        nombre: 'Colegio de Profesionales en Informática',
        tipo: 'Colegio Profesional',
        registroVotantes: 'automatica',
        votantes: [
          { nombre: 'Laura Salazar', cedula: '102220111', codigo: '45678' },
          { nombre: 'Andrés Jiménez', cedula: '102220112', codigo: '45679' }
        ]
      },
      {
        nombre: 'Red de Organizaciones Juveniles',
        tipo: 'Organización No Gubernamental',
        registroVotantes: 'manual',
        votantes: []
      },
      {
        nombre: 'Hospital Nacional de Niños',
        tipo: 'Institución Pública',
        registroVotantes: 'automatica',
        votantes: [
          { nombre: 'Gabriela Rojas', cedula: '103330111', codigo: '78901' }
        ]
      }
    ]);
    
  // Mostrar selección de rol
  if (!rol) {
    return (
      <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: 'Bebas Neue' }}>
        <h1>Seleccione su rol</h1>
        <button
          onClick={() => setRol('votante')}
          style={botonEstilo('red')}
        >
          Votante
        </button>
        <button
          onClick={() => setRol('admin')}
          style={botonEstilo('blue')}
        >
          Administrador
        </button>
      </div>
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
  
  if (rol === 'votante') {
    return (
      <VotantesPanel
        organizaciones={organizaciones}
        setorganizaciones={setorganizaciones}
        candidatos={candidatos}
        votantes={votantes}
        setVotantes={setVotantes}
        procesos={procesos}
        campañas={campañas}
        setCampañas={setCampañas}
        onCancelar={() => {setRol(null);}}
      />
    );
  }  

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
