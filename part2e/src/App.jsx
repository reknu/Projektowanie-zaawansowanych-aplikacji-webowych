import { useEffect, useState } from 'react'
import countryService from './services/countries'

import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then(data => setCountries(data))
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const filteredCountries = search.trim()
  ? countries.filter(country =>
      country.name.common
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  : []

  const showCountry = (country) => {
    setSelectedCountry(country)
  }

  const countriesToShow =
    selectedCountry ? [selectedCountry] : filteredCountries

  return (
    <div>
      find countries

      <input
        value={search}
        onChange={handleSearchChange}
      />

      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {countriesToShow.length > 1 &&
        countriesToShow.length <= 10 && (
          <CountryList
            countries={countriesToShow}
            showCountry={showCountry}
          />
        )}

      {countriesToShow.length === 1 && (
        <CountryDetails
          country={countriesToShow[0]}
        />
      )}
    </div>
  )
}

export default App