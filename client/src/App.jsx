import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Transactions from './pages/Transactions.jsx';
import TrackTransaction from './components/TrackTransaction.jsx';
import './styles/index.css'; // Make sure you have this or equivalent

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (tx) => {
    setTransactions(prev => [...prev, { id: Date.now(), ...tx }]);
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 d-flex justify-content-center align-items-start">
          <Routes>
            <Route path="/dashboard" element={<Dashboard transactions = {transactions}/>} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/transactions" element={<Transactions transactions = {transactions}/>}/>
            <Route path="/tracktransaction" element={<TrackTransaction addTransaction = {addTransaction}/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
