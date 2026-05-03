import Button from '../components/Button'
import DestinationCard from '../components/DestinationCard'

function Wishlist({ wishlistDestinations = [], wishlistIds = [], onToggleWishlist }) {
  return (
    <section className="page-section">
      <div className="page-hero compact wishlist-hero">
        <p className="eyebrow">Saved destinations</p>
        <h1>Your travel wishlist</h1>
        <p>
          Keep your favorite places together while you compare budgets, routes, and travel dates.
        </p>
      </div>

      {wishlistDestinations.length > 0 ? (
        <div className="destination-grid">
          {wishlistDestinations.map((destination) => (
            <DestinationCard
              destination={destination}
              isWishlisted={wishlistIds.includes(destination.id)}
              key={destination.id}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state wishlist-empty">
          <p className="eyebrow">Nothing saved yet</p>
          <h2>Start building your shortlist</h2>
          <p>Save destinations from the explore page and they will appear here.</p>
          <Button to="/destinations">Explore Destinations</Button>
        </div>
      )}
    </section>
  )
}

export default Wishlist
