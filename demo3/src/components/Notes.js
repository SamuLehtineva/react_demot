import React from 'react';
import '../App.css';

const Note = ({mynote}) => {
    let textcolor = "notimportant";
    if(mynote.important){
        textcolor = "important";
    } else {
        textcolor = "notimportant";
    }
    return (
        <li className={textcolor}>{mynote.content}</li>
    )
}

const Notes = ({ mynotes }) => {
    return (
        <div className="part">
            <ul className="notes">
                {mynotes.map(note => <Note mynote={note} key={note.id}/>)}
            </ul>
        </div>
    )
}
export default Notes;