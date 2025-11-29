import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import "../assets/styles/Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL = import.meta.env.VITE_API_URL;
  // Estado inicial basado en el JSON de la API
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    email: '',
    password: '',
    direccion: {
      calle: '',
      ciudad: '',
      provincia: '',
      codigoPostal: ''
    },
    telefono: '',
    role: 'cliente' // Valor por defecto, puede cambiarse a 'admin' si es necesario
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Manejo de campos anidados (dirección)
    if (name.startsWith('direccion.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        direccion: {
          ...prev.direccion,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validación básica
      if (!formData.email || !formData.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // llamada a la API
      const response = await fetch(`${URL}/api/auth/register`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el registro');
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);
      
      // Redirigir después de registro exitoso
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">

      <div className="register-vibe">
          
      </div>

      <div className="register-page">

        <Link to="/home" >
        <div className="logoIcon">
          
        </div>
        </Link>

        {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
          <h3>Crear Cuenta</h3>
            <div className="form-section">
              
              <Input
                label="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <Input
                label="Apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <Input
                label="Documento"
                name="documento"
                type="number"
                value={formData.documento}
                onChange={handleChange}
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Input
                label="Teléfono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-section">
              
              <Input
                label="Dirección"
                name="direccion.calle"
                value={formData.direccion.calle}
                onChange={handleChange}
                required
              />
              <Input
                label="Ciudad"
                name="direccion.ciudad"
                value={formData.direccion.ciudad}
                onChange={handleChange}
                required
              />
              <Input
                label="Provincia"
                name="direccion.provincia"
                value={formData.direccion.provincia}
                onChange={handleChange}
                required
              />
              <Input
                label="Código Postal"
                name="direccion.codigoPostal"
                value={formData.direccion.codigoPostal}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-section">
              <label>
                Rol:
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleChange}
                  className="role-select"
                >
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
            </div>

            <Button type="submit"  className="second-button" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrarse'}
            </Button>
          </form>

          <div className="login-link">
            ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
          </div>
      </div>
    </div>
  );
}