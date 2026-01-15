import React, { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { FiCheckCircle, FiClock, FiCpu, FiDatabase } from "react-icons/fi"
import Header from "../components/ui/Header"
import "../assets/styles/ProductDetailPage.css"
import { useCart } from "../context/CartContext"

const API_URL = `${import.meta.env.VITE_API_URL}/api/products/`

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  })

const ProductDetailPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(null)
  const { addItem } = useCart()
  const galleryImages = useMemo(() => {
    if (!product) {
      return ["/placeholder.png"]
    }
    const images = Array.isArray(product.images) ? product.images : []
    if (images.length > 0) {
      return images
    }
    if (product.image) {
      return [product.image]
    }
    return ["/placeholder.png"]
  }, [product])

  useEffect(() => {
    setActiveImage(galleryImages[0])
  }, [galleryImages])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API_URL + id)

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const data = await response.json()
        setProduct(data.data || null)
      } catch (error) {
        console.error("Error al obtener producto:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const descriptionLines = useMemo(() => {
    if (!product?.description) {
      return []
    }
    return product.description
      .split(/\r?\n/)
      .map((line) => line.replace(/^[•-]\s*/, "").trim())
      .filter(Boolean)
  }, [product])

  const handleAddToCart = () => {
    if (!product) return
    addItem(
      {
        ...product,
        image: galleryImages[0],
        images: galleryImages
      },
      quantity
    )
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Cargando producto...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="not-found">Producto no encontrado</div>
      </div>
    )
  }

  const isActive = product.isActive !== false

  return (
    <div className="product-detail-page">
      <Header />

      <div className="product-detail-container">
        <div className="breadcrumb">
          <Link to="/catalog">Catálogo</Link> / <span>{product.name}</span>
        </div>

        <div className="product-detail">
          <div className="media-wrapper">
            <img
              src={activeImage || galleryImages[0]}
              alt={product.name}
              className="product-detail-image"
            />
            {galleryImages.length > 1 && (
              <div className="detail-thumbnail-strip">
                {galleryImages.map((image, index) => (
                  <button
                    key={`detail-thumb-${index}`}
                    type="button"
                    className={`detail-thumb ${activeImage === image ? "active" : ""}`}
                    onClick={() => setActiveImage(image)}
                    aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
            <div className="floating-tag">Garantía Diventa</div>
          </div>

          <div className="product-detail-info">
            <div className="heading">
              <p className={`status-badge ${isActive ? "on" : "off"}`}>
                {isActive ? "Disponible para envío inmediato" : "Temporalmente agotado"}
              </p>
              <h1 className="product-detail-name">{product.name}</h1>
              {descriptionLines.length > 1 ? (
                <ul className="product-detail-description">
                  {descriptionLines.map((line, index) => (
                    <li key={`desc-${index}`}>{line}</li>
                  ))}
                </ul>
              ) : (
                <p className="product-detail-description">{product.description}</p>
              )}
            </div>

            <div className="price-block">
              <span>Precio</span>
              <p className="product-detail-price">{formatPrice(product.price)}</p>
            </div>

            {product.specs && (
              <div className="product-detail-specs">
                <h2>Especificaciones</h2>
                <ul>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="highlights">
              <div>
                <FiCpu />
                <span>Listo para tareas exigentes</span>
              </div>
              <div>
                <FiDatabase />
                <span>Almacenamiento optimizado</span>
              </div>
              <div>
                <FiClock />
                <span>Entrega rápida en 48h</span>
              </div>
            </div>

            <div className="actions">
              <div className="quantity-picker">
                <span>Cantidad</span>
                <div className="quantity-control">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1}>
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    max="99"
                    onChange={(e) => setQuantity(Math.min(Math.max(Number(e.target.value) || 1, 1), 99))}
                  />
                  <button onClick={() => setQuantity((q) => Math.min(q + 1, 99))}>+</button>
                </div>
              </div>

              <button className="add-to-cart-button" onClick={handleAddToCart} disabled={!isActive}>
                <FiCheckCircle /> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
