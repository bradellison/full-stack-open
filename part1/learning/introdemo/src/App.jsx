const Hello = ({name, species, age}) => {
  // const {name, species, age} = props

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are a {species}! You were born in {bornYear()}!</p>
    </div>
  )
}

const App = () => {
  const name = "Jimmy"
  const species = "fish"

  const other_friends = [
    {name: "John", species: "cat"},
    {name: "Jane", species: "dog"}
  ]

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="George" species="human" age={100}/>
      <Hello name="little bird!" species="hummingbird" age={10}/>
      <Hello name={name} species={species} age={1}/>
      <Hello name="Cleopatra" species="phoenix" age={4}/>
      <Hello name={other_friends[0].name} species={other_friends[0].species} age={15}/>
      <Hello name={other_friends[1].name} species={other_friends[1].species} age={92}/>
    </>
  )
}

export default App