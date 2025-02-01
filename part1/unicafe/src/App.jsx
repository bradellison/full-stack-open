import { useState } from 'react'
import Header from './Header'
import Button from './Button'
import StatisticLine from './StatisticLine'
import Statistics from './Statistics'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    // handleAverage(newGood, neutral, bad)
    // handlePositive(newGood, neutral, bad)
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    // handleAverage(good, newNeutral, bad)    
    // handlePositive(good, newNeutral, bad)    
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    // handleAverage(good, neutral, newBad)    
    // handlePositive(good, neutral, newBad)    
  }

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
      <Header text="statistics" />
      <Statistics goodCount={good} neutralCount={neutral} badCount={bad}/>
    </div>
  )
}

export default App