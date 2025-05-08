import OfferCard from './OfferCard'
import laptopImg from '../../assets/images/laptop.png';
import gamingImg from '../../assets/images/gaming.png';
import accessoriesImg from '../../assets/images/accessories.png';
import phoneImg from '../../assets/images/phone.png';
import monitorImg from '../../assets/images/monitor.png';
import { Link } from 'react-router-dom';
import ListProduct from './ListProduct';

function CategorySection() {
  const categories = [
  { name: 'Portátiles', image: laptopImg, to: '/catalog' },
  { name: 'Gaming', image: gamingImg , to: '/catalog'},
  { name: 'Accesorios', image: accessoriesImg , to: '/catalog'},
  { name: 'Celulares', image: phoneImg , to: '/catalog'},
  { name: 'Monitores', image: monitorImg , to: '/catalog'}
]
  const offers = [
    { category: 'PORTATILES', discount: '40%', link: 'Ver Ofertas', Image: laptopImg },
    { category: 'GAMING', discount: '40%', link: 'Ver Ofertas', Image: gamingImg },
    { category: 'ACCESORIOS', discount: '50%', link: 'Ver Ofertas', Image: accessoriesImg },
    { category: 'CELULARES', discount: '30%', link: 'Ver Ofertas', Image: phoneImg },
  ]

  return (
    <section className="category-section">

      

      <div className="catalog-container">
        <h1 className="catalog-title">Categorías principales</h1>
        <div className="product-grid2">
          {categories.map((category, index) => (
            <Link to={category.to} style={{
              color: '#000000',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}>
            <div className="product-card" key={index}>
              <img src={category.image} alt={category.name} className="product-image-home" />
              <div className="product-info">
                <h3 className="product-name">{category.name}</h3>
                <p className="product-description"></p>
                <div className="product-footer">


                </div>
              </div>
            </div>
            </Link>
          ))}
        </div>
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