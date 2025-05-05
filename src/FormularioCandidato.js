import React, { useState } from 'react';


export default function FormularioCandidato({
  onRegistrar,
  candidatos,
  onCancelar,
  candidatoEditando,
  organizaciones,
  procesos,
  campañas,
  setCampañas
}) {
  const [formData, setFormData] = useState(candidatoEditando || {
    nombre: '',
    apellido: '',
    correo: '',
    contraseña: '',
    plan: '',
    ideas: '',
    organizacion: '',
    proceso: '',
    campaña: '',
    puesto: '',
    archivosAdjuntos: []
  });


  const [modoCampaña, setModoCampaña] = useState(null);
  const [campañaSeleccionada, setCampañaSeleccionada] = useState('');
  const [puesto, setPuesto] = useState('');
  
  
  

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
    const camposObligatorios = ['nombre', 'apellido', 'correo', 'contraseña','organizacion', "proceso"];
    const algunoVacio = camposObligatorios.some((campo) => formData[campo].trim() === '');

    if (algunoVacio) {
      alert('Por favor complete todos los campos.');
      return;
    }
    if (modoCampaña === 'existente' && (!campañaSeleccionada || !puesto)) {
      alert('Debe seleccionar una campaña y un puesto.');
      return;

    }
    if (modoCampaña === 'nueva' && !formData.campaña.trim()) {
      alert('Debe indicar el nombre de la nueva campaña.');
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

    if (modoCampaña === 'existente') {
      const actualizadas = campañas.map((campaña) => {
        if (campaña.nombre === campañaSeleccionada) {
          return {
            ...campaña,
            miembros: [...campaña.miembros, {
              puesto,
              correo: formData.correo,
              nombre: formData.nombre+' ' + formData.apellido
            }]
            
          };
        }
        return campaña;
      });
      setCampañas(actualizadas);
    }
    
    if (modoCampaña === 'nueva') {
      const yaExiste = campañas.some(c => c.nombre === formData.campaña);
      if (!yaExiste) {
        setCampañas([
          ...campañas,
          {
            nombre: formData.campaña,
            proceso: formData.proceso,
            miembros: [{
              puesto: puesto,
              correo: formData.correo,
              nombre: formData.nombre,
              apellido: formData.apellido
            }]
          }
        ]);
      } else {
        setCampañas(campañas.map(c => {
          if (c.nombre === formData.campaña) {
            return {
              ...c,
              miembros: [
                ...c.miembros,
                {
                  puesto: puesto,
                  correo: formData.correo,
                  nombre: formData.nombre,
                  apellido: formData.apellido
                }
              ]
            };
          }
          return c;
        }));
      }
    }
    
    const finalFormData = {
      ...formData,
      campaña: modoCampaña === 'nueva' ? formData.campaña : campañaSeleccionada,
      puesto: modoCampaña === 'nueva' ? puesto : puesto
    };

    onRegistrar(finalFormData);

    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      contraseña: '',
      plan: '',
      ideas: '',
      organizacion: '',
      campaña: '',
      puesto: '',
      archivosAdjuntos: []
    });
    setModoCampaña(null);
    setCampañaSeleccionada('');
    setPuesto('');
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

      <select
        name="proceso"
        value={formData.proceso}
        onChange={handleChange}
        style={{ ...inputStyle, fontFamily: 'Bebas Neue' }}
      >
        <option value="">Seleccione un Proceso</option>
        {procesos
        .filter(p => p.organizacion === formData.organizacion) 
        .map((p, i) => (
          <option key={i} value={p.nombre}>
            {p.nombre} ({p.organizacion} - {p.sector})
          </option>
        ))}
      </select>

      {/* NUEVO: Selección de campaña */}
      <div style={{ marginBottom: '1rem' }}>
              <h3>¿Desea crear o unirse a una campaña?</h3>
              <button type="button" onClick={() => setModoCampaña('nueva')} style={{ marginRight: '1rem' }}>Crear nueva</button>
              <button type="button" onClick={() => setModoCampaña('existente')}>Unirse a una existente</button>
            </div>

            {modoCampaña === 'nueva' && (
            
              <>
                <input
                  name="campaña"
                  placeholder="Nombre de la nueva campaña"
                  value={formData.campaña}
                  onChange={handleChange}
                  style={inputStyle}
                />
              
                <select value={puesto} onChange={(e) => setPuesto(e.target.value)} style={inputStyle}>
                  <option value="">Seleccione su puesto</option>
                  {['Presidente', 'Vicepresidente', 'Tesorero', 'Secretario'].map((p, i) => (
                    <option key={i} value={p}>{p}</option>
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
                  </>
            )}

            {modoCampaña === 'existente' && (
              <>
                <select value={campañaSeleccionada} onChange={(e) => setCampañaSeleccionada(e.target.value)} style={inputStyle}>
                  <option value="">Seleccione campaña existente</option>
                  {campañas.filter(c => c.proceso === formData.proceso).map((c, i) => (
                    <option key={i} value={c.nombre}>{c.nombre}</option>
                  ))}
                </select>

                {campañaSeleccionada && (
                  <select value={puesto} onChange={(e) => setPuesto(e.target.value)} style={inputStyle}>
                    <option value="">Seleccione su puesto</option>
                    {['Presidente', 'Vicepresidente', 'Tesorero', 'Secretario'].map((p, i) => {
                      const ocupada = campañas
                        .find(c => c.nombre === campañaSeleccionada)
                        ?.miembros.some(m => m.puesto === p);
                      return (
                        <option key={i} value={p} disabled={ocupada}>
                          {p} {ocupada ? '(Ocupado)' : ''}
                        </option>
                      );
                    })}
                  </select>
                )}
                
              </>
              
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
