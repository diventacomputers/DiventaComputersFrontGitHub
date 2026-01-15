import React, { useState, useEffect } from 'react';
import '../assets/styles/ProductForm.css';

const ProductForm = ({ onSubmit, errors, product = {}, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'component',
    stock: '',
    image: '',
    images: [''],
    isActive: true,  
    specs: {
      Condicion: 'Nuevo',
      Marca: '',
      Garantia: ''
    }
  });

  useEffect(() => {
    if (product._id) {
      const existingImages = Array.isArray(product.images) && product.images.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [''];
      setFormData({
        name: product.name || '',
        price: product.price?.toString() || '',
        description: product.description || '',
        category: product.category || 'component',
        stock: product.stock?.toString() || '',
        image: product.image || '',
        images: existingImages,
        isActive: product.isActive !== false, // <- Añadido
        specs: {
          Condicion: product.specs?.Condicion || 'Nuevo',
          Marca: product.specs?.Marca || '',
          Garantia: product.specs?.Garantia || ''
        }
      });
    } else if (Object.keys(product).length > 0) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      specs: { ...prev.specs, [name]: value }
    }));
  };

  const handleGalleryImageChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated[index] = value;
      return { ...prev, images: updated };
    });
  };

  const handleAddGalleryImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleRemoveGalleryImage = (index) => {
    setFormData((prev) => {
      const updated = prev.images.filter((_, idx) => idx !== index);
      return { ...prev, images: updated.length ? updated : [''] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedImages = (formData.images || [])
      .map((image) => image.trim())
      .filter(Boolean);
    const productData = {
      ...formData,
      images: sanitizedImages,
      image: sanitizedImages[0] || formData.image || '',
      price: Number(formData.price),
      stock: Number(formData.stock)
    };
    onSubmit(productData);
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-row">
        <div className="form-group">
          <label>Nombre del Producto*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.price}
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
          value={formData.description}
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
            value={formData.category}
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
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
          {errors?.stock && <p className="error-message">{errors.stock}</p>}
        </div>
      </div>

      <div className="form-group">
        <label>URLs de Imágenes*</label>
        <div className="image-url-list">
          {formData.images.map((image, index) => (
            <div key={`image-${index}`} className="image-url-item">
              <input
                type="url"
                name={`image-${index}`}
                value={image}
                onChange={(e) => handleGalleryImageChange(index, e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                required={index === 0}
              />
              <button
                type="button"
                className="remove-image-btn"
                onClick={() => handleRemoveGalleryImage(index)}
                disabled={formData.images.length === 1}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="add-image-btn"
          onClick={handleAddGalleryImage}
        >
          + Agregar otra imagen
        </button>
        {(formData.images[0] || formData.image) && (
          <div className="image-preview">
            <img
              src={formData.images[0] || formData.image}
              alt="Vista previa principal"
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}
        {errors?.image && <p className="error-message">{errors.image}</p>}
        {errors?.images && <p className="error-message">{errors.images}</p>}
      </div>

      <fieldset className="specs-fieldset">
        <legend>Especificaciones Técnicas</legend>
        <div className="form-row">
          <div className="form-group">
            <label>Condición*</label>
            <select
              name="Condicion"
              value={formData.specs.Condicion}
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
              value={formData.specs.Marca}
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
            value={formData.specs.Garantia}
            onChange={handleSpecsChange}
            placeholder="Ej: 24 Meses"
            required
          />
          {errors?.['specs.Garantia'] && <p className="error-message">{errors['specs.Garantia']}</p>}
        </div>
      </fieldset>

      <div className="form-actions">
        <button type="submit" className="submit-btn">
          {product._id ? 'Actualizar Producto' : 'Guardar Producto'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-btn"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
