import { useState, useEffect } from 'react';
import services from './api';
import DisplayContacts from './components/DisplayContacts';
import AddContacts from './components/AddContacts';
import SearchField from './components/SearchField';

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  console.log('two');

  useEffect(() => {
    services.getAll().then(data => {
      setPersons(data);
    });
  }, []);

  const addNewContact = e => {
    e.preventDefault();

    if (persons.some(person => person.name === newName.trim())) {
      if (
        window.confirm(
          `${newName} is already added to your phonebook replace old number with new number?`,
        )
      ) {
        const contact = persons.find(
          contact => contact.name === newName.trim(),
        );
        const updatedContact = { ...contact, number: newNumber };
        services
          .updateContact(contact.id, updatedContact)
          .then(data =>
            setPersons(
              persons.map(person => (person.id !== contact.id ? person : data)),
            ),
          );
      }
      return;
    }

    if (newName.trim() === '') return;

    const newContact = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    services.create(newContact).then(data => setPersons(persons.concat(data)));
    setNewName('');
    setNewNumber('');
  };

  const deleteContact = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      services.deleteContact(id).then(() => {
        setPersons(persons.filter(contact => contact.id !== id));
      });
    }
  };

  const contactsToShow =
    persons?.filter(el => {
      return el.name.toLowerCase().includes(searchTerm.toLowerCase());
    }) ?? [];

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AddContacts
        addNewContact={addNewContact}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <DisplayContacts
        contacts={contactsToShow}
        deleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
