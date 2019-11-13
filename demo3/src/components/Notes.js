import React from 'react';
import '../App.css';
import noteservice from '../Services/noteservice';

const Note = ({mynote, handleDelete, handleChange}) => {

     

    let textcolor = "notimportant";
    if(mynote.important){
        textcolor = "important";
    } else {
        textcolor = "notimportant";
    }
    return (
        <li onClick={e => handleChange(e, mynote.id)} className={textcolor}>{mynote.content} <button onClick={e => handleDelete(mynote.id)}>Poista</button> </li>
        
    )
}

const Notes = ({ mynotes, setNotes }) => {
    const handleDelete = (id) => {
        noteservice.remove(id)
        .then(resp => setNotes(mynotes.filter(n => n.id !== id)))
    }
    const handleChange = (e, id) => {
        e.stopPropagation();
        const tempNote = mynotes.filter(n => n.id === id)[0]
        console.log(tempNote);
        noteservice.update(id, {...tempNote, important: !(tempNote.important)})
        .then(updatedNote => setNotes(mynotes.map(n => {
            if(n.id === id){
                n = updatedNote
            }
            return n;
        })))
    }  
    return (
        <div className="part">
            <ul className="notes">
                {mynotes.map(note => <Note handleChange={handleChange} handleDelete={handleDelete} mynote={note} key={note.id}/>)}
            </ul>
        </div>
    )
}
export default Notes;