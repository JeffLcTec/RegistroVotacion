import React, { useState } from 'react';

export default function FormularioProcesoVotacion({ organizaciones, onCrear, onCancelar }) {
  const [proceso, setProceso] = useState({
    nombre: '',
    sector: '',
    descripcion: '',
    organizacion: ''
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
    setProceso({ ...proceso, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!proceso.nombre.trim() || !proceso.sector.trim() || !proceso.organizacion.trim()) {
      alert('Nombre, Sector y Organización son obligatorios.');
      return;
    }

    // Si hay fechas, validar que la fecha de fin sea posterior a la de inicio
    if (proceso.fechaInicio && proceso.fechaFin) {
      const inicio = new Date(proceso.fechaInicio);
      const fin = new Date(proceso.fechaFin);
      
      if (fin < inicio) {
        alert('La fecha de finalización debe ser posterior a la fecha de inicio.');
        return;
      }
    }

    onCrear(proceso);
    // Resetear el formulario
    setProceso({
      nombre: '',
      sector: '',
      descripcion: '',
      organizacion: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto', textAlign: 'center', fontFamily: 'Bebas Neue' }}>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Crear Proceso de Votación</h2>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del proceso"
        value={proceso.nombre}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <input
        type="text"
        name="sector"
        placeholder="Sector (Ej: Tecnología, Administración...)"
        value={proceso.sector}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <select
        name="organizacion"
        value={proceso.organizacion}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Seleccione una organización</option>
        {organizaciones.map((org, i) => (
          <option key={i} value={org.nombre}>{org.nombre}</option>
        ))}
      </select>

      <textarea
        name="descripcion"
        placeholder="Descripción del proceso (opcional)"
        value={proceso.descripcion}
        onChange={handleChange}
        rows={3}
        style={{ ...inputStyle, resize: 'vertical' }}
      />

      

      <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '1.5rem' }}>
        <button 
          type="submit" 
          style={{
            fontSize: '20px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Crear proceso
        </button>
        
        <button 
          type="button" 
          onClick={onCancelar}
          style={{
            fontSize: '20px',
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}