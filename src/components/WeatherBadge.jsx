import { useEffect, useState } from 'react'

const weatherCodeLabels = {
  0: 'Clear',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Cloudy',
  45: 'Fog',
  48: 'Fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Showers',
  82: 'Heavy showers',
  95: 'Thunderstorm',
  96: 'Storm',
  99: 'Heavy storm',
}

function WeatherBadge({ destination }) {
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadWeather() {
      setStatus('loading')

      try {
        const params = new URLSearchParams({
          latitude: destination.latitude,
          longitude: destination.longitude,
          current: 'temperature_2m,weather_code,wind_speed_10m',
          timezone: 'auto',
        })

        const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Weather request failed')
        }

        const data = await response.json()
        setWeather(data.current)
        setStatus('ready')
      } catch (error) {
        if (error.name !== 'AbortError') {
          setStatus('error')
        }
      }
    }

    loadWeather()

    return () => controller.abort()
  }, [destination.latitude, destination.longitude])

  if (status === 'loading') {
    return <div className="weather-badge">Weather loading</div>
  }

  if (status === 'error' || !weather) {
    return <div className="weather-badge weather-muted">Weather unavailable</div>
  }

  const condition = weatherCodeLabels[weather.weather_code] ?? 'Live weather'

  return (
    <div className="weather-badge" title={`Wind ${Math.round(weather.wind_speed_10m)} km/h`}>
      <span>{Math.round(weather.temperature_2m)}°C</span>
      <small>{condition}</small>
    </div>
  )
}

export default WeatherBadge
