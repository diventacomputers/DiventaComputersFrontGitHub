import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function LoginForm({ onSubmit, isLoading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }
    console.log('Form submitted', { email, password }); // Para depuración
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Input
        type="email"
        label="Correo Electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      
      <div className="password-field">
        <Input
          type={showPassword ? 'text' : 'password'}
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
          disabled={isLoading}
        >
          {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
        </button>
      </div>
      
      <Button 
        type="submit" 
        className="primary-button"
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando sesión...' : 'Continuar'}
      </Button>
    </form>
  );
}