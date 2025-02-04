import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Countries from './Components/Countries'

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    countriesService.
      getAll().
      then(response => {
        setCountries(response)
        setFilteredCountries(response.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase())))
      }
      )
      .catch(error => console.log(error))
  }, [])
  // console.log(countries)
  // countries.map(country => console.log(country.name.common))
  // const handleCreate = (event) => {

  const onSelectCountry = (name) => {
    console.log("Clicked show for", name)
    const newSelectedCountry = countries.find(country => country.name.common === name)
    setSelectedCountry(newSelectedCountry)
    // setSelectedCountry(event.target.value)
  }

  const handleSearchUpdate = (event) => {
    // console.log(event.target.value)
    setSearch(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
    setSelectedCountry(null)
  }

  return (
    <>
      <div>
        <label>find countries </label>
        <input type="text" placeholder="search" value={search} onChange={handleSearchUpdate} />
        <Countries countries={filteredCountries} selectedCountry={selectedCountry} onSelectCountry={onSelectCountry} />
      </div>
    </>
  )
}

export default App
