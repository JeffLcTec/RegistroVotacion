import React, { useState } from 'react';
import AdminPanel from './pages/AdminPanel';
import VotantesPanel from './pages/VotantesPanel';

function App() {
  const [rol, setRol] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const [cedulaLogin, setCedulaLogin] = useState('');
  const [codigoLogin, setCodigoLogin] = useState('');
  const [votantes, setVotantes] = useState([]);
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
      </div>
    );
  }

  // Mostrar panel según rol
  if (rol === 'admin' && autenticado) {
    return (
      <AdminPanel
        organizaciones={organizaciones}
        setOrganizaciones={setorganizaciones}
        candidatos={candidatos}
        setCandidatos={setCandidatos}
        votantes={votantes}
        setVotantes={setVotantes}
      />
    );
  }
  
  if (rol === 'votante') {
    return (
      <VotantesPanel
        organizaciones={organizaciones}
        setOrganizaciones={setorganizaciones}
        candidatos={candidatos}
        votantes={votantes}
        setVotantes={setVotantes}
      />
    );
  }  

  return null;
}

// Estilos reutilizables
const botonEstilo = (color) => ({
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
  fontSize: '1.5rem',
  padding: '0.5rem',
  margin: '1rem',
  borderRadius: '8px',
  width: '300px'
};

export default App;
