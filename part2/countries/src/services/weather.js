import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
const key = '1bd6236da127e78241de80968733e302'

const get = ({lat, lon}) => {
  const request = axios.get(`${baseUrl}?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts,current,minutely&appid=${key}`)
  return request.then(response => response.data)
}

export default { get }
