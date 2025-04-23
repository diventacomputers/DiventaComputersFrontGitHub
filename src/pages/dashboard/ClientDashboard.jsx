import { useAuth } from '../../context/AuthContext';

export default function ClientDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard client-dashboard">
      <header>
        <h1>Mi Área Personal</h1>
        <p>Bienvenido, {user?.nombre || 'Cliente'}</p>
        <button onClick={logout}>Cerrar sesión</button>
      </header>
      
      <nav className="client-nav">
        <ul>
          <li><a href="/dashboard/client/profile">Mi Perfil</a></li>
          <li><a href="/dashboard/client/orders">Mis Pedidos</a></li>
          <li><a href="/dashboard/client/support">Soporte</a></li>
        </ul>
      </nav>
      
      <main>
        {/* Contenido específico del cliente */}
        <section className="client-overview">
          <h2>Resumen de tu cuenta</h2>
          {/* Información personalizada */}
        </section>
      </main>
    </div>
  );
}