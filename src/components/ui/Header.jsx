import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import Logo from '../../assets/images/LogoIcon.png'
import { useCart } from '../../context/CartContext'

const Header = ({ isAdmin = false }) => {
  const { totalItems } = useCart()

  return (
    <header className={`header ${isAdmin ? 'admin-header' : ''}`}>
      <div className="logo">
        <h1 className="etiquetalogo">DiventaComputer</h1>
        <Link to={isAdmin ? '/admin' : '/'}>
          <img src={Logo} alt="DiventaComputers logo" className="logo" />
        </Link>
      </div>

      <nav className="navbar">
        {!isAdmin && (
          <>
            <form className="buscar-form">
              <input type="text" placeholder="Buscar ..." />
              <button type="submit">Buscar</button>
            </form>

            <div className="auth-links">
              <Link to="/login">Iniciar Sesión</Link>
              <span>|</span>
              <Link to="/register">Registrarse</Link>
              <Link to="/cart" className="cart-link">
                <IoMdCart /> ({totalItems})
              </Link>
            </div>
          </>
        )}

        {isAdmin && (
          <div className="admin-breadcrumb">
            <span>Panel de Administración</span>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
