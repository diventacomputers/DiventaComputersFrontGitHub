import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';


export default function Login() {
  const navigate = useNavigate();
  const { login, loading: authLoading } = useAuth(); // Usamos el hook useAuth
  const [error, setError] = useState('');

  const handleLogin = async (credentials) => {
    try {
      console.log('Login attempt with:'); // Para depuración
      setError('');
      const data = await login(credentials); // obtener { user, token }

      if (data.user.role === 'admin') {
        navigate('/dashboard/admin');
      } else if (data.user.role === 'cliente') {
        navigate('/dashboard/cliente');
      } else {
        navigate('/home'); // fallback por si hay un rol desconocido
      }
    } catch (err) {
      setError(err.message || 'Credenciales incorrectas. Inténtalo de nuevo.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-vibe">
        {}
      </div>

      <div className="login-page">
        <Link to="/home" >
        <div className="logoIcon">
          <img src="assets/images/logoIcon.png" alt="Logo" />
        </div>
        </Link>
        <h1>Iniciar Sesión</h1>

        {error && <div className="error-message">{error}</div>}

        <LoginForm
          onSubmit={handleLogin}
          isLoading={authLoading} // Usamos el loading del contexto
        />

        <div className="forgot-password">
          <Link to="/forgot-password">¿Olvidaste tu contraseña? Recuperar</Link>
        </div>

        <div className="separator">o</div>

        <SocialLoginButtons />

        <div className="register-link">
          ¿Es tu primera vez? <Link to="/register">Regístrate</Link>
        </div>
      </div>
    </div>
  );
}