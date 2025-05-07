
import "../../assets/styles/ProductCard.css";
import React from "react";
import { Link } from "react-router-dom";


const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <Link to={`/product/${product.id}`} className="product-button">
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;