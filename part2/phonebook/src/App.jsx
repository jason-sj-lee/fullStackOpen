import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

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
      if (persons[i].name === personObj.name) {
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
      alert(`${newName} is already added to phonebook`)
      return
    }

    axios
    .post('http://localhost:3001/persons', personObj)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response.data))
      setNewName('')
      setNewNumber('')
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>

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

      <Persons peopleToShow={peopleToShow} />

    </div>
  )
}

export default App