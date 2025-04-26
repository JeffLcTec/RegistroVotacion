import React, { useState } from 'react';

export default function FormularioOrganizacion({ onRegistrar, organizaciones, onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    registroVotantes: 'manual', // 'manual' o 'automatica'
    votantes: [] 
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

    if (!formData.nombre.trim() || !formData.tipo.trim()) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const yaExiste = organizaciones.some((i) => i.nombre === formData.nombre);
    if (yaExiste) {
      alert('Ya existe una organización registrada con ese nombre.');
      return;
    }

    onRegistrar(formData);
    setFormData({ nombre: '', tipo: '', registroVotantes: 'manual' });
  };

  // Lógica para el registro de votantes
  const registrarVotante = () => {
    if (formData.registroVotantes === 'automatica') {
      // Aquí puedes agregar la lógica de cómo se agregan los votantes automáticamente
      alert("Votante registrado automáticamente a la organización");
    } else {
      // Para "manual", pedimos que se registre a mano
      alert("Por favor, registra el votante manualmente");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h2>Formulario Organización</h2>

      <input
        name="nombre"
        placeholder="Nombre de la organización"
        value={formData.nombre}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="tipo"
        placeholder="Tipo de organización (p.ej. Colegio, Universidad)"
        value={formData.tipo}
        onChange={handleChange}
        style={inputStyle}
      />

      <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <p style={{ fontFamily: 'Bebas Neue', fontSize: '20px' }}>
          ¿Cómo se registran los votantes?
        </p>
        <label style={{ fontFamily: 'Bebas Neue', fontSize: '18px' }}>
          <input
            type="radio"
            name="registroVotantes"
            value="manual"
            checked={formData.registroVotantes === 'manual'}
            onChange={handleChange}
          />
          Los votantes se registran por su cuenta
        </label>
        <br />
        <label style={{ fontFamily: 'Bebas Neue', fontSize: '18px' }}>
          <input
            type="radio"
            name="registroVotantes"
            value="automatica"
            checked={formData.registroVotantes === 'automatica'}
            onChange={handleChange}
          />
          Los votantes ya están registrados por la organización
        </label>
      </div>

      {/* Mostrar botón 'Registrar votante' solo si el registro es automático */}
      {formData.registroVotantes === 'automatica' && (
        <button
          type="button"
          onClick={registrarVotante}
          style={{ fontFamily: 'Bebas Neue', fontSize: '18px', margin: '1rem', borderRadius: '7px' }}
        >
          Registrar Votante
        </button>
      )}

      {/* Botón común para registrar la organización */}
      <button type="submit" style={{ fontFamily: 'Bebas Neue', fontSize: '25px', margin: '1rem', borderRadius: '7px' }}>
        Registrar Organización
      </button>

      <button type="button" onClick={onCancelar} style={{ fontFamily: 'Bebas Neue', fontSize: '22px', borderRadius: '7px' }}>
        Cancelar
      </button>
    </form>
  );
}
