import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  
    const context = useContext(noteContext);
    let { deleteNote } = context;
    const {notes, updateNote} = props;

  return (
    <div className='col-md-2' >
      <div className="card notes" style={{marginTop: '31px'}} >
  <div className="card-body">
    <h5 className="card-title">Title: {notes.title}</h5>
    <p className="card-text">Description: {notes.description}</p>
    <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {updateNote(notes)}}></i>
    <i className="fa-solid fa-trash mx-2" onClick={ () => deleteNote(notes._id) }></i>
  </div>
</div>
    </div>
  )
}

export default NoteItem
