import React from 'react'
import { Link} from "react-router-dom";


const Home = (props) => {
  
  return (
    <div>
    <div className='notes-container my-3'>
    <h1 className='heading'>Notes App</h1>
    <div className='notes-content'>


    <p > This app is the Notes App to Take Notes with the option to <span> Add </span> New Notes, <span> Update </span>  existing Notes and <span> Delete </span> the Notes that are irrelevant. Create an Account to have Access to this App.</p>
    <div className='notes-right'>


    <div className="card mb-3 notes" style={{backgroundColor: props.mode === 'light'? 'white': ' rgb(230,230,130)'}}>
  <div className="card-body ">
    <h5 className="card-title">Add Note</h5>

    <Link to="/about" className="btn btn-primary plus-btn"><i className="fa-solid fa-plus"></i></Link>
  </div>
</div>
    </div>
    </div>
    </div>



    </div>
  )
}

export default Home
