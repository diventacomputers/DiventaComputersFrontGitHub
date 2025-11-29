import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import "../assets/styles/CatalogPage.css";
import Header from "../components/ui/Header";

const CatalogPage = () => {
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

        console.log("Productos recibidos:", data);

        // Para Strapi o APIs similares, los datos suelen venir en data.data
        setProducts(data.data || []);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [URL_PRO]);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="home-page">
      <Header />

      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de Productos</h1>

        <div className="product-grid">
          {products.length === 0 ? (
            <p className="no-products">No hay productos disponibles.</p>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
