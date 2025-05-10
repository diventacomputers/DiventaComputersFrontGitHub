import "../../assets/styles/ProductCard.css";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const isActive = product.isActive !== false; // Considera undefined/null como activo

  return (
    <div className={`product-card ${!isActive ? 'inactive' : ''}`}>
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        style={!isActive ? { opacity: 0.6 } : {}}
      />
      
      {!isActive && (
        <div className="inactive-overlay">
          <span className="inactive-badge">NO DISPONIBLE</span>
        </div>
      )}

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price.toLocaleString()}</span>
          <Link 
            to={`/product/${product.id}`} 
            className={`product-button ${!isActive ? 'disabled-link' : ''}`}
            onClick={!isActive ? (e) => e.preventDefault() : undefined}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;