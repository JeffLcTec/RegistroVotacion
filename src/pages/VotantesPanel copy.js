import React, { useState } from 'react';
import FormularioVotante from '../FormularioVotante';

function VotantesPanel({ onCancelar,organizaciones, setorganizaciones, candidatos, votantes, setVotantes , procesos, campañas,setCampañas }) {
  const [modoVotante, setModoVotante] = useState(false);
  const [organizacionSeleccionada, setOrganizacionSeleccionada] = useState(null);
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
  const [cedulaLogin, setCedulaLogin] = useState('');
  const [codigoLogin, setCodigoLogin] = useState('');
  const [votanteLogueado, setVotanteLogueado] = useState(null);
  const [votos, setVotos] = useState([]);
  const [votoRealizado, setVotoRealizado] = useState(false);

  const procesosPorOrganizacion = procesos.filter(p => p.organizacion === organizacionSeleccionada?.nombre);
  const campañasPorProceso = campañas.filter(c => 
    c.proceso === procesoSeleccionado?.nombre &&
    c.organizacion === organizacionSeleccionada?.nombre
  );
  
  const candidatosFiltrados = candidatos.filter(c => c.organizacion === organizacionSeleccionada?.nombre && c.proceso === procesoSeleccionado?.nombre);
  return (
    <div>
      <h1>Panel de Votantes</h1>

      {!modoVotante && (
      <div style={{fontFamily: 'Bebas Neue',fontSize: '1.5rem',  textAlign: 'center' }}>
        <h2>Seleccione una organización para votar</h2>
        <div style={{fontFamily: 'Bebas Neue',fontSize: '1.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {organizaciones
          
            .map((org, i) => (
              <div
                key={i}
                style={{
                  border: '2px solid black',
                  padding: '1rem',
                  borderRadius: '10px',
                  width: '300px',
                }}
              >
                <h3>{org.nombre}</h3>
                <button
                  onClick={() => {
                    setOrganizacionSeleccionada(org);
                    setProcesoSeleccionado(null);
                  }}
                  style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '1.5rem', 
                    marginTop: '1rem',
                    fontSize: '1.5rem',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: 'green',
                    color: 'white',
                    cursor: 'pointer',
                    border: 'none',
                  }}
                >
                  Votar aquí
                </button>
              </div>
            ))}
        </div>
    
        {/* BOTÓN CANCELAR */}
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={() => {
              setOrganizacionSeleccionada(null);
              setProcesoSeleccionado(null);
              setModoVotante(false);
              onCancelar();
            }}
            style={{ fontFamily: 'Bebas Neue', fontSize: '35px', marginTop: '3rem', marginBottom: '2rem', borderRadius: '7px', cursor: 'pointer' }}
          >
            Cancelar
          </button>
        </div>
      </div>
    )}

      {modoVotante && organizacionSeleccionada?.registroVotantes === 'manual' && (
        <FormularioVotante
          onRegistrar={(nuevoVotante) => {
            const nuevasOrganizaciones = organizaciones.map((org) => {
              if (org.nombre === organizacionSeleccionada.nombre) {
                return {
                  ...org,
                  votantes: [...org.votantes, nuevoVotante],
                };
              }
              return org;
            });
            
            setorganizaciones(nuevasOrganizaciones);
            // ACTUALIZAR la organización seleccionada también
            const nuevaOrg = nuevasOrganizaciones.find(org => org.nombre === organizacionSeleccionada.nombre);
            setOrganizacionSeleccionada(nuevaOrg);
            setVotanteLogueado(nuevoVotante);
          }}
          votantes={organizacionSeleccionada?.votantes || []}
          onCancelar={() => {
            setModoVotante(false);
            setOrganizacionSeleccionada(null);
            setProcesoSeleccionado(null);
          }}
        />
      )}
      {organizacionSeleccionada && !modoVotante && (
  <div style={{ fontFamily: 'Bebas Neue',fontSize: '1.5rem', textAlign: 'center', marginTop: '2rem' }}>
    <h2>Seleccione un proceso de {organizacionSeleccionada.nombre}</h2>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
      {procesosPorOrganizacion.map((proceso, i) => (
        <div
          key={i}
          style={{
            border: '2px solid #333',
            padding: '1rem',
            borderRadius: '10px',
            width: '300px',
            backgroundColor: '#f5f5f5',
          }}
        >
          <h3>{proceso.nombre}</h3>
          <button
            onClick={() => {
              setProcesoSeleccionado(proceso);
              setModoVotante(true);
            }}
            style={{
              fontFamily: 'Bebas Neue',
              fontSize: '1.5rem', 
              marginTop: '1rem',
              fontSize: '1.2rem',
              padding: '10px',
              borderRadius: '8px',
              backgroundColor: 'blue',
              color: 'white',
              cursor: 'pointer',
              border: 'none',
            }}
          >
            Seleccionar proceso
          </button>
        </div>
      ))}
    </div>
  </div>
)}
      {modoVotante && organizacionSeleccionada?.registroVotantes === 'automatica' && !votanteLogueado && (
        <div style={{fontFamily: 'Bebas Neue',textAlign: 'center', marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <h2>Iniciar sesión para votar</h2>
          <input
            placeholder="Cédula"
            value={cedulaLogin}
            onChange={(e) => setCedulaLogin(e.target.value)}
            style={{ fontFamily: 'Bebas Neue',fontSize: '1.5rem', marginBottom: '1rem', padding: '10px', borderRadius: '8px', width: '300px' }}
          /><br />
          <input
            placeholder="Código de Verificación"
            value={codigoLogin}
            onChange={(e) => setCodigoLogin(e.target.value)}
            style={{ fontFamily: 'Bebas Neue',fontSize: '1.5rem', marginBottom: '1rem', padding: '10px', borderRadius: '8px', width: '300px' }}
          /><br />
          <button
            onClick={() => {
              const organizacion = organizaciones.find(org => org.nombre === organizacionSeleccionada.nombre);
              const votanteEncontrado = organizacion.votantes.find(
                (v) => v.cedula.toString() === cedulaLogin.trim() && v.codigo.toString() === codigoLogin.trim()
              );
              if (votanteEncontrado) {
                setVotanteLogueado(votanteEncontrado);
                setCedulaLogin('');
                setCodigoLogin('');
                alert('Ingreso exitoso. Ahora puede votar.');
              } else {
                alert('Cédula o código incorrecto.');
              }
            }}
            style={botonEstilo('blue')}
          >
            Ingresar y Votar
          </button>
          <button
            onClick={() => {
              setModoVotante(false);
              setOrganizacionSeleccionada(null);
              setProcesoSeleccionado(null);
            }}
            style={botonEstilo('red')}
          >
            Cancelar
          </button>
        </div>
      )}

      {modoVotante && votanteLogueado && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Seleccione una campaña {votanteLogueado.nombre} </h2>
          <div>
            {campañasPorProceso.map((campaña, i) => (
              <button
                key={i}
                onClick={() => {
                  const candidatosCampaña = candidatosFiltrados.filter(c => c.campaña === campaña.nombre);
                  const yaVoto = votos.some(v => v.cedula === votanteLogueado.cedula);
                  if (yaVoto) {
                    alert('Ya ha votado.');
                    return;
                  }
                  const confirmar = window.confirm(`¿Confirma su voto para la campaña "${campaña.nombre}"?`);
                  if (confirmar) {
                    setVotos([...votos, {
                      cedula: votanteLogueado.cedula,
                      campaña: campaña.nombre
                    }]);
                    // Sumar voto a la campaña
                    const nuevasCampañas = campañas.map((c) =>
                      c.nombre === campaña.nombre
                        ? { ...c, votos: (c.votos || 0) + 1 }
                        : c
                    );
                    setCampañas(nuevasCampañas);

                    // Confirmación y reset
                    alert(`Voto registrado para la campaña "${campaña.nombre}"`);
                    setModoVotante(false);
                    setOrganizacionSeleccionada(null);
                    setProcesoSeleccionado(null);
                    setVotanteLogueado(null);
                  }
                }}
                style={{
                  fontSize: '1.3rem',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: 'orange',
                  color: 'white',
                  cursor: 'pointer',
                  border: 'none'
                }}
              >
                Votar en campaña: {campaña.nombre}    
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
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
const inputStyle = {
  fontFamily: 'Bebas Neue',
  fontSize: '1.5rem',
  marginBottom: '1rem',
  padding: '10px',
  borderRadius: '8px',
  width: '300px'
};

export default VotantesPanel;