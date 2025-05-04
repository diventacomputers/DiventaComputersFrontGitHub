function OfferCard({ category, discount, linkText, image }) {
  return (
    <div className="offer-card">
      <div className="offer-info">
        <p className="offer-subtitle">Tecnología</p>
        <h4 className="offer-title">{category}</h4>
        <p className="offer-discount">HASTA {discount} OFF</p>
        <a href="#" className="offer-button">{linkText}</a>
      </div>
      <div className="offer-image">
        <img src={image} alt={category} />
      </div>
    </div>
  );
}

export default OfferCard;
