import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import './styles/index.css'; // Make sure you have this or equivalent

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 d-flex justify-content-center align-items-start">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
