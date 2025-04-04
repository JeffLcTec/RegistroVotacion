import { useState } from 'react';

export default function FormularioCandidato({ onRegistrar, candidatos ,onCancelar }) {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    plan: '',
    ideas: '',
    foto: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const inputStyle = {
    fontFamily: 'Bebas Neue',
    width: '100%',
    padding: '12px',
    fontSize: '20px',
    marginBottom: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc'
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos vacíos
    if (Object.values(formData).some((val) => val.trim() === '')) {
      alert('Por favor complete todos los campos.');
      return;
    }

    // Validar duplicados por correo
    const existe = candidatos.some((c) => c.correo === formData.correo);
    if (existe) {
      alert('Este correo ya ha sido registrado como candidato.');
      return;
    }

    onRegistrar(formData);
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      contraseña: '',
      plan: '',
      ideas: '',
      foto: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h2>Formulario Candidato</h2>

      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} style={inputStyle}/>
      <input name="apellido" placeholder="Apellidos" value={formData.apellido} onChange={handleChange}style={inputStyle} />
      <input name="correo" placeholder="Correo" type="email" value={formData.correo} onChange={handleChange} style={inputStyle}/>
      <input name="contraseña" placeholder="Contraseña" type="password" value={formData.contraseña} onChange={handleChange} style={inputStyle}/>
      <input name="plan" placeholder="Plan de campaña" value={formData.plan} onChange={handleChange}style={inputStyle} />
      <textarea name="ideas"  placeholder="Ideas de campaña"  value={formData.ideas}  onChange={handleChange}  rows={4}  style={{  width: '100%',   padding: '12px', fontFamily:"Bebas Neue",  fontSize: '1.3rem', marginTop:"1rem",   marginBottom: '0px',   borderRadius: '7px',   border: '1px solid #ccc',    resize: 'vertical' }}/>
      <input type="file" name="foto" accept="image/*"
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const urlTemporal = URL.createObjectURL(file);
      setFormData({ ...formData, foto: urlTemporal });
    }
  }}
  style={inputStyle}/>

    {formData.foto && (
    <div style={{ marginTop: '1rem' }}>
      <p>Previsualización:</p>
      <img
        src={formData.foto}
        alt="Foto del candidato"
        style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
      />
    </div>
  )}
  <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', gap: '0px', marginTop: '1rem' }}>
      <button type="submit" style={{ fontFamily:"Bebas neue",fontSize:"30px",  marginTop: '1rem',marginBottom:"2rem",borderRadius:"7px" }}>Registrar Candidato</button>
      <button
          type="button"
          onClick={onCancelar}
          style={{ fontFamily:"Bebas neue",fontSize:"25px",  marginTop: '1px',marginBottom:"2rem",borderRadius:"7px", cursor: 'pointer' }}
        >
          Cancelar 
        </button>
        </div>
    </form>
  );
}