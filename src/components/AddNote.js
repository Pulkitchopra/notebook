import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = () => {
  
    const context = useContext(noteContext);
    const {addNote} = context;

    
    const [notes, setNotes] = useState({title: "", description: ""})
    const handleClick = (e) =>{
      e.preventDefault();
      addNote(notes.title, notes.description);
      setNotes({title: "", description: ""})
    }
    const onChange = (e) => {
        setNotes({...notes, [e.target.name]: e.target.value})
    }
  return (
    <div >
      <div className='container my-3 '>
    <h2>Add Notes</h2>
    </div>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name ="title" aria-describedby="emailHelp" onChange={onChange}/>
    <div id="emailHelp" className="form-text"> </div>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
    </div>
  )
}

export default AddNote
