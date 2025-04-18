import React from 'react';
import { useState } from 'react';

export default function RegistroPersona({ onRegistrar }) {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('votante');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === '') return;
    onRegistrar({ nombre, tipo });
    setNombre('');
  };

  return (
    <form onSubmit={handleSubmit} className="registro">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="votante">Votante</option>
        <option value="candidato">Candidato</option>
      </select>
      <button type="submit">Registrar</button>
    </form>
  );
}
