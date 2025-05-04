import React, { useState } from 'react';
import FormularioCandidato from '../FormularioCandidato';
import FormularioOrganizacion from '../FormularioOrganizacion';
import FormularioProcesoVotacion from '../FormularioProcesoVotacion';
import EditarVotantesOrganizacion from '../EditarVotantesOrganizacion';

function AdminPanel({ organizaciones, setOrganizaciones, candidatos, setCandidatos }) {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [modoCandidato, setModoCandidato] = useState(null);
  const [candidatoEditando, setCandidatoEditando] = useState(null);
  const [modoOrganizacion, setModoOrganizacion] = useState(null);
  const [organizacionEditando, setOrganizacionEditando] = useState(null);
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
    },
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

  const registrarOrganizacion = (nuevaOrganizacion) => {
    setOrganizaciones([...organizaciones, nuevaOrganizacion]);
    alert('Organización registrada con éxito');
    setTipoSeleccionado(null);
  };

  const crearProceso = (nuevoProceso) => {
    setProcesos([...procesos, nuevoProceso]);
    alert('Proceso de votación creado exitosamente');
    setTipoSeleccionado(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Panel de Administración</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
        {/* Botón para gestionar candidatos */}
        <button
          onClick={() => setModoCandidato('menu')}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '2rem',
            fontSize: '1.5rem',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Gestionar Candidatos
        </button>

        {/* Botón para gestionar organizaciones */}
        <button
          onClick={() => setModoOrganizacion('menu')}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '2rem',
            fontSize: '1.5rem',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Gestionar Organizaciones
        </button>

        {/* Botón para gestionar procesos de votación */}
        <button
          onClick={() => setTipoSeleccionado('proceso')}
          style={{
            backgroundColor: 'orange',
            color: 'white',
            padding: '2rem',
            fontSize: '1.5rem',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          Gestionar Procesos de Votación
        </button>
      </div>

      {/* Gestión de candidatos */}
      {modoCandidato === 'menu' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>¿Qué desea hacer con los candidatos?</h2>
          <button
            onClick={() => {
              setTipoSeleccionado('candidato');
              setModoCandidato('nuevo');
              setCandidatoEditando(null);
            }}
            style={{
              margin: '1rem',
              padding: '1rem',
              fontSize: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Registrar Nuevo Candidato
          </button>
          <button
            onClick={() => setModoCandidato('editar')}
            style={{
              margin: '1rem',
              padding: '1rem',
              fontSize: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Modificar Candidato Existente
          </button>
        </div>
      )}

      {modoCandidato === 'nuevo' && (
        <FormularioCandidato
          onRegistrar={registrarCandidato}
          candidatos={candidatos}
          candidatoEditando={candidatoEditando}
          onCancelar={() => setModoCandidato(null)}
        />
      )}

      {/* Gestión de organizaciones */}
      {modoOrganizacion === 'menu' && (
        <div style={{ marginTop: '2rem' }}>
          <h2>¿Qué desea hacer con las organizaciones?</h2>
          <button
            onClick={() => setTipoSeleccionado('organizacion')}
            style={{
              margin: '1rem',
              padding: '1rem',
              fontSize: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Registrar Nueva Organización
          </button>
          <button
            onClick={() => setModoOrganizacion('editar')}
            style={{
              margin: '1rem',
              padding: '1rem',
              fontSize: '1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Modificar Votantes de una Organización
          </button>
        </div>
      )}

      {modoOrganizacion === 'editar' && (
        <EditarVotantesOrganizacion
          organizacion={organizacionEditando}
          onGuardar={(orgActualizada) => {
            const nuevasOrganizaciones = organizaciones.map((org) =>
              org.nombre === orgActualizada.nombre ? orgActualizada : org
            );
            setOrganizaciones(nuevasOrganizaciones);
            setModoOrganizacion(null);
          }}
          onCancelar={() => setModoOrganizacion(null)}
        />
      )}

      {tipoSeleccionado === 'organizacion' && (
        <FormularioOrganizacion
          onRegistrar={registrarOrganizacion}
          organizaciones={organizaciones}
          organizacionEditando={organizacionEditando}
          onCancelar={() => setTipoSeleccionado(null)}
        />
      )}

      {/* Gestión de procesos de votación */}
      {tipoSeleccionado === 'proceso' && (
        <FormularioProcesoVotacion
          organizaciones={organizaciones}
          onCrear={crearProceso}
          onCancelar={() => setTipoSeleccionado(null)}
        />
      )}
    </div>
  );
}

export default AdminPanel;