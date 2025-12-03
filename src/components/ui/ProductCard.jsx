import React from "react"
import { Link } from "react-router-dom"
import { FiShoppingBag, FiTrendingUp } from "react-icons/fi"
import { useCart } from "../../context/CartContext"
import "../../assets/styles/ProductCard.css"

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  })

const ProductCard = ({ product }) => {
  const isActive = product.isActive !== false
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!isActive) return
    addItem(product)
  }

  return (
    <div className={`product-card ${!isActive ? "inactive" : ""}`}>
      <div className="card-media">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          style={!isActive ? { opacity: 0.6 } : {}}
        />
        <div className="price-chip">{formatPrice(product.price)}</div>
        <div className="badge-stack">
          <span className="pill success">{product.category || "Nuevo"}</span>
          <span className={`pill status ${isActive ? "on" : "off"}`}>
            {isActive ? "Disponible" : "Agotado"}
          </span>
        </div>

        {!isActive && (
          <div className="inactive-overlay">
            <span className="inactive-badge">NO DISPONIBLE</span>
          </div>
        )}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <div className="meta-item">
            <FiTrendingUp />
            <span>{product.specs?.procesador || "Alto rendimiento"}</span>
          </div>
          <div className="meta-item">
            <FiShoppingBag />
            <span>{product.specs?.almacenamiento || "Entrega inmediata"}</span>
          </div>
        </div>

        <div className="product-footer">
          <Link
            to={`/product/${product.id}`}
            className={`product-button ghost ${!isActive ? "disabled-link" : ""}`}
            onClick={!isActive ? (e) => e.preventDefault() : undefined}
          >
            Ver más
          </Link>
          <button
            className="product-button primary"
            disabled={!isActive}
            onClick={handleAddToCart}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
