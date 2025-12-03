import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import ClientDashboard from './pages/dashboard/ClientDashboard'
import { AuthProvider } from './context/AuthContext'
import NotAuthorized from './pages/NotAuthorized'
import CatalogPage from './pages/CatalogPage'
import ProductDetailPage from './pages/ProductDetailPage'
import { CartProvider } from './context/CartContext'
import CartPage from './pages/CartPage'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AuthProvider>
          <Routes>
            <Route path="/not-authorized" element={<NotAuthorized />} />
            {/* Ruta principal del dashboard que redirige */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* Dashboard de admin */}
            <Route
              path="/dashboard/admin"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />

            {/* Dashboard de cliente */}
            <Route
              path="/dashboard/cliente"
              element={
                <PrivateRoute allowedRoles={['cliente']}>
                  <ClientDashboard />
                </PrivateRoute>
              }
            />

            {/* Redirección automática desde / a /home */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>

          <a
            href="https://wa.me/573505762900"
            className="whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar por WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </AuthProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
