import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'

function Destinations({ wishlistIds = [], onToggleWishlist }) {
  return (
    <section className="page-section">
      <div className="page-hero compact">
        <p className="eyebrow">Explore destinations</p>
        <h1>Find the right place for your next break</h1>
        <p>
          Browse beach stays, city escapes, mountain routes, and easy weekend plans built for
          real travel decisions.
        </p>
      </div>
      <div className="destination-grid">
        {destinations.map((destination) => (
          <DestinationCard
            destination={destination}
            isWishlisted={wishlistIds.includes(destination.id)}
            key={destination.id}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </section>
  )
}

export default Destinations
