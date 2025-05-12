import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/ProductForm.jsx';
import ProductList from '../../components/ProductList.jsx';
import '../../assets/styles/AdminDashboard.css';
import Notification from '../../components/ui/Notification';
import '../../components/ui/Notification.css';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/LogoIcon.png';
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('stats');
  const [notification, setNotification] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inactiveProducts, setInactiveProducts] = useState([]);
  const [showInactive, setShowInactive] = useState(false);
  const URL_PRO=import.meta.env.VITE_API_URL+'/products/';

  useEffect(() => {
    if (activeSection === 'products') {
      fetchProducts();
    }
  }, [activeSection, showInactive]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(URL_PRO, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        // Filtrar productos activos e inactivos
        setProducts(data.data.filter(product => product.isActive !== false));
        setInactiveProducts(data.data.filter(product => product.isActive === false));
      } else {
        showNotification(data.message || 'Error al cargar productos', 'error');
      }
    } catch (error) {
      showNotification(`Error de conexión: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleCreateProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(URL_PRO, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...productData,
          isActive: true, // Asegurar que nuevos productos estén activos
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
        }
        showNotification(result.message || 'Error al crear el producto', 'error');
        return;
      }

      showNotification('✅ Producto creado exitosamente', 'success');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  };

  const handleUpdateProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      const url = URL_PRO+editingProduct._id;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          setValidationErrors(result.errors);
        }
        showNotification(result.message || 'Error al actualizar el producto', 'error');
        return;
      }

      showNotification('✅ Producto actualizado exitosamente', 'success');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  };

  const handleProductSubmit = async (productData) => {
    setValidationErrors({});
    if (editingProduct?._id) {
      await handleUpdateProduct(productData);
    } else {
      await handleCreateProduct(productData);
    }
  };

  const handleToggleStatus = async (productId, currentStatus) => {
    const newStatus = !currentStatus;
    const action = newStatus ? 'reactivar' : 'desactivar';

    if (window.confirm(`¿Estás seguro de ${action} este producto?`)) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(URL_PRO+productId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            isActive: newStatus
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || `Error al ${action} el producto`);
        }

        showNotification(`✅ Producto ${action}do correctamente`, 'success');
        fetchProducts();
      } catch (error) {
        showNotification(`❌ Error: ${error.message}`, 'error');
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de desactivar este producto?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(URL_PRO+productId, {
          method: 'PUT', // Cambiado de DELETE a PUT
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            isActive: false // Enviamos el campo para desactivar
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || 'Error al desactivar el producto');
        }

        showNotification('✅ Producto desactivado correctamente', 'success');
        fetchProducts(); // Refrescar la lista
      } catch (error) {
        showNotification(`❌ Error: ${error.message}`, 'error');
      }
    }
  };

  const handleReactivateProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(URL_PRO+productId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isActive: true
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error al reactivar el producto');
      }

      showNotification('✅ Producto reactivado correctamente', 'success');
      fetchProducts();
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  };

  const handleEditClick = (product) => {
    const productToEdit = {
      ...product,
      price: product.price.toString(),
      stock: product.stock.toString()
    };
    setEditingProduct(productToEdit);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setValidationErrors({});
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

            <div className="product-management-options">
              <button
                onClick={() => setEditingProduct({
                  name: '',
                  price: '',
                  description: '',
                  category: 'component',
                  stock: '',
                  image: '',
                  specs: {
                    Condicion: 'Nuevo',
                    Marca: '',
                    Garantia: ''
                  },
                  isActive: true
                })}
                className="add-product-btn"
              >
                + Añadir Nuevo Producto
              </button>

              <label className="toggle-inactive">
                <input
                  type="checkbox"
                  checked={showInactive}
                  onChange={() => setShowInactive(!showInactive)}
                />
                Mostrar productos inactivos
              </label>
            </div>

            {editingProduct ? (
              <>
                <h3>{editingProduct._id ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                <ProductForm
                  onSubmit={handleProductSubmit}
                  errors={validationErrors}
                  product={editingProduct}
                  onCancel={() => {
                    setEditingProduct(null);
                    setValidationErrors({});
                  }}
                />
              </>
            ) : (
              <>
                <ProductList
                  products={products}
                  onEdit={setEditingProduct}
                  onToggleStatus={handleToggleStatus}
                  isLoading={isLoading}
                />

                {showInactive && inactiveProducts.length > 0 && (
                  <>
                    <h3>Productos Inactivos</h3>
                    <ProductList
                      products={inactiveProducts}
                      onEdit={setEditingProduct}
                      onToggleStatus={handleToggleStatus}
                      isLoading={isLoading}
                      isInactive
                    />
                  </>
                )}
              </>
            )}
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
      <header className='navbar'>
      <Link to="/home" >
        <div className="logoIcon" style={{ cursor: 'pointer' }}>
          <img src={Logo} alt="Logo" />
        </div>
        </Link>
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