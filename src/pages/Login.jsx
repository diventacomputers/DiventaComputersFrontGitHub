import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';

export default function Login() {
  const handleLogin = (credentials) => {
    console.log('Login attempt:', credentials);
    // Aquí llamarías al servicio de autenticación
  };

  return (
    <div className="login-container">

        <div className="login-vibe">
          
        </div>

      
        <div className="login-page">
          
          <div className="logoIcon">
            <img src="./src/assets/images/LogoIcon.png" alt="Logo"  />
          </div>
          <h1>Iniciar Sesión</h1>
          
          <LoginForm onSubmit={handleLogin} />
          
          <div className="forgot-password">
            <Link to="/forgot-password">¿Olvidaste tu contraseña? Recuperar</Link>
          </div>
          
          <div className="separator">o</div>
          
          <SocialLoginButtons />
          
          <div className="register-link">
            ¿Es tu primera vez? <Link to="/register">Registrate</Link>
          </div>
        </div>

    </div>
  );
}