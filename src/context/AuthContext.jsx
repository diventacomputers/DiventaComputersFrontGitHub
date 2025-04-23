import { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Proveedor del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar usuario al iniciar
  useEffect(() => {
    async function loadUser() {
      try {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadUser();
  }, []);

  // Función de login
  const login = async (credentials) => {
    try {
      console.log('AuthContext login called with:', credentials); // Deberías ver esto
      setLoading(true);
      const userData = await AuthService.login(credentials);
      setUser(userData.user);
      return userData;
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    AuthService.logout();
    setUser(null);
    navigate('/login');
  };

  // Verificar roles
  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  // Valor del contexto
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: hasRole('admin'),
    isClient: hasRole('cliente'),
    login,
    logout,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}