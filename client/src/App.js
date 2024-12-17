import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignIn from './SignIn.js';
import SignUp from './SignUp.js';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element = {<SignUp/>}/>
          <Route path="/signin" element = {<SignIn/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
