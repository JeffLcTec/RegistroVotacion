// VotantesPanel.js actualizado con persistencia en votanteLogueado (votosEmitidos)
import React, { useState } from 'react';
import FormularioVotante from '../FormularioVotante';

function VotantesPanel({ onCancelar, organizaciones, setorganizaciones, candidatos, votantes, setVotantes, procesos, campañas, setCampañas, votanteLogueado, setVotanteLogueado }) {
  const [modo, setModo] = useState(null); // 'ver' | 'votar'
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState(null);
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);

  const campañasValidas = campañas.filter(c => c.miembros && c.miembros.length > 0);
  const organizacionesConCampañas = organizaciones.filter(org =>
    campañasValidas.some(c => c.organizacion === org.nombre)
  );

  const procesosPorOrganizacion = procesos.filter(p => p.organizacion === organizacionSeleccionada?.nombre);
  const campañasPorOrganizacion = campañasValidas.filter(c => c.organizacion === organizacionSeleccionada?.nombre);
  const campañasPorProceso = campañas.filter(c => c.proceso === procesoSeleccionado?.nombre && c.organizacion === organizacionSeleccionada?.nombre);

  if (!votanteLogueado) {
    return (
      <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '5rem' }}>
        <h1>No hay votante logueado</h1>
        <button style={botonEstilo('gray')} onClick={onCancelar}>Volver</button>
      </div>
    );
  }

  if (!modo) {
    return (
      <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '5rem' }}>
        <h1>Bienvenido, {votanteLogueado.nombre} {votanteLogueado.apellido}</h1>
        <button style={botonEstilo('blue')} onClick={() => setModo('ver')}>Ver campañas</button>
        <button style={botonEstilo('green')} onClick={() => setModo('votar')}>Votar</button>
        <button style={botonEstilo('red')} onClick={onCancelar}>Cerrar sesión</button>
      </div>
    );
  }

  if (modo === 'ver') {
    if (!organizacionSeleccionada) {
      return (
        <div style={{ fontFamily: 'Bebas Neue', padding: '2rem', textAlign: 'center' }}>
          <h2>Seleccione una organización</h2>
          {organizacionesConCampañas.map((org, i) => (
            <button
              key={i}
              style={botonEstilo('blue')}
              onClick={() => setOrganizacionSeleccionada(org)}
            >
              {org.nombre}
            </button>
          ))}
          <button style={botonEstilo('gray')} onClick={() => setModo(null)}>Volver</button>
        </div>
      );
    } else {
      return (
        <div style={{ fontFamily: 'Bebas Neue', padding: '2rem', textAlign: 'center' }}>
          <h2>Campañas de {organizacionSeleccionada.nombre}</h2>
          {campañasPorOrganizacion.map((campaña, i) => (
            <div key={i} style={{ border: '1px solid gray', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{campaña.nombre}</h3>
              <p><strong>Organización:</strong> {campaña.organizacion}</p>
              <p><strong>Proceso:</strong> {campaña.proceso}</p>
              <h4>Miembros:</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {campaña.miembros.map((m, j) => {
                  const datosCandidato = candidatos.find(c => c.correo === m.correo);
                  return (
                    <li key={j}>
                      {m.puesto}: {m.nombre} ({m.correo})<br />
                      {datosCandidato && (
                        <>
                          <strong>Plan:</strong> {datosCandidato.plan}<br />
                          <strong>Ideas:</strong> {datosCandidato.ideas}
                        </>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <button style={botonEstilo('gray')} onClick={() => setOrganizacionSeleccionada(null)}>Volver</button>
        </div>
      );
    }
  }

  if (modo === 'votar') {
    if (!organizacionSeleccionada) {
      return (
        <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '2rem' }}>
          <h2>Seleccione una organización</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {organizacionesConCampañas.map((org, i) => (
              <button key={i} onClick={() => setOrganizacionSeleccionada(org)} style={botonEstilo('blue')}>
                {org.nombre}
              </button>
            ))}
          </div>
          <button style={botonEstilo('gray')} onClick={() => setModo(null)}>Volver</button>
        </div>
      );
    }

    if (!organizacionSeleccionada.votantes.some(v => v.cedula === votanteLogueado.cedula) && organizacionSeleccionada.registroVotantes === 'automatica') {
      return (
        <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '2rem' }}>
          <h2>No estás habilitado para votar en esta organización.</h2>
          <button style={botonEstilo('gray')} onClick={() => setOrganizacionSeleccionada(null)}>Volver</button>
        </div>
      );
    }

    const yaVotoEnOrganizacion = (votanteLogueado.votosEmitidos || []).some(nombreCampaña => {
      const camp = campañas.find(c => c.nombre === nombreCampaña);
      return camp && camp.organizacion === organizacionSeleccionada.nombre;
    });

    if (yaVotoEnOrganizacion) {
      return (
        <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '2rem' }}>
          <h2>Ya has votado en una campaña de esta organización.</h2>
          <button style={botonEstilo('gray')} onClick={() => setOrganizacionSeleccionada(null)}>Volver</button>
        </div>
      );
    }

    if (!procesoSeleccionado) {
      return (
        <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '2rem' }}>
          <h2>Seleccione un proceso en {organizacionSeleccionada.nombre}</h2>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {procesosPorOrganizacion.map((p, i) => (
              <button key={i} onClick={() => setProcesoSeleccionado(p)} style={botonEstilo('orange')}>
                {p.nombre}
              </button>
            ))}
          </div>
          <button style={botonEstilo('gray')} onClick={() => setOrganizacionSeleccionada(null)}>Volver</button>
        </div>
      );
    }

    return (
      <div style={{ fontFamily: 'Bebas Neue', textAlign: 'center', marginTop: '2rem' }}>
        <h2>Seleccione una campaña</h2>
        {campañasPorProceso.map((campaña, i) => (
          <button
            key={i}
            style={{ ...botonEstilo('green'), marginBottom: '1rem' }}
            onClick={() => {
              const yaVoto = (votanteLogueado.votosEmitidos || []).includes(campaña.nombre);
              if (yaVoto) return alert('Ya has votado en esta campaña.');

              if (window.confirm(`¿Confirmás tu voto para la campaña "${campaña.nombre}"?`)) {
                const actualizados = {
                  ...votanteLogueado,
                  votosEmitidos: [...(votanteLogueado.votosEmitidos || []), campaña.nombre]
                };
                setVotanteLogueado(actualizados);
                setVotantes(prev =>
                  prev.map(v => v.cedula === actualizados.cedula ? actualizados : v)
                );

                const nuevasCampañas = campañas.map(c =>
                  c.nombre === campaña.nombre ? { ...c, votos: (c.votos || 0) + 1 } : c
                );
                setCampañas(nuevasCampañas);
                alert('Voto registrado con éxito.');
                setModo(null);
                setOrganizacionSeleccionada(null);
                setProcesoSeleccionado(null);
              }
            }}
          >
            Votar en "{campaña.nombre}"
          </button>
        ))}
        <button style={botonEstilo('gray')} onClick={() => setProcesoSeleccionado(null)}>Volver</button>
      </div>
    );
  }

  return null;
}

const botonEstilo = (color) => ({
  fontFamily: 'Bebas Neue',
  margin: '1rem',
  padding: '1rem 2rem',
  fontSize: '1.5rem',
  backgroundColor: color,
  color: 'white',
  borderRadius: '10px',
  border: 'none',
  cursor: 'pointer'
});

export default VotantesPanel;
