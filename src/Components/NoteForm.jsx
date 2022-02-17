import React, { useContext, useState, useEffect } from 'react';
import { noteContext } from '../Contextstate';

const NoteForm = (props) => {

    const context = useContext(noteContext);
    const [noteData, setnoteData] = useState(props.data.noteData)
   
    const handleSubmit = (e) => {
        e.preventDefault();
        context.addNote(noteData.title, noteData.description, noteData.tag);
        setnoteData({
            title:"",
            description:"",
            tag:""
        })
    }

    const handleInputChange = (e) => {
        
        setnoteData({...noteData, [e.target.name] : e.target.value});
    }

    return (
        <div>
            <h2>{props.data.formTitle}</h2>
            <form>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" className="form-control" id="title" value={noteData.title} onChange={handleInputChange} name="title" />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description:</label>
                <input type="text" className="form-control" id="description" value={noteData.description} onChange={handleInputChange} name="description" />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag:</label>
                <input type="text" className="form-control" id="tag" value={noteData.tag} onChange={handleInputChange} name="tag" />
            </div>
            <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default NoteForm;