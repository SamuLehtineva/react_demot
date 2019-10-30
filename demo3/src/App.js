import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import NewNotes from './components/NewNotes.js';

function App() {
  const [notes, setnotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [newImportance, setNewImportance] = useState(false);

  const getNotes = () => {
  console.log("Starting effect");

  axios
  .get('http://localhost:3001/notes')
  .then(response => {
    //const notes = response.data;
    console.log(notes);
    console.log("promise");
    setnotes(response.data);
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
  axios
  .post('http://localhost:3001/notes', testNote)
  .then(response => {
    let tempNotes = notes.concat(response.data);
    setnotes(tempNotes);
    setNewNote("");
    setNewImportance(false);
    console.log(response)
    console.log(notes);
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
        {notes.map(e => <li key = {e["id"]}>{e["content"]}</li>)}
        
      </header>
      
    </div>
  );
}

export default App;
