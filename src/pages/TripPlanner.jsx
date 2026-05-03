import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/Button'
import InputField from '../components/InputField'
import ItineraryList from '../components/ItineraryList'
import LoadingSpinner from '../components/LoadingSpinner'
import { generateTripPlan, getTripDays } from '../utils/tripPlanner'

const initialForm = {
  destination: '',
  startDate: '',
  endDate: '',
  budget: '',
  travelers: '2',
}

function TripPlanner() {
  const location = useLocation()
  const [formValues, setFormValues] = useState(() => ({
    ...initialForm,
    destination: location.state?.search?.destination || '',
    budget: location.state?.search?.budget || '',
  }))
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [tripPlan, setTripPlan] = useState(null)

  useEffect(() => {
    document.title = 'Plan Trip | Travique'
  }, [])

  const updateField = (field, value) => {
    setFormValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: '' }))
  }

  const validateForm = () => {
    const nextErrors = {}

    if (!formValues.destination.trim()) nextErrors.destination = 'Destination is required.'
    if (!formValues.startDate) nextErrors.startDate = 'Choose a start date.'
    if (!formValues.endDate) nextErrors.endDate = 'Choose an end date.'
    if (getTripDays(formValues.startDate, formValues.endDate) <= 0) {
      nextErrors.endDate = 'End date must be after the start date.'
    }
    if (!formValues.budget || Number(formValues.budget) < 1000) {
      nextErrors.budget = 'Enter a budget of at least INR 1,000.'
    }
    if (!formValues.travelers || Number(formValues.travelers) < 1) {
      nextErrors.travelers = 'At least one traveler is required.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setTripPlan(null)

    // Simulates a real planner API call so users see a loading state.
    window.setTimeout(() => {
      const plan = generateTripPlan(formValues)
      setTripPlan(plan)
      setIsLoading(false)
    }, 1100)
  }

  return (
    <section className="page-section planner-layout">
      <div className="planner-card">
        <p className="eyebrow">Create your itinerary</p>
        <h1>Plan a trip in minutes</h1>
        <form className="planner-form" onSubmit={handleSubmit}>
          <InputField
            label="Destination"
            placeholder="Enter destination"
            value={formValues.destination}
            error={errors.destination}
            onChange={(event) => updateField('destination', event.target.value)}
          />
          <div className="form-row">
            <InputField
              label="Start Date"
              type="date"
              value={formValues.startDate}
              error={errors.startDate}
              onChange={(event) => updateField('startDate', event.target.value)}
            />
            <InputField
              label="End Date"
              type="date"
              value={formValues.endDate}
              error={errors.endDate}
              onChange={(event) => updateField('endDate', event.target.value)}
            />
          </div>
          <div className="form-row">
            <InputField
              label="Budget"
              type="number"
              min="1000"
              placeholder="50000"
              value={formValues.budget}
              error={errors.budget}
              onChange={(event) => updateField('budget', event.target.value)}
            />
            <InputField
              label="Number of Travelers"
              type="number"
              min="1"
              value={formValues.travelers}
              error={errors.travelers}
              onChange={(event) => updateField('travelers', event.target.value)}
            />
          </div>
          <Button type="submit" className="wide-button">
            Generate Trip Plan
          </Button>
        </form>
      </div>

      <div className="planner-output">
        {isLoading && <LoadingSpinner />}
        {!isLoading && !tripPlan && (
          <div className="empty-state">
            <h2>Your day-wise plan will appear here</h2>
            <p>Add your destination, travel dates, budget, and travelers to generate a smart
              sample itinerary.</p>
          </div>
        )}
        {tripPlan && (
          <>
            <div className="result-header">
              <div>
                <p className="eyebrow">{tripPlan.days} day trip</p>
                <h2>{tripPlan.destination}</h2>
              </div>
              <Button
                to="/trip-details"
                state={{ tripPlan }}
                variant="light"
              >
                View Full Details
              </Button>
            </div>
            <ItineraryList itinerary={tripPlan.itinerary} />
          </>
        )}
      </div>
    </section>
  )
}

export default TripPlanner
