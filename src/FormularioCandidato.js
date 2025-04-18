import React, { useState } from 'react';

export default function FormularioCandidato({
  onRegistrar,
  candidatos,
  onCancelar,
  candidatoEditando,
  organizaciones
}) {
  const [formData, setFormData] = useState(candidatoEditando || {
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    plan: '',
    ideas: '',
    organizacion: '',
    archivosAdjuntos: []
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

  const handleFileChange = (e) => {
    const archivos = Array.from(e.target.files);
    const previews = archivos.map((archivo) => ({
      nombre: archivo.name,
      tipo: archivo.type,
      url: URL.createObjectURL(archivo)
    }));
    setFormData({ ...formData, archivosAdjuntos: [...formData.archivosAdjuntos, ...previews] });
  };

  const eliminarArchivo = (nombreArchivo) => {
    const nuevosArchivos = formData.archivosAdjuntos.filter((file) => file.nombre !== nombreArchivo);
    setFormData({ ...formData, archivosAdjuntos: nuevosArchivos });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposObligatorios = ['nombre', 'apellido', 'correo', 'contraseña', 'plan', 'ideas', 'organizacion'];
    const algunoVacio = camposObligatorios.some((campo) => formData[campo].trim() === '');
    if (algunoVacio) {
      alert('Por favor complete todos los campos.');
      return;
    }

    const existe = candidatos.some((c, index) =>
      c.correo === formData.correo &&
      (!candidatoEditando || index !== candidatoEditando.index)
    );
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
      organizacion: '',
      archivosAdjuntos: []
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h2>Formulario Candidato</h2>

      <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} style={inputStyle} />
      <input name="apellido" placeholder="Apellidos" value={formData.apellido} onChange={handleChange} style={inputStyle} />
      <input name="correo" placeholder="Correo" type="email" value={formData.correo} onChange={handleChange} style={inputStyle} />
      <input name="contraseña" placeholder="Contraseña" type="password" value={formData.contraseña} onChange={handleChange} style={inputStyle} />

      {/* Select de organización */}
      <select
        name="organizacion"
        value={formData.organizacion}
        onChange={handleChange}
        style={{ ...inputStyle, fontFamily: 'Bebas Neue' }}
      >
        <option value="">Seleccione una organización</option>
        {organizaciones.map((org, i) => (
          <option key={i} value={org.nombre}>
            {org.nombre} ({org.tipo} - {org.registroVotantes})
          </option>
        ))}
      </select>

      <input name="plan" placeholder="Plan de campaña" value={formData.plan} onChange={handleChange} style={inputStyle} />
      <textarea
        name="ideas"
        placeholder="Ideas de campaña"
        value={formData.ideas}
        onChange={handleChange}
        rows={4}
        style={{
          width: '100%',
          padding: '12px',
          fontFamily: 'Bebas Neue',
          fontSize: '1.3rem',
          marginTop: '1rem',
          marginBottom: '0px',
          borderRadius: '7px',
          border: '1px solid #ccc',
          resize: 'vertical'
        }}
      />

      <input
        type="file"
        accept="image/*,application/pdf,video/*"
        multiple
        onChange={handleFileChange}
        style={inputStyle}
      />

      {formData.archivosAdjuntos.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Archivos adjuntos:</h3>
          {formData.archivosAdjuntos.map((file, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <p><strong>{file.nombre}</strong></p>
              {file.tipo.startsWith('image/') && (
                <img src={file.url} alt={file.nombre} style={{ maxWidth: '100%', borderRadius: '6px' }} />
              )}
              {file.tipo === 'application/pdf' && (
                <a href={file.url} target="_blank" rel="noreferrer">📄 Ver PDF</a>
              )}
              {file.tipo.startsWith('video/') && (
                <video controls width="100%">
                  <source src={file.url} type={file.tipo} />
                </video>
              )}
              <button
                type="button"
                onClick={() => eliminarArchivo(file.nombre)}
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '18px',
                  marginTop: '0.5rem',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '6px 12px',
                  cursor: 'pointer'
                }}
              >
                Eliminar archivo
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0px', marginTop: '1rem' }}>
        <button type="submit" style={{ fontFamily: 'Bebas Neue', fontSize: '30px', marginTop: '1rem', marginBottom: '2rem', borderRadius: '7px' }}>
          Confirmar
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
