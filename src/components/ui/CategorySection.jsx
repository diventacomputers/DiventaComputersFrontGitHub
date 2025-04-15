import OfferCard from './OfferCard'

function CategorySection() {
  const categories = ['Portátiles', 'Gaming', 'Accesorios', 'Celulares', 'Monitores']
  const offers = [
    { category: 'PORTATILES', discount: '40%', link: 'Ver Ofertas' },
    { category: 'ACCESORIOS', discount: '50%', link: 'Ver Ofertas' },
    { category: 'GAMING', discount: '40%', link: 'Ver Ofertas' },
    { category: 'CELULARES', discount: '30%', link: 'Ver Ofertas' }
  ]

  return (
    <section className="category-section">
      <h3>Categorías principales</h3>
      <div className="categories-list">
        {categories.map((category, index) => (
          <span key={index}>{category}</span>
        ))}
      </div>

      <div className="offers-grid">
        {offers.map((offer, index) => (
          <OfferCard 
            key={index}
            category={offer.category}
            discount={offer.discount}
            linkText={offer.link}
          />
        ))}
      </div>
    </section>
  )
}

export default CategorySection