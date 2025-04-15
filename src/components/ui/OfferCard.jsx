function OfferCard({ category, discount, linkText }) {
    return (
      <div className="offer-card">
        <p>Tecnología</p>
        <h4>{category}</h4>
        <p>HASTA {discount} OFF</p>
        <a href="#">{linkText}</a>
      </div>
    )
  }
  
  export default OfferCard