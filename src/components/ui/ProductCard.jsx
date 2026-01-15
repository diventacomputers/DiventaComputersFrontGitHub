import React, { useEffect, useMemo, useState } from "react"
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
  const baseProduct = product?.attributes || product
  const productId = baseProduct?.id || product?.id
  const galleryImages = useMemo(() => {
    const images = Array.isArray(baseProduct?.images) ? baseProduct.images : []
    if (images.length > 0) {
      return images
    }
    if (baseProduct?.image) {
      return [baseProduct.image]
    }
    return ["/placeholder.png"]
  }, [baseProduct])
  const [activeImage, setActiveImage] = useState(galleryImages[0])
  const isActive = baseProduct?.isActive !== false
  const { addItem } = useCart()

  useEffect(() => {
    setActiveImage(galleryImages[0])
  }, [galleryImages])

  const handleAddToCart = () => {
    if (!isActive) return
    addItem({
      ...baseProduct,
      id: productId,
      image: galleryImages[0],
      images: galleryImages
    })
  }

  return (
    <div className={`product-card ${!isActive ? "inactive" : ""}`}>
      <div className="card-media">
        <img
          src={activeImage}
          alt={baseProduct?.name}
          className="product-image"
          style={!isActive ? { opacity: 0.6 } : {}}
        />
        <div className="price-chip">{formatPrice(baseProduct?.price)}</div>
        <div className="badge-stack">
          <span className="pill success">{baseProduct?.category || "Nuevo"}</span>
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

      {galleryImages.length > 1 && (
        <div className="thumbnail-strip">
          {galleryImages.map((image, index) => (
            <button
              key={`${productId}-thumb-${index}`}
              type="button"
              className={`thumbnail-button ${activeImage === image ? "active" : ""}`}
              onClick={() => setActiveImage(image)}
              aria-label={`Ver imagen ${index + 1} de ${baseProduct?.name}`}
            >
              <img src={image} alt={`${baseProduct?.name} ${index + 1}`} />
            </button>
          ))}
        </div>
      )}

      <div className="product-info">
        <h3 className="product-name">{baseProduct?.name}</h3>
        <p className="product-description">{baseProduct?.description}</p>

        <div className="product-meta">
          <div className="meta-item">
            <FiTrendingUp />
            <span>{baseProduct?.specs?.procesador || "Alto rendimiento"}</span>
          </div>
          <div className="meta-item">
            <FiShoppingBag />
            <span>{baseProduct?.specs?.almacenamiento || "Entrega inmediata"}</span>
          </div>
        </div>

        <div className="product-footer">
          <Link
            to={`/product/${productId}`}
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
