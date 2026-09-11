import { useEffect, useState } from "react";
import Note from "./components/note";
import Notification from "./components/Notification";
import services from "./services/api";
import "./index.css";

const App = () => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState(null);
  const [showAll, setShowAll] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    services.getAll().then((data) => {
      setNotes(data);
      console.log(data)
    });
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };
    services.create(noteObject).then((data) => {
      setNotes(notes.concat(data));
      setNewNote("");
    });
  };

  const toggleNoteImportance = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };
    services
      .update(id, changedNote)
      .then((data) => {
        setNotes(notes.map((note) => (note.id === id ? data : note)));
      })
      .catch((error) => {
        setErrorMessage(
          `note this note ${note.content} does not exist in server`,
        );
        setTimeout(() => setErrorMessage(null), 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const deleteNote = (id) => {
    services
      .deleteNote(id)
      .then(() => setNotes(notes.filter((note) => note.id !== id)));
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const handleNoteFilter = () => {
    setShowAll(!showAll);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notes
          ? notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleNoteImportance={() => {
                  toggleNoteImportance(note.id);
                }}
                deleteNote={() => {
                  deleteNote(note.id);
                }}
              />
            ))
          : "Loading..."}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="button" onClick={handleNoteFilter}>
          {showAll ? "Show Important" : "Show All"}
        </button>
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
