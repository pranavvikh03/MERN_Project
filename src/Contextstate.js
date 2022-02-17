import { createContext, useState } from "react";
const host = "http://localhost";
const noteContext = createContext();

const NoteState = (props)=>{
    const [notesState, setNotesState] = useState([]);

      //Get All Notes
      const getAllNotes = async () => {
        const dataNotes = await (await fetch(`${host}/api/notes/fetchallnotes`,{
          method: 'GET',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzhiMjIxMGY5YTcyOGM2OWJjNTdiIn0sImlhdCI6MTY0NDM5OTQ2OX0.kFZq7qLHsUvobgkPZpxRNEYpSJHztWgUGCVoitHoxYw'
          }
        })).json();
        setNotesState(dataNotes);
      }

      //Add Note
      const addNote = async (title, description, tag) => {
        await fetch(`${host}/api/notes/addNote`,{
          method: 'POST',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzhiMjIxMGY5YTcyOGM2OWJjNTdiIn0sImlhdCI6MTY0NDM5OTQ2OX0.kFZq7qLHsUvobgkPZpxRNEYpSJHztWgUGCVoitHoxYw'
          },
          body:JSON.stringify({ "Title": title, "Description": description, "Tag": tag })
        })
      }

      //Delete Note
      const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deleteNote/${id}`,{
          method:'DELETE',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzhiMjIxMGY5YTcyOGM2OWJjNTdiIn0sImlhdCI6MTY0NDM5OTQ2OX0.kFZq7qLHsUvobgkPZpxRNEYpSJHztWgUGCVoitHoxYw'
          }
        })
      }
  
      //Update Note
      const updateNote = async (id, title, description, tag) => {
        await fetch(`${host}/api/notes/updateNote/${id}`,{
          method: 'PUT',
          headers:{
            'Content-Type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwMzhiMjIxMGY5YTcyOGM2OWJjNTdiIn0sImlhdCI6MTY0NDM5OTQ2OX0.kFZq7qLHsUvobgkPZpxRNEYpSJHztWgUGCVoitHoxYw'
          },
          body: JSON.stringify({ "Title": title, "Description" : description, "Tag": tag })
        })
      }

    return (
        <noteContext.Provider value={{ notesState, addNote, deleteNote, getAllNotes, updateNote }}> 
            {props.children}
        </noteContext.Provider>
    )
}

// export { NoteState, noteContext };
export default NoteState;
export { noteContext };