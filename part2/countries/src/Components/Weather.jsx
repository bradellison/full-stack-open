import { useState, useEffect } from 'react'
import weatherServices from '../services/weather'

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)
    const [temperature, setTemperature] = useState(null)
    const [wind, setWind] = useState(null)
    
    useEffect(() => {
        weatherServices
            .get({lat: country.latlng[0], lon: country.latlng[1]})
            .then(response => {
                setWeather(response)
                console.log("Weather being set to",response)
                setTemperature(response.main.temp)
                setWind(response.wind.speed)
            })
            .catch(error => console.log(error))
    }, [])
    
    // console.log(weather.main.temp)

    return (
        <div>
            <h2>Weather</h2>
            <p>Temperature: {temperature} Celsius</p>
            <p>Wind: {wind} m/s</p>
        </div>
    )
}

export default Weather