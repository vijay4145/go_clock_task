import './App.css';
import {  
  BrowserRouter as Router,
  Route,
  Routes,} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';


function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/login' element={<Login/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
