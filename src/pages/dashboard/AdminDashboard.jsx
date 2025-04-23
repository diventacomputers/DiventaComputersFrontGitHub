import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard admin-dashboard">
      <header>
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user?.nombre || 'Administrador'}</p>
        <button onClick={logout}>Cerrar sesión</button>
      </header>
      
      <nav className="admin-nav">
        <ul>
          <li><a href="/dashboard/admin/users">Gestión de Usuarios</a></li>
          <li><a href="/dashboard/admin/stats">Estadísticas</a></li>
          <li><a href="/dashboard/admin/settings">Configuración</a></li>
        </ul>
      </nav>
      
      <main>
        {/* Contenido específico del admin */}
        <section className="admin-stats">
          <h2>Resumen del Sistema</h2>
          {/* Widgets y estadísticas */}
        </section>
      </main>
    </div>
  );
}