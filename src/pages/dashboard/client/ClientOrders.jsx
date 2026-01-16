import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientLayout from '../../../components/dashboard/ClientLayout';
import ProductCard from '../../../components/ui/ProductCard';

export default function ClientOrders() {
  const [orders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL_PRO = `${import.meta.env.VITE_API_URL}/api/products`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(URL_PRO);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data.data || []);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    if (orders.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [URL_PRO, orders.length]);

  const recommendedProducts = useMemo(() => products.slice(0, 6), [products]);

  return (
    <ClientLayout title="Mis pedidos" subtitle="Revisa el historial y el estado de tus compras.">
      <section className="client-section">
        <h2>Historial de pedidos</h2>

        {orders.length > 0 ? (
          <div className="client-orders">
            {orders.map((order) => (
              <article key={order.id} className="client-order-card">
                <div>
                  <h3>Pedido #{order.id}</h3>
                  <p>Estado: {order.status}</p>
                  <p>Fecha: {order.date}</p>
                </div>
                <div>
                  <p>Total: ${order.total}</p>
                  <button className="client-secondary-button" type="button">
                    Ver detalle
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="client-empty-state">
            <h3>No tienes pedidos todavía</h3>
            <p>
              Descubre productos recomendados para equipar tu espacio de trabajo
              o gaming.
            </p>
          </div>
        )}
      </section>

      {orders.length === 0 && (
        <section className="client-section">
          <div className="client-section-header">
            <h2>Recomendados para ti</h2>
            <Link className="client-link" to="/catalog">
              Explorar catálogo →
            </Link>
          </div>
          {loading ? (
            <p className="client-status">Cargando recomendaciones...</p>
          ) : (
            <div className="client-recommended-grid">
              {recommendedProducts.length === 0 ? (
                <p className="client-status">No hay productos disponibles.</p>
              ) : (
                recommendedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          )}
        </section>
      )}
    </ClientLayout>
  );
}
