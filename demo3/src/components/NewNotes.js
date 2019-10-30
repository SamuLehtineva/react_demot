import React from 'react';
const newNote = ({newNote, setNewNote, newImportance, setNewImportance, submitHandler}) => {
    console.log(newNote);
    return (
        <div>
            <form onSubmit={e => submitHandler(e)}>
                <input type="text" onChange={e => setNewNote(e.target.value)} value={newNote} />
                Tärkeä <input type="checkbox" onChange={e => setNewImportance(e.target.checked)} />
            </form>
        </div>
    )
}

export default newNote;