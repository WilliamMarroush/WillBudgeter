// Import necessary modules and components
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import SignIn from './SignIn.js'; // Import SignIn component
import SignUp from './SignUp.js'; // Import SignUp component

function App() {
  return (
    // Router is used to handle navigation between different pages
    <Router>
      <div>
        <Routes>
          {/* Define routes for the SignUp and SignIn pages */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {/* Default route set to SignIn */}
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
