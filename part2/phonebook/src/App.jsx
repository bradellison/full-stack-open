import { useState, useEffect } from 'react'
import axios from 'axios'
import peopleService from './services/people'
import Filter from './Components/Filter'
import Header from './Components/Header'
import AddPersonForm from './Components/AddPersonForm'
import PersonList from './Components/PersonList'
import Notification from './Components/Notification'
import people from './services/people'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('success')

  // useEffect(() => {
  //   console.log('effect')
  //   axios
  //     .get('http://localhost:3001/people')
  //     .then(response => {
  //       console.log('promise fulfilled')
  //       setPersons(response.data)
  //       setFilteredPersons(response.data)
  //     })
  // }, [])

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setFilteredPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    console.log(event);
    
    const exists = persons.some(person => person.name === newName)
    if (exists) {
      const person = persons.find(person => person.name === newName)
      if (window.confirm(`${person.name} already exists, would you like to update their number?`)) {
        const updatedPerson = { ...person, number: newNumber }
        console.log(updatedPerson)
        peopleService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
            setFilteredPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          })
        }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(new Date().getTime())
    }

    peopleService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setFilteredPersons(persons.concat(returnedPerson))
        setNotificationType('success')
        setNotification(`Person ${newPerson.name} was added to the phonebook`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    
    setNewName('')
    setNewNumber('')


  }

  const filterPersons = (currentNameFilter) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(currentNameFilter.toLowerCase()))
    setFilteredPersons(filtered)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
    filterPersons(event.target.value)
  }

  const onRemove = (person) => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      console.log("deleting", person.id)
      peopleService
        .remove(person.id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id !== deletedPerson.id))
          setFilteredPersons(persons.filter(p => p.id !== deletedPerson.id))
        })
        .catch(error => {
          setNotificationType('error')
          setNotification(`Person ${person.name} is not in the phonebook`)
          setPersons(persons.filter(p => p.id !== person.id))
          setFilteredPersons(persons.filter(p => p.id !== person.id))
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })        
    }
  }

  return (
    <div>
      <Header text="Phonebook" />
      <Notification message={notification} notificationType={notificationType} />
      <Filter onChange={handleNameFilterChange} value={nameFilter} text_description="filter names" />
      <Header text="Add a new" />
      <AddPersonForm 
        onSubmit={addPerson}
        newName = {newName}
        newNumber = {newNumber}
        handleNameChange = {handleNameChange}
        handleNumberChange = {handleNumberChange}
      />
      <Header text="Numbers" />
      <PersonList persons={filteredPersons} onRemove={onRemove} />
    </div>
  )
}

export default App