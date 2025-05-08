import React, { useState } from 'react';
import '../assets/styles/ProductForm.css';

const ProductForm = ({ onSubmit, errors }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'component',
    stock: '',
    image: '',
    specs: {
      Condicion: 'Nuevo',
      Marca: '',
      Garantia: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecsChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      specs: { ...prev.specs, [name]: value }
    }));
  };

  const handleImageChange = (e) => {
    setProduct(prev => ({ ...prev, image: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...product,
      price: Number(product.price),
      stock: Number(product.stock)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      {/* Campos básicos */}
      <div className="form-row">
        <div className="form-group">
          <label>Nombre del Producto*</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          {errors?.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label>Precio (COP)*</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            required
          />
          {errors?.price && <p className="error-message">{errors.price}</p>}
        </div>
      </div>

      <div className="form-group">
        <label>Descripción*</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          rows="3"
          required
        />
        {errors?.description && <p className="error-message">{errors.description}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Categoría*</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="component">Componente</option>
            <option value="peripheral">Periférico</option>
            <option value="laptop">Portátil</option>
            <option value="accessory">Accessorios</option>
            <option value="desktop">Escritorio</option>
          </select>
        </div>

        <div className="form-group">
          <label>Stock Disponible*</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            min="0"
            required
          />
          {errors?.stock && <p className="error-message">{errors.stock}</p>}
        </div>
      </div>

      <div className="form-group">
        <label>URL de la Imagen*</label>
        <input
          type="url"
          name="image"
          value={product.image}
          onChange={handleImageChange}
          placeholder="https://ejemplo.com/imagen.jpg"
          required
        />
        {product.image && (
          <div className="image-preview">
            <img src={product.image} alt="Vista previa" onError={(e) => e.target.style.display = 'none'} />
          </div>
        )}
        {errors?.image && <p className="error-message">{errors.image}</p>}
      </div>

      <fieldset className="specs-fieldset">
        <legend>Especificaciones Técnicas</legend>
        <div className="form-row">
          <div className="form-group">
            <label>Condición*</label>
            <select
              name="Condicion"
              value={product.specs.Condicion}
              onChange={handleSpecsChange}
              required
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Reacondicionado">Reacondicionado</option>
              <option value="Usado">Usado</option>
            </select>
            {errors?.['specs.Condicion'] && <p className="error-message">{errors['specs.Condicion']}</p>}
          </div>

          <div className="form-group">
            <label>Marca*</label>
            <input
              type="text"
              name="Marca"
              value={product.specs.Marca}
              onChange={handleSpecsChange}
              required
            />
            {errors?.['specs.Marca'] && <p className="error-message">{errors['specs.Marca']}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Garantía*</label>
          <input
            type="text"
            name="Garantia"
            value={product.specs.Garantia}
            onChange={handleSpecsChange}
            placeholder="Ej: 24 Meses"
            required
          />
          {errors?.['specs.Garantia'] && <p className="error-message">{errors['specs.Garantia']}</p>}
        </div>
      </fieldset>

      <button type="submit" className="submit-btn">
        Guardar Producto
      </button>
    </form>
  );
};

export default ProductForm;