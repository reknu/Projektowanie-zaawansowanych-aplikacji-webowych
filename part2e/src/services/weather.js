import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = async (capital) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
  )

  return response.data
}

export default { getWeather }