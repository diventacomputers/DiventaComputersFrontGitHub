import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkUserRole } from '../services/authService';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const userRole = checkUserRole();

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}