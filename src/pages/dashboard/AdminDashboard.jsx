import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/ProductForm.jsx';
import '../../assets/styles/AdminDashboard.css'; // Estilos específicos
import Notification from '../../components/ui/Notification';
import '../../components/ui/Notification.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('stats'); // 'stats', 'users', 'products'
  const [notification, setNotification] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000); // La notificación se cierra después de 3 segundos
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleCreateProduct = async (productData) => {
    setValidationErrors({}); // Limpiar errores previos

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...productData,
          specs: {
            Condicion: productData.specs.Condicion,
            Marca: productData.specs.Marca,
            Garantia: productData.specs.Garantia
          }
        })
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setValidationErrors(result.errors);
          showNotification(result.message || 'Error al crear el producto. Revisa los campos.', 'error');
        } else {
          showNotification(result.message || 'Error al crear el producto', 'error');
        }
        return;
      }

      showNotification(`✅ Producto "${result.data.name}" creado exitosamente`, 'success');

      // Resetear la página después de un breve delay para mostrar la notificación
      setTimeout(() => {
        window.location.reload(); // Recarga la página
      }, 1500);

    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'products':
        return (
          <section className="admin-section">
            <h2>Gestión de Productos</h2>
            {notification && (
              <Notification
                message={notification.text}
                type={notification.type}
                onClose={handleCloseNotification}
              />
            )}
            <ProductForm onSubmit={handleCreateProduct} errors={validationErrors} />
          </section>
        );
      case 'users':
        return <section className="admin-section">Gestión de Usuarios...</section>;
      case 'stats':
      default:
        return <section className="admin-section">Estadísticas...</section>;
    }
  };

  return (
    <div className="dashboard admin-dashboard">
      <header>
        <h1>Panel de Administración</h1>
        <p>Bienvenido, {user?.nombre || 'Administrador'}</p>
        <button onClick={logout} className="logout-btn">Cerrar sesión</button>
      </header>

      <nav className="admin-nav">
        <ul>
          <li>
            <button
              onClick={() => setActiveSection('stats')}
              className={activeSection === 'stats' ? 'active' : ''}
            >
              Estadísticas
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('users')}
              className={activeSection === 'users' ? 'active' : ''}
            >
              Usuarios
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('products')}
              className={activeSection === 'products' ? 'active' : ''}
            >
              Productos
            </button>
          </li>
        </ul>
      </nav>

      <main>
        {renderSection()}
      </main>
    </div>
  );
}