import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProductForm from '../../components/ProductForm.jsx';
import ProductList from '../../components/ProductList.jsx';
import '../../assets/styles/AdminDashboard.css';
import Notification from '../../components/ui/Notification';
import '../../components/ui/Notification.css';
import { Link } from 'react-router-dom';

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
  const [hideInactive, setHideInactive] = useState(false);
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [newUserData, setNewUserData] = useState({
    nombre: '',
    email: '',
    password: '',
    role: 'cliente'
  });
  const [creatingUser, setCreatingUser] = useState(false);
  const URL_PRO=import.meta.env.VITE_API_URL+'/api/products/';
  const URL_USERS=import.meta.env.VITE_API_URL+'/api/users/';

  const getAuthToken = () => localStorage.getItem('token') || localStorage.getItem('authToken');

  useEffect(() => {
    if (activeSection === 'products') {
      fetchProducts();
    }
    if (activeSection === 'users') {
      fetchUsers();
    }
  }, [activeSection, showInactive]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
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
      const token = getAuthToken();
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
      const token = getAuthToken();
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
        const token = getAuthToken();
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
        const token = getAuthToken();
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
      const token = getAuthToken();
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

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const token = getAuthToken();
      const response = await fetch(URL_USERS, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        const payload = Array.isArray(data) ? data : data.data || [];
        setUsers(payload);
      } else {
        showNotification(data.message || 'Error al cargar usuarios', 'error');
      }
    } catch (error) {
      showNotification(`Error de conexión: ${error.message}`, 'error');
    } finally {
      setUsersLoading(false);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      const token = getAuthToken();
      const response = await fetch(URL_USERS + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo actualizar el rol');
      }

      showNotification('✅ Rol actualizado correctamente', 'success');
      fetchUsers();
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const newStatus = !(currentStatus ?? true);
    const action = newStatus ? 'reactivar' : 'desactivar';

    if (window.confirm(`¿Deseas ${action} este usuario?`)) {
      try {
        const token = getAuthToken();
        const response = await fetch(URL_USERS + userId, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ isActive: newStatus })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `No se pudo ${action} el usuario`);
        }

        showNotification(`✅ Usuario ${action}do correctamente`, 'success');
        fetchUsers();
      } catch (error) {
        showNotification(`❌ Error: ${error.message}`, 'error');
      }
    }
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setCreatingUser(true);
    try {
      const token = getAuthToken();
      const response = await fetch(URL_USERS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newUserData,
          name: newUserData.nombre
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo crear el usuario');
      }

      showNotification('✅ Usuario creado correctamente', 'success');
      setNewUserData({ nombre: '', email: '', password: '', role: 'cliente' });
      fetchUsers();
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    } finally {
      setCreatingUser(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Deseas eliminar este usuario?')) {
      return;
    }

    try {
      const token = getAuthToken();
      const response = await fetch(URL_USERS + userId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'No se pudo eliminar el usuario');
      }

      showNotification('✅ Usuario eliminado correctamente', 'success');
      fetchUsers();
    } catch (error) {
      showNotification(`❌ Error: ${error.message}`, 'error');
    }
  };

  const filteredActiveProducts = hideOutOfStock
    ? products.filter((product) => Number(product.stock || 0) > 0)
    : products;

  const filteredInactiveProducts = hideOutOfStock
    ? inactiveProducts.filter((product) => Number(product.stock || 0) > 0)
    : inactiveProducts;

  const filteredUsers = users.filter((currentUser) => {
    const searchText = userSearch.toLowerCase();
    const matchesSearch =
      currentUser.nombre?.toLowerCase().includes(searchText) ||
      currentUser.email?.toLowerCase().includes(searchText) ||
      currentUser.role?.toLowerCase().includes(searchText);
    const matchesRole = userRoleFilter === 'all' || currentUser.role === userRoleFilter;
    return matchesSearch && matchesRole;
  });

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
                  images: [''],
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

              <div className="product-toggle-group">
                <label className="toggle-inactive">
                  <input
                    type="checkbox"
                    checked={showInactive}
                    onChange={() => setShowInactive(!showInactive)}
                    disabled={hideInactive}
                  />
                  Mostrar productos inactivos
                </label>
                <label className="toggle-inactive">
                  <input
                    type="checkbox"
                    checked={hideInactive}
                    onChange={() => {
                      const nextValue = !hideInactive;
                      setHideInactive(nextValue);
                      if (nextValue) {
                        setShowInactive(false);
                      }
                    }}
                  />
                  Ocultar productos inactivos
                </label>
                <label className="toggle-inactive">
                  <input
                    type="checkbox"
                    checked={hideOutOfStock}
                    onChange={() => setHideOutOfStock(!hideOutOfStock)}
                  />
                  Ocultar productos sin stock
                </label>
              </div>
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
                  products={filteredActiveProducts}
                  onEdit={setEditingProduct}
                  onToggleStatus={handleToggleStatus}
                  isLoading={isLoading}
                />

                {showInactive && !hideInactive && filteredInactiveProducts.length > 0 && (
                  <>
                    <h3>Productos Inactivos</h3>
                    <ProductList
                      products={filteredInactiveProducts}
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
        return (
          <section className="admin-section">
            <h2>Gestión de Usuarios</h2>
            {notification && (
              <Notification
                message={notification.text}
                type={notification.type}
                onClose={handleCloseNotification}
              />
            )}

            <form className="user-create-form" onSubmit={handleCreateUser}>
              <h3>Agregar usuario</h3>
              <div className="user-create-grid">
                <div className="form-group">
                  <label htmlFor="newUserName">Nombre</label>
                  <input
                    id="newUserName"
                    type="text"
                    value={newUserData.nombre}
                    onChange={(e) =>
                      setNewUserData((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                    placeholder="Nombre completo"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newUserEmail">Correo</label>
                  <input
                    id="newUserEmail"
                    type="email"
                    value={newUserData.email}
                    onChange={(e) =>
                      setNewUserData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="correo@empresa.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newUserPassword">Contraseña</label>
                  <input
                    id="newUserPassword"
                    type="password"
                    value={newUserData.password}
                    onChange={(e) =>
                      setNewUserData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    placeholder="********"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newUserRole">Rol</label>
                  <select
                    id="newUserRole"
                    value={newUserData.role}
                    onChange={(e) =>
                      setNewUserData((prev) => ({ ...prev, role: e.target.value }))
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="cliente">Cliente</option>
                    <option value="user">Usuario</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="add-user-btn" disabled={creatingUser}>
                {creatingUser ? 'Creando...' : '+ Crear usuario'}
              </button>
            </form>

            <div className="user-management-header">
              <div className="user-search-group">
                <label htmlFor="userSearch">Buscar</label>
                <input
                  id="userSearch"
                  type="text"
                  placeholder="Nombre, correo o rol"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </div>

              <div className="user-filter-group">
                <label htmlFor="userRoleFilter">Rol</label>
                <select
                  id="userRoleFilter"
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                >
                  <option value="all">Todos</option>
                  <option value="admin">Admin</option>
                  <option value="cliente">Cliente</option>
                  <option value="user">Usuario</option>
                </select>
              </div>
            </div>

            <div className="user-table-wrapper">
              {usersLoading ? (
                <p className="loading-text">Cargando usuarios...</p>
              ) : filteredUsers.length === 0 ? (
                <p className="empty-text">No se encontraron usuarios con los criterios seleccionados.</p>
              ) : (
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((currentUser) => {
                      const isActive = currentUser.isActive ?? currentUser.active ?? true;
                      return (
                        <tr key={currentUser._id} className={!isActive ? 'user-inactive' : ''}>
                          <td>{currentUser.nombre || currentUser.name}</td>
                          <td>{currentUser.email}</td>
                          <td>
                            <select
                              value={currentUser.role}
                              onChange={(e) => handleUpdateUserRole(currentUser._id, e.target.value)}
                            >
                              <option value="admin">Admin</option>
                              <option value="cliente">Cliente</option>
                              <option value="user">Usuario</option>
                            </select>
                          </td>
                          <td>
                            <span className={`status-badge ${isActive ? 'active' : 'inactive'}`}>
                              {isActive ? 'Activo' : 'Inactivo'}
                            </span>
                          </td>
                          <td className="user-actions">
                            <button
                              className="status-toggle"
                              onClick={() => handleToggleUserStatus(currentUser._id, isActive)}
                            >
                              {isActive ? 'Desactivar' : 'Reactivar'}
                            </button>
                            <button
                              className="delete-user-btn"
                              onClick={() => handleDeleteUser(currentUser._id)}
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        );
      case 'stats':
      default:
        return <section className="admin-section">Estadísticas...</section>;
    }
  };

  return (
    <div className="dashboard admin-dashboard">
      <header className='navbar'>
        <Link to="/home">
          <div className="logoIconDashboard" aria-label="Logo de la empresa"></div>
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
