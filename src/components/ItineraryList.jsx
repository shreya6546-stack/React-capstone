import { formatCurrency } from '../utils/tripPlanner'

function ItineraryList({ itinerary }) {
  return (
    <div className="itinerary-list">
      {itinerary.map((item) => (
        <article className="itinerary-day" key={`${item.day}-${item.date}`}>
          <div className="day-badge">Day {item.day}</div>
          <div>
            <p className="eyebrow">{item.date}</p>
            <h3>{item.title}</h3>
            <ul>
              {item.activities.map((activity) => (
                <li key={activity}>{activity}</li>
              ))}
            </ul>
            <strong>{formatCurrency(item.budget)} estimated for the day</strong>
          </div>
        </article>
      ))}
    </div>
  )
}

export default ItineraryList
