import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import { AuthProvider } from './context/AuthContext';
import NotAuthorized from './pages/NotAuthorized';
function App() {
  

  return (
    <>
     <BrowserRouter>
     <AuthProvider>
      
      <Routes>
      <Route path="/not-authorized" element={<NotAuthorized />} />
        {/* Ruta principal del dashboard que redirige */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        {/* Dashboard de admin */}
        <Route path="/dashboard/admin" element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRoute>
        } />

        {/* Dashboard de cliente */}
        <Route path="/dashboard/cliente" element={
          <PrivateRoute allowedRoles={['cliente']}>
            <ClientDashboard />
          </PrivateRoute>
        } />

        {/* Redirección automática desde / a /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
      </Routes>
      </AuthProvider>
    </BrowserRouter>
    
    </>
  )
}

export default App
