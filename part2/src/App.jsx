import { useState, useEffect } from 'react'
import personService from './services/persons'

// Filter
const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with: <input value={filter} onChange={handleFilterChange} />
  </div>
)

// PersonForm
const PersonForm = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange
}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <button type="submit">add</button>
  </form>
)

// Persons
const Persons = ({ persons, deletePerson }) => (
  <ul>
    {persons.map(person => (
      <li key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id, person.name)}>
          delete
        </button>
      </li>
    ))}
  </ul>
)

// App
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // pobranie danych
  useEffect(() => {
    personService
      .getAll()
      .then(data => setPersons(data))
  }, [])

  // dodawanie osoby
  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name === newName
    )

    // jeśli osoba istnieje -> update
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (confirmUpdate) {
        const updatedPerson = {
          ...existingPerson,
          number: newNumber
        }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(
              persons.map(p =>
                p.id !== existingPerson.id ? p : returnedPerson
              )
            )
          })
      }

      return
    }

    // nowa osoba
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  // usuwanie osoby
  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)

    if (confirmDelete) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  // handlery
  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App