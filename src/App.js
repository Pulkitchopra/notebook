import './App.css';
import Navbar from './components/Navbar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About'
import Login from './components/Login'
import Signup from './components/Signup'
import NoteState from './context/notes/NoteState';
import {useState} from 'react';
import Alert from './components/Alert';


function App() {


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({

      msg: message,
      type: type

    })

    setTimeout(() => {
      
      setAlert(null);
    }, 1500);
  }

  const [mode, setMode] = useState('light');
  const toggleMode = () => {
    if (mode === 'light'){
      setMode('dark')
      document.body.style.backgroundColor = 'rgb(32, 32, 43)';
      document.body.style.color = 'white';
    }
    else{
      setMode('light')
      document.body.style.backgroundColor = 'rgb(208, 208, 208)';
      document.body.style.color = 'black';
    }
  }
  return (
    <>

    <NoteState>
    <Router>
      <Navbar title = "Notebook" mode= {mode} toggleMode = {toggleMode} />
      <Alert alert = {alert}/>
      <div className='container'>
      <Routes>

      <Route exact path="/" element = {<Home showAlert = {showAlert} />}/>
      <Route exact path="/about" element = {<About/>}/>
      <Route exact path="/login" element = {<Login showAlert = {showAlert}/>}/>
      <Route exact path="/signup" element = {<Signup showAlert = {showAlert}/>}/>
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
