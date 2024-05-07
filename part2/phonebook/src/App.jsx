import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const peopleToShow = persons.filter(person => person.name.toLowerCase().includes(searchName))
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }

  const hasSameName = (personObj) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase() === personObj.name.toLowerCase()) {
        return true
      }
    }
    return false
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }
    
    if (hasSameName(personObj)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        for (const person of persons) {
          if (person.name.toLowerCase() === newName) {
            personServices.update(person.id, personObj)
              .then(data => {
                const index = persons.findIndex(el => el.id === data.id)
                const personsCopy = [...persons]
                personsCopy[index] = data
                setPersons(personsCopy)
              })
          }
        }
      }
      return
    }

    personServices.create(personObj)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Added ${data.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personServices.remove(id)
        .then(data => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(
            `${name} has already been deleted!`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000) 
        })
      
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      {errorMessage && <Notification message={errorMessage} />}

      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} /> 

      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumChange={handleNumChange}
      />

      <h2>Numbers</h2>

      <Persons peopleToShow={peopleToShow} delete={deletePerson} />

    </div>
  )
}

export default App