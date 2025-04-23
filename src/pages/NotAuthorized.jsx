import { Link } from 'react-router-dom';

export default function NotAuthorized() {
  return (
    <div className="not-authorized">
      <h1>403 - Acceso no autorizado</h1>
      <p>No tienes permisos para acceder a esta página.</p>
      <Link to="/home" className="back-link">
        Volver al dashboard
      </Link>
    </div>
  );
}