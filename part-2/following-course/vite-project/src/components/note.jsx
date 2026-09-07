const Note = ({ note, toggleNoteImportance, deleteNote }) => {
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleNoteImportance}>
        {note.important ? "Remove importance" : "Add importance"}
      </button>
      <button onClick={deleteNote}>Delete</button>
    </li>
  );
};

export default Note;
