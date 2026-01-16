import { useState } from 'react';
import ClientLayout from '../../../components/dashboard/ClientLayout';
import { useAuth } from '../../../context/AuthContext';

const emptyAddress = {
  calle: '',
  ciudad: '',
  provincia: '',
  codigoPostal: ''
};

export default function ClientProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    nombre: user?.nombre || '',
    apellido: user?.apellido || '',
    email: user?.email || '',
    telefono: user?.telefono || '',
    documento: user?.documento || '',
    direccion: user?.direccion || emptyAddress,
    preferencias: {
      promociones: true,
      novedades: false
    }
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name.startsWith('direccion.')) {
      const field = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [field]: value
        }
      }));
      return;
    }

    if (name.startsWith('preferencias.')) {
      const field = name.split('.')[1];
      setProfile((prev) => ({
        ...prev,
        preferencias: {
          ...prev.preferencias,
          [field]: type === 'checkbox' ? checked : value
        }
      }));
      return;
    }

    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatusMessage('Tus datos fueron actualizados localmente. (Pendiente de integrar backend)');
  };

  return (
    <ClientLayout title="Mi Perfil" subtitle="Actualiza tu información y preferencias de compra.">
      <section className="client-section">
        <div className="client-section-header">
          <h2>Información personal</h2>
          <span className="client-badge">Verificado</span>
        </div>
        <form className="client-form" onSubmit={handleSubmit}>
          <div className="client-form-grid">
            <label>
              Nombre
              <input name="nombre" value={profile.nombre} onChange={handleChange} />
            </label>
            <label>
              Apellido
              <input name="apellido" value={profile.apellido} onChange={handleChange} />
            </label>
            <label>
              Email
              <input name="email" type="email" value={profile.email} onChange={handleChange} />
            </label>
            <label>
              Teléfono
              <input name="telefono" value={profile.telefono} onChange={handleChange} />
            </label>
            <label>
              Documento
              <input name="documento" value={profile.documento} onChange={handleChange} />
            </label>
          </div>

          <div className="client-section-header">
            <h3>Dirección principal</h3>
          </div>
          <div className="client-form-grid">
            <label>
              Calle
              <input
                name="direccion.calle"
                value={profile.direccion.calle}
                onChange={handleChange}
              />
            </label>
            <label>
              Ciudad
              <input
                name="direccion.ciudad"
                value={profile.direccion.ciudad}
                onChange={handleChange}
              />
            </label>
            <label>
              Provincia
              <input
                name="direccion.provincia"
                value={profile.direccion.provincia}
                onChange={handleChange}
              />
            </label>
            <label>
              Código postal
              <input
                name="direccion.codigoPostal"
                value={profile.direccion.codigoPostal}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="client-section-header">
            <h3>Preferencias</h3>
          </div>
          <div className="client-preferences">
            <label>
              <input
                type="checkbox"
                name="preferencias.promociones"
                checked={profile.preferencias.promociones}
                onChange={handleChange}
              />
              Quiero recibir promociones exclusivas
            </label>
            <label>
              <input
                type="checkbox"
                name="preferencias.novedades"
                checked={profile.preferencias.novedades}
                onChange={handleChange}
              />
              Envíame novedades de productos
            </label>
          </div>

          <div className="client-actions">
            <button className="client-primary-button" type="submit">
              Guardar cambios
            </button>
            <button className="client-secondary-button" type="button">
              Cambiar contraseña
            </button>
          </div>

          {statusMessage && <p className="client-status">{statusMessage}</p>}
        </form>
      </section>
    </ClientLayout>
  );
}
