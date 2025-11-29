import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/ui/Header";
import "../assets/styles/ProductDetailPage.css";

// URL correcta con /api
const API_URL = `${import.meta.env.VITE_API_URL}/api/products/`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(API_URL + id);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Producto recibido:", data);

        // Strapi entrega "data.data"
        setProduct(data.data || null);

      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Cargando producto...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <Header />
        <div className="not-found">Producto no encontrado</div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="product-detail-container">
        <div className="product-detail">

          {/* Imagen */}
          <img
            src={product.image || "/placeholder.png"}
            alt={product.name}
            className="product-detail-image"
          />

          {/* Info */}
          <div className="product-detail-info">
            <h1 className="product-detail-name">{product.name}</h1>
            <p className="product-detail-price">${product.price}</p>
            <p className="product-detail-description">{product.description}</p>

            {/* Specs */}
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

            <button className="add-to-cart-button">
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
