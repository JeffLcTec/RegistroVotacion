import React from 'react';

function ResultadosPanel({ procesosFinalizados, campañas, onVolver }) {
  return (
    <div style={{ fontFamily: 'Bebas Neue', padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem' }}>RESULTADOS DE PROCESOS FINALIZADOS</h1>
      {procesosFinalizados.length === 0 ? (
        <p style={{ fontSize: '1.8rem' }}>No hay procesos finalizados aún.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {procesosFinalizados.map((p, i) => {
            const campañasProceso = campañas.filter(c => c.proceso === p.nombre);
            const ganador = campañasProceso.reduce((max, c) => c.votos > (max?.votos || 0) ? c : max, null);

            return (
              <li key={i} style={{
                marginBottom: '2rem',
                padding: '2rem',
                border: '2px solid black',
                borderRadius: '15px',
                backgroundColor: 'white',
                maxWidth: '800px',
                marginInline: 'auto',
                fontSize: '1.5rem'
              }}>
                <h2 style={{ fontSize: '2rem' }}>{p.nombre}</h2>
                <p><strong>Sector:</strong> {p.sector}</p>
                <p><strong>Organización:</strong> {p.organizacion}</p>
                <p><strong>Descripción:</strong> {p.descripcion}</p>
                <h3 style={{ marginTop: '1rem' }}>Campañas:</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {campañasProceso.map((c, j) => (
                    <li key={j} style={{ marginBottom: '0.5rem' }}>
                      <strong>{c.nombre}</strong> - Votos: {c.votos || 0}
                    </li>
                  ))}
                </ul>
                {ganador && (
                  <div style={{ marginTop: '1rem', fontSize: '2rem', color: 'green' }}>
                    🏆 <strong>Ganador:</strong> {ganador.nombre}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
      <button
        onClick={onVolver}
        style={{
          marginTop: '2rem',
          padding: '1rem 2rem',
          fontSize: '2rem',
          backgroundColor: 'gray',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        VOLVER
      </button>
    </div>
  );
}

export default ResultadosPanel;
