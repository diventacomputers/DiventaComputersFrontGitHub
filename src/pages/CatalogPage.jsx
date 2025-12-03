import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import "../assets/styles/CatalogPage.css";
import Header from "../components/ui/Header";

const CatalogPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get("search") || "");
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const needle = searchTerm.toLowerCase();

    return products.filter((product) => {
      const source = product.attributes || product;

      const valuesToSearch = [
        source.name,
        source.brand,
        source.category,
        source.description,
      ];

      return valuesToSearch.some((value) =>
        (value || "").toString().toLowerCase().includes(needle)
      );
    });
  }, [products, searchTerm]);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="home-page">
      <Header />

      <div className="catalog-container">
        <h1 className="catalog-title">Catálogo de Productos</h1>
        {searchTerm && (
          <p className="catalog-hint">
            Mostrando resultados para "{searchTerm}" ({filteredProducts.length}
            )
          </p>
        )}

        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <p className="no-products">No hay productos disponibles.</p>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
