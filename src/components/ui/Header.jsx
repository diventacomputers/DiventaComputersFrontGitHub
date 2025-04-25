import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/LogoIcon.png';
import { IoMdCart } from "react-icons/io";


const Header = () => {
  return (
    <header className="header">
      <div className="logo">    
        <h1 className="etiquetalogo">DiventaComputer</h1>
        <Link to="/">
          <img 
            src={Logo} 
            alt="DiventaComputers logo" 
            className="logo"
          />
        </Link>
      </div>    

      <nav className="navbar">
        <form className="buscar-form" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            name="query" 
            placeholder="Buscar ..." 
            aria-label="Buscar productos"
          />
          <button type="submit">Buscar</button>
        </form>
        
        <div className="auth-links">
          <Link to="/login" className="login-link">Iniciar Sesión</Link>
          <span>|</span>
          <Link to="/register" className="register-link">Registrarse</Link>
          <Link to="/cart" className="cart-link"> 
                <IoMdCart /> 
                (0)
          </Link>
          
        </div>
      </nav>
    </header>
  );
};

export default Header;