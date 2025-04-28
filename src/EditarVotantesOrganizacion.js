import React, { useState } from 'react';

export default function EditarVotantesOrganizacion({ organizacion, onGuardar, onCancelar }) {
  const [votantes, setVotantes] = useState(organizacion.votantes || []);

  const inputStyle = {
    fontFamily: 'Bebas Neue',
    width: '100%',
    padding: '12px',
    fontSize: '20px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  };

  const [nuevoVotante, setNuevoVotante] = useState({
    nombre: '',
    cedula: ''
  });

  const generarCodigoUnico = () => {
    let codigo;
    let existe;
    do {
      codigo = Math.floor(10000 + Math.random() * 90000).toString(); // 🔥 Código aleatorio de 5 dígitos
      existe = votantes.some(v => v.codigo === codigo);
    } while (existe);
    return codigo;
  };

  const agregarVotante = () => {
    if (!nuevoVotante.nombre.trim() || !nuevoVotante.cedula.trim()) {
      alert('Por favor complete todos los campos del votante.');
      return;
    }
    const nuevoCodigo = generarCodigoUnico();
    const nuevo = { ...nuevoVotante, codigo: nuevoCodigo };
    setVotantes([...votantes, nuevo]);
    setNuevoVotante({ nombre: '', cedula: '' });
  };

  const eliminarVotante = (index) => {
    const nuevos = [...votantes];
    nuevos.splice(index, 1);
    setVotantes(nuevos);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoVotante({ ...nuevoVotante, [name]: value });
  };

  const guardarCambios = () => {
    const organizacionActualizada = { ...organizacion, votantes };
    onGuardar(organizacionActualizada);
  };

  return (
    <div style={{ textAlign: 'center', maxWidth: '700px', margin: 'auto' }}>
      <h2 style={{ fontFamily: 'Bebas Neue', fontSize: '2.5rem' }}>
        Editar Votantes de {organizacion.nombre}
      </h2>

      <div style={{ marginBottom: '2rem' }}>
        <input
          name="nombre"
          placeholder="Nombre del votante"
          value={nuevoVotante.nombre}
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="cedula"
          placeholder="Cédula"
          value={nuevoVotante.cedula}
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={agregarVotante}
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '20px',
            margin: '1rem',
            borderRadius: '7px',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Agregar Votante
        </button>
      </div>

      <h3 style={{ fontFamily: 'Bebas Neue', fontSize: '2rem' }}>Lista de Votantes Registrados</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {votantes.map((v, i) => (
          <li key={i} style={{ marginBottom: '0.7rem', fontFamily: 'Bebas Neue', fontSize: '20px' }}>
            {v.nombre} - Cédula: {v.cedula} - Código: {v.codigo}
            <button
              onClick={() => eliminarVotante(i)}
              style={{
                marginLeft: '10px',
                padding: '4px 10px',
                fontFamily: 'Bebas Neue',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '2rem' }}>
        <button
          onClick={guardarCambios}
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '25px',
            margin: '1rem',
            borderRadius: '7px',
            padding: '10px 20px'
          }}
        >
          Guardar Cambios
        </button>

        <button
          onClick={onCancelar}
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '22px',
            margin: '1rem',
            borderRadius: '7px',
            padding: '10px 20px'
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
