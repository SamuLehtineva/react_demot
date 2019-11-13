import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import NewNotes from './components/NewNotes.js';
import Notes from './components/Notes.js';
import noteService from './Services/noteservice';

function App() {
  const [notes, setnotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newImportance, setNewImportance] = useState(false);

  const getNotes = () => {
  noteService
  .getAll()
  .then(allNotes => {
    //const notes = response.data;
    setnotes(allNotes);
  })
  };

  useEffect(getNotes, []);

console.log("ready", notes);

const addNote = event => {
  event.preventDefault();
  const testNote = {
    content: newNote,
    date: Date.now(),
    important: newImportance
  };
  noteService.add(testNote)
  .then(response => {
    let tempNotes = notes.concat(response);
    setnotes(tempNotes);
    setNewNote("");
    setNewImportance(false);
  })
}

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <NewNotes submitHandler={addNote} newNote={newNote} setNewNote={setNewNote} newImportance={newImportance} setNewImportance={setNewImportance}/>
        <button onClick={addNote}>Lisää juttu</button>
        {/* {notes.map(e => <li key = {e["id"]}>{e["content"]}</li>)} */}
        <Notes mynotes={notes} setNotes={setnotes}/>
        
      </header>
      
    </div>
  );
}

export default App;
