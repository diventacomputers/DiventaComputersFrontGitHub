import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      {/* Logo y navegación */}
      <nav className="flex justify-between items-center">
        {/* Menú de navegación (puedes agregar más enlaces aquí si los tienes) */}
        <div>
          <Link to="/" className="text-xl font-bold text-gray-800">
            Bienvenidos a Diventacomputers {/* Reemplaza con el nombre de tu aplicación o logo */}
          </Link>
        </div>
        <div>
          <Link to="/login" className="text-blue-600 hover:underline mr-4">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;