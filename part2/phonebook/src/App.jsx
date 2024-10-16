import { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'
import NewPerson from './components/NewPerson'
import Search from './components/Search'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already in phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(p => p.name === newName)
        const changedPerson = {...personToUpdate, number: newNumber}

        personService
          .update(changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : response))
            setNewName('')
            setNewNumber('')
            setErrorMessage({
              message: `Updated number of ${response.name}`,
              type: 'success'
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage({
              message: `Information of ${changedPerson.name} has been already removed from server`,
              type: 'error'
            })
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
            setPersons(persons.filter(person => person.id !== changedPerson.id))
            console.log('error during update')
          })
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
          setErrorMessage({
            message: `Added ${response.name}`,
            type: 'success'
          })
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
        .catch(error => {
          alert('Failed to add the new person')
          console.log('error while posting')
        })
    }
  }

  const deletePerson = id => {
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Are you sure to delete ${personToDelete.name}?`)) {
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))
  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={errorMessage.message} type={errorMessage.type}/>}
      <Search handleSearch={handleSearch} searchText={searchText}/>
      <NewPerson handleSubmit={handleSubmit} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App