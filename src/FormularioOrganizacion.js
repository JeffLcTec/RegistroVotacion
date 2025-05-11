import React, { useState } from 'react';
import FormularioRegistrarVotantesOrg from './FormularioRegistrarVotantesOrg.js';


export default function FormularioOrganizacion({ onRegistrar, organizaciones, onCancelar, organizacionEditando }) {

  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    registroVotantes: 'publica', // 'publica' o 'privada'
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
  const [votantesOrg, setVotantes] = useState([]);
  const [mostrarFormularioVotantes, setMostrarFormularioVotantes] = useState(false);

  const [votantesFinales, setVotantesFinales] = useState([]);


  const manejarRegistroVotantes = (votantes) => {
    setVotantesFinales(votantes);
    console.log('Votantes recibidos:', votantes); // podés almacenarlos, enviarlos al backend, etc.
    alert('Votantes registrados con éxito');
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

    const yaExiste = organizaciones.some((i) =>
      i.nombre === formData.nombre && (!organizacionEditando || i.nombre !== organizacionEditando.nombre)
    );
    if (yaExiste) {
      alert('Ya existe una organización registrada con ese nombre.');
      return;
    }

    // Mandamos toda la organización con sus votantes incluidos
    const organizacionConVotantes = {
      ...formData,
      votantes: votantesFinales // <--- Aquí agregamos la lista de votantes a la organización
    };
    onRegistrar(organizacionConVotantes);
    setFormData({ nombre: '', tipo: '', registroVotantes: 'publica' });
    setVotantesFinales([]); 
  };

  // Lógica para el registro de votantes
  const registrarVotante = () => {
    if (formData.registroVotantes === 'privada') {
      // Aquí puedes agregar la lógica de cómo se agregan los votantes automáticamente
      alert("Votante registrado automáticamente a la organización");
    } else {
      // Para "publica", pedimos que se registre a mano
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
          Selecciona el tipo de organización
        </p>
        <label style={{ fontFamily: 'Bebas Neue', fontSize: '18px' }}>
          <input
            type="radio"
            name="registroVotantes"
            value="publica"
            checked={formData.registroVotantes === 'publica'}
            onChange={handleChange}
          />
          Organización publica
        </label>
        <br />
        <label style={{ fontFamily: 'Bebas Neue', fontSize: '18px' }}>
          <input
            type="radio"
            name="registroVotantes"
            value="privada"
            checked={formData.registroVotantes === 'privada'}
            onChange={handleChange}
          />
          Organización Privada
        </label>

      </div>
      {formData.registroVotantes === 'privada'  && (
  <FormularioRegistrarVotantesOrg
    onRegistrar={manejarRegistroVotantes}
    onCancelar={() => setMostrarFormularioVotantes(false)}
  />
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
