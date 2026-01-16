import { Link } from 'react-router-dom';
import ClientLayout from '../../components/dashboard/ClientLayout';

export default function ClientDashboard() {
  return (
    <ClientLayout
      title="Mi Área Personal"
      subtitle="Gestiona tus pedidos, datos y solicitudes desde un solo lugar."
    >
      <section className="client-overview">
        <div className="client-overview-header">
          <h2>Resumen de tu cuenta</h2>
          <p>Te ayudamos a mantener todo al día para que compres sin fricciones.</p>
        </div>

        <div className="client-stats-grid">
          <article className="client-card">
            <h3>Perfil completo</h3>
            <p>Mantén tus datos actualizados para una entrega sin contratiempos.</p>
            <Link className="client-link" to="/dashboard/client/profile">
              Actualizar información →
            </Link>
          </article>
          <article className="client-card">
            <h3>Pedidos y seguimiento</h3>
            <p>Revisa el historial de compras y el estado de tus envíos.</p>
            <Link className="client-link" to="/dashboard/client/orders">
              Ver pedidos →
            </Link>
          </article>
          <article className="client-card">
            <h3>Soporte personalizado</h3>
            <p>Registra tus PQR y recibe atención prioritaria por WhatsApp.</p>
            <Link className="client-link" to="/dashboard/client/support">
              Ir a soporte →
            </Link>
          </article>
        </div>

        <div className="client-highlight">
          <div>
            <h3>Beneficios exclusivos</h3>
            <p>
              Accede a ofertas, envíos rápidos y asistencia especializada para
              equipar tu oficina o gaming setup.
            </p>
          </div>
          <Link className="client-primary-button" to="/catalog">
            Ver catálogo
          </Link>
        </div>
      </section>
    </ClientLayout>
  );
}
