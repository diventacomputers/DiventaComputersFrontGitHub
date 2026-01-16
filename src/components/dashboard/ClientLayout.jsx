import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/ClientDashboard.css';

const navLinkClass = ({ isActive }) =>
  `client-nav-link${isActive ? ' is-active' : ''}`;

export default function ClientLayout({ children, title, subtitle }) {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard client-dashboard">
      <header className="client-header">
        <div>
          <p className="client-eyebrow">Panel de cliente</p>
          <h1>{title}</h1>
          <p className="client-subtitle">
            {subtitle || `Hola, ${user?.nombre || 'Cliente'} 👋`}
          </p>
        </div>
        <div className="client-header-actions">
          <button onClick={logout} className="client-secondary-button">
            Cerrar sesión
          </button>
        </div>
      </header>

      <nav className="client-nav">
        <ul>
          <li>
            <NavLink to="/dashboard/cliente" className={navLinkClass} end>
              Resumen
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/client/profile" className={navLinkClass}>
              Mi Perfil
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/client/orders" className={navLinkClass}>
              Mis Pedidos
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/client/support" className={navLinkClass}>
              Soporte
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>{children}</main>
    </div>
  );
}
