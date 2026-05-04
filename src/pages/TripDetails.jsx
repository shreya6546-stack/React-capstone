import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import ItineraryList from '../components/ItineraryList'
import { destinations } from '../data/destinations'
import { formatCurrency, generateTripPlan } from '../utils/tripPlanner'

function TripDetails() {
  const location = useLocation()

  const selectedDestination = useMemo(() => {
    if (location.state?.destination) return location.state.destination

    const destinationName = location.state?.tripPlan?.destination
    if (!destinationName) return destinations[0]

    return (
      destinations.find(
        (destination) => destination.name.toLowerCase() === destinationName.toLowerCase(),
      ) ?? null
    )
  }, [location.state])

  const tripPlan = useMemo(() => {
    if (location.state?.tripPlan) return location.state.tripPlan

    if (location.state?.destination) {
      return generateTripPlan({
        destination: selectedDestination.name,
        startDate: '2026-06-10',
        endDate: '2026-06-14',
        budget: selectedDestination.price,
        travelers: 2,
      })
    }

    return generateTripPlan({
      destination: destinations[0].name,
      startDate: '2026-06-10',
      endDate: '2026-06-14',
      budget: destinations[0].price,
      travelers: 2,
    })
  }, [location.state, selectedDestination])

  const mapQuery = selectedDestination
    ? `${selectedDestination.latitude},${selectedDestination.longitude}`
    : tripPlan.destination
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=10&output=embed`

  return (
    <section className="page-section details-page">
      <div className="page-hero details-hero">
        <p className="eyebrow">Trip details</p>
        <h1>{tripPlan.destination}</h1>
        <p>
          {tripPlan.days} days for {tripPlan.travelers} travelers with a total estimated budget of{' '}
          {formatCurrency(tripPlan.budget)}.
        </p>
        <Button to="/plan-trip">Create Another Plan</Button>
      </div>

      <div className="details-grid">
        <section className="details-panel">
          <h2>Full itinerary</h2>
          <ItineraryList itinerary={tripPlan.itinerary} />
        </section>

        <aside className="details-panel">
          <h2>Estimated cost</h2>
          <div className="cost-list">
            {Object.entries(tripPlan.costs).map(([label, value]) => (
              <div className="cost-item" key={label}>
                <span>{label}</span>
                <strong>{formatCurrency(value)}</strong>
              </div>
            ))}
          </div>
          <h2>Activities</h2>
          <ul className="activity-list">
            {[...new Set(tripPlan.itinerary.flatMap((day) => day.activities))].map((activity) => (
              <li key={activity}>{activity}</li>
            ))}
          </ul>

          <h2>Location map</h2>
          <div className="destination-map">
            <iframe
              title={`${tripPlan.destination} map`}
              src={mapUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </div>
    </section>
  )
}

export default TripDetails
