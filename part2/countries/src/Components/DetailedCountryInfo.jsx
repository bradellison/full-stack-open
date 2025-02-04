import Weather from './Weather'

const DetailedCountryInfo = ({country}) => {
    // console.log(country.languages)
    // console.log(country)
    const languageList = Object.values(country.languages);
    const countryFlagUrl = country.flags["png"]
    // console.log(countryFlagUrl)
    // console.log(countryFlagUrl["png"]) 


    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital {country.capital[0]}</p>
            <p>Area {country.area}</p>
            <h4>Languages:</h4>
            <ul>
                {languageList.map(language =>
                    <li key={language}>{language}</li>                
                )
                }
            </ul>
            <img src={countryFlagUrl} alt={country.name.common} />
            <Weather country={country} />
        </>
    )
}

export default DetailedCountryInfo