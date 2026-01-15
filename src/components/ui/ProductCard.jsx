import React, { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
  const [isHovering, setIsHovering] = useState(false)
  const isActive = baseProduct?.isActive !== false
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    setActiveImage(galleryImages[0])
  }, [galleryImages])

  useEffect(() => {
    if (!isHovering || galleryImages.length <= 1) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setActiveImage((current) => {
        const currentIndex = galleryImages.indexOf(current)
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % galleryImages.length : 0
        return galleryImages[nextIndex]
      })
    }, 1200)

    return () => clearInterval(intervalId)
  }, [galleryImages, isHovering])

  const handleAddToCart = () => {
    if (!isActive) return
    addItem({
      ...baseProduct,
      id: productId,
      image: galleryImages[0],
      images: galleryImages
    })
  }

  const handleCardClick = () => {
    if (!isActive) return
    navigate(`/product/${productId}`)
  }

  return (
    <div
      className={`product-card ${!isActive ? "inactive" : ""} clickable`}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          handleCardClick()
        }
      }}
    >
      <div
        className="card-media"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
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
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveImage(image)
                }}
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
            onClick={(event) => {
              event.stopPropagation()
              if (!isActive) {
                event.preventDefault()
              }
            }}
          >
            Ver más
          </Link>
          <button
            className="product-button primary"
            disabled={!isActive}
            onClick={(event) => {
              event.stopPropagation()
              handleAddToCart()
            }}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
