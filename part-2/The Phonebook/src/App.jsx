import { useState, useEffect } from 'react';
import services from './api';
import DisplayContacts from './components/DisplayContacts';
import AddContacts from './components/AddContacts';
import SearchField from './components/SearchField';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = newName.trim();
  const number = newNumber.trim();

  useEffect(() => {
    services.getAll().then(data => {
      setPersons(data);
    });
  }, []);

  const addNewContact = e => {
    e.preventDefault();

    if (persons.some(person => person.name === name)) {
      if (
        window.confirm(
          `${newName} is already added to your phonebook replace old number with new number?`,
        )
      ) {
        const contact = persons.find(contact => contact.name === name);
        const updatedContact = { ...contact, number: number };

        services
          .updateContact(contact.id, updatedContact)
          .then(data => {
            setPersons(
              persons.map(person => (person.id !== contact.id ? person : data)),
            );

            setMessage(`${data.name} number updated`);
            setTimeout(() => setMessage(null), 2000);
          })
          .catch(err => {
            setErrorMessage(
              `${contact.name} information are already deleted from server`,
            );
            setTimeout(() => setErrorMessage(null), 2000);

            setPersons(persons.filter(person => person.id !== contact.id));
          });

        setNewName('');
        setNewNumber('');
      }
      return;
    }

    if (name === '' || number === '') return;

    const newContact = {
      name: name,
      number: number,
    };

    services.create(newContact).then(data => {
      console.log(data);
      setPersons(persons.concat(data));

      setMessage(`${data.name} added`);
      setTimeout(() => setMessage(null), 2000);
    });

    setNewName('');
    setNewNumber('');
  };

  const deleteContact = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      services
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter(contact => contact.id !== id));
        })
        .catch(err => {
          setErrorMessage(
            `${name} information are already deleted from server`,
          );
          setTimeout(() => setErrorMessage(null), 2000);

          setPersons(persons.filter(person => person.id !== contact.id));
        });
    }
  };

  const contactsToShow = persons.filter(el => {
    return el.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
  });

  return (
    <div>
      <Notification message={message} error={errorMessage} />
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
