import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {



  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
  const handleSubmit = async (e) => {

    const {name, email, password} = credentials;
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser" ,
    {
      
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, email, password}), 
  });

  const json = await response.json();
  console.log(json)

  if (json.success){

    localStorage.setItem('token', json.authtoken);
    navigate('/');

    props.showAlert("Account Created", 'success')
  }
  else{
    props.showAlert("Invalid ", 'danger' )
  }
  

}
  const onChange = (e) => {
  setCredentials({...credentials , [e.target.name]: e.target.value})
  }

  return (
 
    <div>

    <h2 className='heading'>SignUp to Add a New Note</h2>


    <div className='signup-container'  style={{backgroundColor: props.mode === 'light'? 'black': 'white',
    color: props.mode === 'light'? 'white': 'black'
    }}>
      <form onSubmit={handleSubmit}>

      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} placeholder='Enter your name' name='name'/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='Enter your email' name='email' onChange={onChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onChange} placeholder='Enter your password' name='password'/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" onChange={onChange} placeholder='Confirm your password' name='cpassword'/>
  </div>
  
  <button type="submit" className="btn btn-primary login-btn">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup
