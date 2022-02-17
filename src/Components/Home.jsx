import NoteForm from './NoteForm';
import NotesList from './NotesList';

export default function Home() {

  return (
    <>
      <div className="container w-75 mt-4">
        <NoteForm data={{"formTitle":"Add New Note", "type":"new", "noteData":{"title":"","description":"","tag":""}}} />
        <NotesList />
      </div>
    </>
  )
}
