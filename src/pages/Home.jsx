import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import DestinationCard from '../components/DestinationCard'
import { destinations } from '../data/destinations'

function Home({ wishlistIds = [], onToggleWishlist }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState({
    destination: '',
    dates: '',
    budget: '',
  })
  const featured = destinations.slice(0, 3)

  useEffect(() => {
    document.title = 'Travique | Modern Travel Planner'
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    navigate('/plan-trip', { state: { search } })
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <p className="eyebrow">Curated holidays, made simple</p>
          <h1>Plan your next trip with confidence</h1>
          <p>
            Search destinations, build a day-wise itinerary, and keep your budget visible from
            the first idea to the final booking.
          </p>
          <form className="search-panel" onSubmit={handleSearch}>
            <InputField
              label="Destination"
              placeholder="Goa, Bali, Paris..."
              value={search.destination}
              onChange={(event) =>
                setSearch((current) => ({ ...current, destination: event.target.value }))
              }
            />
            <InputField
              label="Dates"
              type="text"
              placeholder="12 May - 18 May"
              value={search.dates}
              onChange={(event) =>
                setSearch((current) => ({ ...current, dates: event.target.value }))
              }
            />
            <InputField
              label="Budget"
              type="number"
              placeholder="50000"
              value={search.budget}
              onChange={(event) =>
                setSearch((current) => ({ ...current, budget: event.target.value }))
              }
            />
            <Button type="submit">Explore Destinations</Button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Popular picks</p>
          <h2>Trips people are planning now</h2>
          <Button to="/destinations" variant="ghost">
            See all destinations
          </Button>
        </div>
        <div className="destination-grid">
          {featured.map((destination) => (
            <DestinationCard
              destination={destination}
              isWishlisted={wishlistIds.includes(destination.id)}
              key={destination.id}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home
