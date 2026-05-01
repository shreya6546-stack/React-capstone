import Button from './Button'
import { formatCurrency } from '../utils/tripPlanner'

function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <img src={destination.image} alt={destination.name} />
      <div className="destination-card-body">
        <div className="destination-meta">
          <span>{destination.tag}</span>
          <span>{destination.duration}</span>
        </div>
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
