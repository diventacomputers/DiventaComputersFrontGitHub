import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUserRole } from '../services/authService';

export default function Dashboard() {
  const navigate = useNavigate();
  const userRole = checkUserRole();

  useEffect(() => {
    if (!userRole) {
      navigate('/login');
      return;
    }

    // Redirigir según el rol
    switch(userRole) {
      case 'admin':
        navigate('/dashboard/admin');
        break;
      case 'cliente':
        navigate('/dashboard/cliente');
        break;
      default:
        navigate('/login');
    }
  }, [userRole, navigate]);

  return null; // Componente solo para redirección
}