import Button from './Button'
import WeatherBadge from './WeatherBadge'
import { formatCurrency } from '../utils/tripPlanner'

function RatingStars({ rating, reviews }) {
  const starFills = Array.from({ length: 5 }, (_, index) =>
    Math.min(Math.max(rating - index, 0), 1) * 100,
  )

  return (
    <div className="rating-row" aria-label={`${rating} out of 5 stars from ${reviews} reviews`}>
      <div className="rating-stars" aria-hidden="true">
        {starFills.map((fill, index) => (
          <span className="rating-star" key={index}>
            <span className="rating-star-empty">&#9733;</span>
            <span className="rating-star-fill" style={{ width: `${fill}%` }}>
              &#9733;
            </span>
          </span>
        ))}
      </div>
      <strong>{rating.toFixed(1)}</strong>
      <small>({reviews} reviews)</small>
    </div>
  )
}

function DestinationCard({ destination, isWishlisted = false, onToggleWishlist }) {
  const handleWishlistClick = () => {
    onToggleWishlist?.(destination.id)
  }

  return (
    <article className="destination-card">
      <button
        className={`wishlist-button ${isWishlisted ? 'saved' : ''}`}
        type="button"
        aria-pressed={isWishlisted}
        aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${destination.name}`}
        onClick={handleWishlistClick}
      >
        <span>{isWishlisted ? 'Saved' : 'Save'}</span>
      </button>
      <img src={destination.image} alt={destination.name} />
      <div className="destination-card-body">
        <div className="destination-meta">
          <span>{destination.tag}</span>
          <span>{destination.duration}</span>
        </div>
        <WeatherBadge destination={destination} />
        <RatingStars rating={destination.rating} reviews={destination.reviews} />
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <div className="destination-footer">
          <strong>From {formatCurrency(destination.price)}</strong>
          <Button to="/trip-details" state={{ destination }} variant="light">
            View Details
          </Button>
        </div>
      </div>
    </article>
  )
}

export default DestinationCard
