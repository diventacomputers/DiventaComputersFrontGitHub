import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth();
  const userRole = user?.role;

  if (loading) {
    return <div className="loading-spinner">Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
