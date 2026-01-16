import { useState } from 'react';
import ClientLayout from '../../../components/dashboard/ClientLayout';

const initialForm = {
  nombre: '',
  email: '',
  pedido: '',
  categoria: 'garantia',
  mensaje: ''
};

export default function ClientSupport() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('No pudimos enviar tu solicitud. Inténtalo de nuevo.');
      }

      setStatus({
        type: 'success',
        message: '¡Listo! Tu solicitud quedó registrada. Te contactaremos pronto.'
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ClientLayout title="Soporte y PQR" subtitle="Registra tu solicitud y recibe ayuda rápida.">
      <section className="client-section">
        <div className="client-section-header">
          <h2>Formulario de PQR</h2>
          <a
            className="client-primary-button"
            href="https://wa.me/573505762900"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp inmediato
          </a>
        </div>

        <form className="client-form" onSubmit={handleSubmit}>
          <div className="client-form-grid">
            <label>
              Nombre completo
              <input name="nombre" value={form.nombre} onChange={handleChange} required />
            </label>
            <label>
              Email de contacto
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Número de pedido
              <input
                name="pedido"
                value={form.pedido}
                onChange={handleChange}
                placeholder="Ej: DC-000123"
              />
            </label>
            <label>
              Tipo de solicitud
              <select name="categoria" value={form.categoria} onChange={handleChange}>
                <option value="garantia">Garantía</option>
                <option value="devolucion">Devolución</option>
                <option value="facturacion">Facturación</option>
                <option value="soporte">Soporte técnico</option>
                <option value="otros">Otros</option>
              </select>
            </label>
          </div>

          <label>
            Detalle tu solicitud
            <textarea
              name="mensaje"
              rows="5"
              value={form.mensaje}
              onChange={handleChange}
              required
            />
          </label>

          <div className="client-actions">
            <button className="client-primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
            </button>
            <p className="client-helper">
              Este formulario se enviará a un agente de Servicio al Cliente.
            </p>
          </div>

          {status.message && (
            <p className={`client-status ${status.type}`}>{status.message}</p>
          )}
        </form>
      </section>
    </ClientLayout>
  );
}
