import React, { useContext } from 'react'
import { noteContext } from '../Contextstate'

export default function NoteItem(props) {
  const context = useContext(noteContext);
  
  const handleDelete = (id) => {
    context.deleteNote(id);
  }
  return (
    <div>
        <div className="card my-2">
            <div className="card-body">
                <h5 className="card-title">{props.noteData.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.noteData.tag}</h6>
                <p className="card-text">{props.noteData.description}</p>
                <div>
                    <span className="card-link"><button onClick={()=>props.updateFunc(props.noteData)}>Update</button></span>
                    <span className="card-link align-self-end"><button onClick={()=>handleDelete(props.noteData._id)}>Delete</button></span>
                </div>
            </div>
        </div>
    </div>
  )
}
