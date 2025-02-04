const CountryInfo = ({name, onSelectCountry}) => {
  // console.log("in country info", onSelectCountry)
  return (  
    <li>
      <label> {name} </label>
      <button onClick={() => onSelectCountry(name)}>show</button>
    </li>
  )
}

export default CountryInfo