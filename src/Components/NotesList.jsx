import React, { useContext, useEffect, useRef, useState } from 'react';
import { noteContext } from '../Contextstate';
import NoteForm from './NoteForm';
import NoteItem from './NoteItem';

export default function NotesList() {
    const context = useContext(noteContext)
    const { notesState, getAllNotes } = context;
    const ref = useRef(null) 
    const [temp, setTemp] = useState({title:"", description:"", tag:""})
    useEffect(() => {
        getAllNotes();
        
    })
    
    const updateNoteData = (note) => {
        ref.current.click();
        // setTemp({
        //     title: note.title,
        //     description: note.description,
        //     tag: note.tag
        // });
        setTemp(note)
    }

    const EditData = () => {
        console.log("Submit");
    }

    return (
        <>
            <button type="button" className="btn btn-primary" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Data</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <NoteForm data={{"formTitle":"Add New Note", "type":"new", "noteData":{"title":temp.title,"description":temp.description,"tag":temp.tag}}} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={()=>EditData}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <h2 className="mt-4">Your Notes</h2>
            <div className="container">
                <div className="row">
                    {notesState.map(note => <div className="col-sm-4" key={note._id}><NoteItem noteData={note} updateFunc={updateNoteData} /></div>)  }
                </div>
            </div>
        </>
  )
}
