import React, { useState } from 'react';
import FormularioVotante from '../FormularioVotante';

function VotantesPanel({ organizaciones, setorganizaciones, candidatos, votantes, setVotantes }) {
  const [modoVotante, setModoVotante] = useState(false);
  const [organizacionParaVotar, setOrganizacionParaVotar] = useState(null);
  const [cedulaLogin, setCedulaLogin] = useState('');
  const [codigoLogin, setCodigoLogin] = useState('');
  const [votanteLogueado, setVotanteLogueado] = useState(null);
  const [votos, setVotos] = useState([]);
  const [votoRealizado, setVotoRealizado] = useState(false);

  return (
    <div>
      <h1>Panel de Votantes</h1>

      {!modoVotante && (
        <div style={{ textAlign: 'center' }}>
          <h2>Seleccione una organización para votar</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            {organizaciones
              .filter((org) => candidatos.some((c) => c.organizacion === org.nombre))
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
                    onClick={() => setOrganizacionParaVotar(org)}
                    style={{
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
        </div>
      )}

      {modoVotante && organizacionParaVotar && organizacionParaVotar.registroVotantes === 'manual' && (
        <FormularioVotante
          onRegistrar={(nuevoVotante) => {
            const nuevasOrganizaciones = organizaciones.map((org) => {
              if (org.nombre === organizacionParaVotar.nombre) {
                return {
                  ...org,
                  votantes: [...org.votantes, nuevoVotante],
                };
              }
              return org;
            });
            setorganizaciones(nuevasOrganizaciones);
            setVotanteLogueado(nuevoVotante);
          }}
          votantes={[]}
          candidatos={candidatos.filter((c) => c.organizacion === organizacionParaVotar.nombre)}
          onCancelar={() => {
            setModoVotante(false);
            setOrganizacionParaVotar(null);
          }}
        />
      )}

      {modoVotante && organizacionParaVotar && organizacionParaVotar.registroVotantes === 'automatica' && !votanteLogueado && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Iniciar sesión para votar</h2>
          <input
            placeholder="Cédula"
            value={cedulaLogin}
            onChange={(e) => setCedulaLogin(e.target.value)}
            style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              padding: '10px',
              borderRadius: '8px',
              width: '300px',
            }}
          />
          <br />
          <input
            placeholder="Código de Verificación"
            value={codigoLogin}
            onChange={(e) => setCodigoLogin(e.target.value)}
            style={{
              fontSize: '1.5rem',
              marginBottom: '1rem',
              padding: '10px',
              borderRadius: '8px',
              width: '300px',
            }}
          />
          <br />
          <button
            onClick={() => {
              const organizacion = organizaciones.find(
                (org) => org.nombre === organizacionParaVotar.nombre
              );
              const votanteEncontrado = organizacion.votantes.find(
                (v) =>
                  v.cedula.toString() === cedulaLogin.trim() &&
                  v.codigo.toString() === codigoLogin.trim()
              );

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
              fontSize: '1.5rem',
              padding: '10px 20px',
              backgroundColor: 'blue',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              border: 'none',
              marginRight: '10px',
              marginTop: '10px',
            }}
          >
            Ingresar y Votar
          </button>
        </div>
      )}

      {modoVotante && organizacionParaVotar && votanteLogueado && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <h2>Elija un candidato para votar</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '2rem',
            }}
          >
            {candidatos
              .filter((c) => c.organizacion === organizacionParaVotar.nombre)
              .map((candidato, i) => (
                <div
                  key={i}
                  style={{
                    border: '2px solid black',
                    borderRadius: '10px',
                    padding: '1rem',
                    width: '250px',
                  }}
                >
                  <h3>
                    {candidato.nombre} {candidato.apellido}
                  </h3>
                  <p>Plan: {candidato.plan}</p>
                  <button
                    onClick={() => {
                      if (votos.some((v) => v.cedula === votanteLogueado.cedula)) {
                        alert('Ya ha votado. No puede votar de nuevo.');
                      } else {
                        setVotos([
                          ...votos,
                          {
                            cedula: votanteLogueado.cedula,
                            candidato: `${candidato.nombre} ${candidato.apellido}`,
                          },
                        ]);
                        alert(`Voto registrado para ${candidato.nombre} ${candidato.apellido}.`);
                        setModoVotante(false);
                        setOrganizacionParaVotar(null);
                        setVotanteLogueado(null);
                      }
                    }}
                    style={{
                      fontSize: '1.5rem',
                      padding: '10px',
                      backgroundColor: 'green',
                      color: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    Votar por {candidato.nombre}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VotantesPanel;