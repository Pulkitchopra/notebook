import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Link} from "react-router-dom";

const Login = (props) => {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: "", password: ""})
  const handleSubmit = async (e) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login" ,
    {
      
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({email: credentials.email, password: credentials.password}), 
  });

  const json = await response.json();
  console.log(json)

  if (json.success){

    localStorage.setItem('token', json.authtoken);
    navigate('/');
    props.showAlert("Login ", "success")

  }
  else{
    props.showAlert("Invalid", "danger")
  }
  

}
  const onChange = (e) => {
  setCredentials({...credentials , [e.target.name]: e.target.value})
  }

return (
  <div className='login-page'>

  <h2 className='heading'>Login to Add a New Note</h2>
    <div className='login-container' style={{backgroundColor: props.mode === 'light'? 'black': 'white',
    color: props.mode === 'light'? 'white': 'black'
    }}>
      <form onSubmit={handleSubmit}>
  <div className="mb-3 my-2">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email"  value={credentials.email} name="email" placeholder='Enter your email' onChange={onChange} aria-describedby="emailHelp"/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} placeholder='Enter your Password' name ="password"/>
  </div>
  <Link className='p' to='/signup'>Have an Account?</Link>

  <button type="submit" className="btn btn-primary login-btn">Submit</button>
</form>
    </div>
  </div>
  )
}

export default Login
