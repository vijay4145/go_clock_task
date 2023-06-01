import './App.css';
import {  
  BrowserRouter as Router,
  Route,
  Routes,} from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { Login } from './components/auth/Login';
import { AuthPage } from './pages/AuthPage';



function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/auth' element={<AuthPage/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
