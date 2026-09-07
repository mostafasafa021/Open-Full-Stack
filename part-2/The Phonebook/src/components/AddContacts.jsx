const AddContacts = ({
  addNewContact,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form onSubmit={addNewContact}>
      <div>
        name:{' '}
        <input
          value={newName}
          onChange={e => {
            setNewName(e.target.value);
          }}
        />
        number:{' '}
        <input
          value={newNumber}
          onChange={e => {
            setNewNumber(e.target.value);
          }}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddContacts;
