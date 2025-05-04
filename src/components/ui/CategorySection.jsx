import OfferCard from './OfferCard'
import laptopImg from '../../assets/images/laptop.png';
import gamingImg from '../../assets/images/gaming.png';
import accessoriesImg from '../../assets/images/accessories.png';
import phoneImg from '../../assets/images/phone.png';
import monitorImg from '../../assets/images/monitor.png';
function CategorySection() {
  const categories = [
  { name: 'Portátiles', image: laptopImg },
  { name: 'Gaming', image: gamingImg },
  { name: 'Accesorios', image: accessoriesImg },
  { name: 'Celulares', image: phoneImg },
  { name: 'Monitores', image: monitorImg }
]
  const offers = [
    { category: 'PORTATILES', discount: '40%', link: 'Ver Ofertas', Image: laptopImg },
    { category: 'GAMING', discount: '40%', link: 'Ver Ofertas', Image: gamingImg },
    { category: 'ACCESORIOS', discount: '50%', link: 'Ver Ofertas', Image: accessoriesImg },
    { category: 'CELULARES', discount: '30%', link: 'Ver Ofertas', Image: phoneImg },
  ]

  return (
    <section className="category-section">

      <h3 >Categorías principales</h3>

      <div className="categories-list">
        {categories.map((category, index) => (

          <div className="category-card" key={index}>
            <img src={category.image} alt={category.name} />
            <span>{category.name}</span>
          </div>
        ))}
      </div>

      <div className="offers-grid">
        {offers.map((offer, index) => (
          <OfferCard 
            key={index}
            category={offer.category}
            discount={offer.discount}
            linkText={offer.link}
            image={offer.Image}
            altText={`Imagen de ${offer.category}`}
            
          />
        ))}
      </div>
    </section>
  )
}

export default CategorySection