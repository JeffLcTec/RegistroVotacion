export default function ListaPersonas({ personas }) {
    const votantes = personas.filter(p => p.tipo === 'votante');
    const candidatos = personas.filter(p => p.tipo === 'candidato');
  
    return (
      <div className="listas">
        <div>
          <h3>Votantes</h3>
          <ul>
            {votantes.map((p, i) => <li key={i}>{p.nombre}</li>)}
          </ul>
        </div>
        <div>
          <h3>Candidatos</h3>
          <ul>
            {candidatos.map((p, i) => <li key={i}>{p.nombre}</li>)}
          </ul>
        </div>
      </div>
    );
  }
  