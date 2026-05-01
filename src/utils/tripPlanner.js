const activityBank = [
  ['Arrival, hotel check-in, and a relaxed neighborhood walk'],
  ['Guided city highlights tour', 'Local market lunch', 'Evening viewpoint'],
  ['Museum or cultural visit', 'Signature cafe stop', 'Sunset experience'],
  ['Adventure activity', 'Shopping street', 'Dinner at a top-rated local restaurant'],
  ['Nature trail or beach time', 'Spa break', 'Night market'],
  ['Day excursion nearby', 'Photo stops', 'Regional food tasting'],
  ['Slow morning, souvenir shopping, and departure prep'],
]

export function getTripDays(startDate, endDate) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diff = end.getTime() - start.getTime()

  if (Number.isNaN(diff) || diff < 0) {
    return 0
  }

  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1)
}

export function generateTripPlan(formValues) {
  const days = getTripDays(formValues.startDate, formValues.endDate)
  const dailyBudget = Math.max(1, Math.round(Number(formValues.budget) / days))

  // This keeps the dummy plan dynamic while staying easy for beginners to read.
  const itinerary = Array.from({ length: days }, (_, index) => ({
    day: index + 1,
    title:
      index === 0
        ? `Arrive in ${formValues.destination}`
        : `Explore ${formValues.destination}`,
    date: new Date(
      new Date(formValues.startDate).getTime() + index * 24 * 60 * 60 * 1000,
    ).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    activities: activityBank[index % activityBank.length],
    budget: dailyBudget,
  }))

  return {
    destination: formValues.destination,
    startDate: formValues.startDate,
    endDate: formValues.endDate,
    travelers: Number(formValues.travelers),
    budget: Number(formValues.budget),
    days,
    itinerary,
    costs: {
      stays: Math.round(Number(formValues.budget) * 0.38),
      transport: Math.round(Number(formValues.budget) * 0.24),
      food: Math.round(Number(formValues.budget) * 0.2),
      activities: Math.round(Number(formValues.budget) * 0.18),
    },
  }
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}
