import Contact from './Contact';

const DisplayContacts = ({ contacts, deleteContact }) => {
  return (
    <section>
      <h2>Numbers</h2>
      {contacts
        ? contacts.map(contact => (
            <Contact
              name={contact.name}
              number={contact.number}
              key={contact.id}
              deleteContact={() => {
                deleteContact(contact.id, contact.name);
              }}
            />
          ))
        : 'Loading...'}
    </section>
  );
};

export default DisplayContacts;
