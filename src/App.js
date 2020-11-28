
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import {useEffect} from 'react'

function App() {

  const history = useHistory();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      history.push('/dashboard')
    }else{
      history.push('/')
    }
  }, [])

  return (
    <div className="App">

      <Route exact path='/' component={Home} />
      <Route exact path='/dashboard' component={Dashboard}/>
      
    </div>
  );
}

export default App;
