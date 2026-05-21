import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(capital)
      .then(data => setWeather(data))
  }, [capital])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  const icon = weather.weather[0].icon

  return (
    <div>
      <h2>Weather in {capital}</h2>

      <p>Temperature {weather.main.temp} °C</p>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />

      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather