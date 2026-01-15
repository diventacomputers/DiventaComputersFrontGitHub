import { Link } from 'react-router-dom'
import Header from '../components/ui/Header'
import { useCart } from '../context/CartContext'
import '../assets/styles/CartPage.css'

const formatPrice = (value) =>
  Number(value || 0).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  })

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, totalItems, totalPrice } = useCart()

  const handleQuantityChange = (id, delta) => {
    const item = items.find((cartItem) => cartItem.id === id)
    if (!item) return
    updateQuantity(id, Math.max(1, item.quantity + delta))
  }

  const handleDirectQuantityChange = (id, value) => {
    const parsed = Number(value)
    if (Number.isNaN(parsed)) return
    updateQuantity(id, Math.min(Math.max(parsed, 1), 99))
  }

  return (
    <div className="cart-page">
      <Header />
      <div className="cart-content">
        <div className="cart-heading">
          <div>
            <p className="eyebrow">Carrito de compras</p>
            <h1>Detalle de tu compra</h1>
            <p className="subtitle">Gestiona cantidades, elimina productos o finaliza la compra.</p>
          </div>
          <Link to="/catalog" className="link-button">
            ⟵ Seguir explorando
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>Tu carrito está vacío por ahora.</p>
            <Link to="/catalog" className="primary-button">
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-media">
                    <img src={item.image} alt={item.name} />
                  </div>

                  <div className="cart-item-body">
                    <div className="cart-item-header">
                      <div>
                        <p className="pill">{item.category || 'Producto'}</p>
                        <h3>{item.name}</h3>
                        <p className="description">{item.description}</p>
                      </div>
                      <button className="ghost-button" onClick={() => removeItem(item.id)}>
                        Quitar
                      </button>
                    </div>

                    <div className="cart-item-footer">
                      <div className="quantity-control">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          max="99"
                          onChange={(e) => handleDirectQuantityChange(item.id, e.target.value)}
                        />
                        <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                      </div>

                      <div className="price-block">
                        <span>Precio unitario</span>
                        <strong>{formatPrice(item.price)}</strong>
                        <p className="line-total">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Resumen y detalle</h2>
              <div className="summary-row">
                <span>Artículos</span>
                <span>{totalItems}</span>
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>

              <button className="primary-button full-width">Finalizar compra</button>
              <button className="ghost-button full-width" onClick={clearCart}>
                Vaciar carrito
              </button>
              <p className="help-text">Los precios incluyen IVA. El envío se calcula al finalizar.</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
