import React, { useEffect, useState } from "react";
import ProductCard from "../components/ui/ProductCard";
import "../assets/styles/CatalogPage.css"; // Archivo CSS para estilos
import Header from "../components/ui/Header"; // Asegúrate de que la ruta sea correcta
const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        console.log("Respuesta del backend:", data.data); // 👈 Verifica esto
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    
    <div className="catalog-container">
        <Header />
      <h1 className="catalog-title">Catálogo de Productos</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CatalogPage;