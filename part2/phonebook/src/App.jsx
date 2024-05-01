import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

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

    setPersons(persons.concat(personObj))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form>
        <div>
          filter shown with <input value={searchName} onChange={handleSearchNameChange}/>
        </div>
      </form>

      <h2>add a new</h2>
      <form onSubmit={addPerson}> 
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumChange}/>
        </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map(person => <p>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App