import CountryInfo from './CountryInfo'
import DetailedCountryInfo from './DetailedCountryInfo'

const Countries = ({countries, selectedCountry,onSelectCountry}) => {
    // console.log(countries)
    // console.log(countries.length)
    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    // Show only if selected country is set
    if (selectedCountry) {
        return (
            <DetailedCountryInfo country={selectedCountry} />
        )        
    }

    // Show list if more than one country, but <= than 10
    if (countries.length > 1) {
        return (
            <>
                {countries.map(country => 
                    <CountryInfo key={country.name.common} name={country.name.common} onSelectCountry={onSelectCountry} />
                )}
            </>
        )
    }

    if (countries.length === 0) {
        return (
            <p>No matches for filter</p>
        )
    }

    if (countries.length === 1) {
        // console.log('single match')
        // console.log(countries[0])
        return (
            <DetailedCountryInfo country={countries[0]} />
        )
    }
}

export default Countries