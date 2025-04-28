import React from 'react';
import { useState } from 'react';

export default function FormularioVotante({ onRegistrar, votantes, onCancelar, candidatos }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: ''
  });

  const inputStyle = {
    fontFamily: 'Bebas Neue',
    width: '100%',
    padding: '12px',
    fontSize: '20px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => val.trim() === '')) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Verificar que la cédula tenga formato válido
    const cedulaValida = /^[1-7]0\d{3}0\d{3}$/.test(formData.cedula);
    if (!cedulaValida) {
    alert('La cédula no tiene un formato válido. ej. 101110111');
    return;
    }

    const duplicado = votantes.some((v) => v.cedula === formData.cedula);
    if (duplicado) {
      alert('Ya existe un votante registrado con esta cédula.');
      return;
    }

    onRegistrar(formData);
    setFormData({ nombre: '', apellido: '', cedula: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h2>Formulario Votante</h2>

      <input
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="apellido"
        placeholder="Apellido"
        value={formData.apellido}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="cedula"
        placeholder="Cédula Nacional (Ej: 101110111)"
        value={formData.cedula}
        onChange={handleChange}
        style={inputStyle}
        maxLength={9}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', marginTop: '1rem' }}>
        <button
          type="submit"
          style={{ fontFamily: 'Bebas Neue', fontSize: '30px', marginTop: '1rem', marginBottom: '2rem', borderRadius: '7px' }}
        >
          Registrar Votante
        </button>

        <button
          type="button"
          onClick={onCancelar}
          style={{ fontFamily: 'Bebas Neue', fontSize: '25px', marginTop: '1px', marginBottom: '2rem', borderRadius: '7px', cursor: 'pointer' }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
