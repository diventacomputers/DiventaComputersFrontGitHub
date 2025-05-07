import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../assets/styles/ProductDetailPage.css";

const ProductDetailPage = () => {
  const { id } = useParams(); // Obtiene el ID de la URL
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        const data = await response.json();
        
        setProduct(data.data);
        
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Cargando producto...</div>;
  if (!product) return <div className="not-found">Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} className="product-detail-image" />
        <div className="product-detail-info">
        
          <h1 className="product-detail-name">{product.name}</h1>
          <p className="product-detail-price">${product.price}</p>
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-detail-specs">
            <h2>Especificaciones</h2>
            <ul>
              {product.specs && Object.entries(product.specs).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>

          <button className="add-to-cart-button">Añadir al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;