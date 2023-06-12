import React, { useContext, useEffect, useState, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';

import AddNote from './AddNote';
import { useNavigate} from 'react-router-dom';


const Notes = (props) => {
 let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes()
    }

    else{
      navigate('/login')
      
    }
  }, [])
  const [note, setNote] = useState({id: " ", edittitle: "", editdescription: ""})
  const handleClick = (e) =>{
    editNote(note._id, note.edittitle, note.editdescription )
    refClose.current.click();

  }
  const onChange = (e) => {
      setNote({...notes, [e.target.name]: e.target.value})
  }


  const updateNote = (currentNote) => {

    ref.current.click();
    setNote({id: currentNote._id, edittitle: currentNote.title, editdescription: currentNote.description})
  }




  const ref = useRef(null)
  const refClose = useRef(null)

  return (

    <>

      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className={`modal-title fs-5 text-${props.mode === 'light'? 'dark': 'black'}`} id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className={`mb-3 text-${props.mode === 'light'? 'dark': 'black'}`}>
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="edittitle"  name="edit-title" aria-describedby="emailHelp" onChange={onChange} />
                  <div id="emailHelp" className="form-text"> </div>
                </div>
                <div className={`mb-3 text-${props.mode === 'light'? 'dark': 'black'}`}>
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="editdescription"  name="edit-description" onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref = {refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='row my-3'>
          <h2 >My Notes</h2>
          
          {notes.map((notes) => {
            return <NoteItem key={notes._id} updateNote={updateNote} notes={notes} />;
          }

          )
          }
        </div>
      </div>
    </>
  )
}

export default Notes
