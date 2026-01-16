import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdCart } from 'react-icons/io'
import Logo from '../../assets/images/LogoIcon.png'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const Header = ({ isAdmin = false }) => {
  const { totalItems } = useCart()
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (event) => {
    event.preventDefault()
    const trimmed = searchValue.trim()

    if (trimmed.length === 0) {
      navigate('/catalog')
      return
    }

    navigate(`/catalog?search=${encodeURIComponent(trimmed)}`)
  }

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
            <form className="buscar-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Buscar productos, marcas o categorías"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />
              <button type="submit">Buscar</button>
            </form>

            <div className="auth-links">
              {isAuthenticated ? (
                <>
                  <button type="button" className="logout-button" onClick={logout}>
                    Cerrar Sesión
                  </button>
                  {user?.role === 'admin' && <Link to="/dashboard/admin">Dashboard</Link>}
                  {user?.role === 'cliente' && <Link to="/dashboard/cliente">Mi cuenta</Link>}
                </>
              ) : (
                <>
                  <Link to="/login">Iniciar Sesión</Link>
                  <span>|</span>
                  <Link to="/register">Registrarse</Link>
                </>
              )}
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
