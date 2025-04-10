import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import SignIn from './components/SignIn.jsx';
import SignUp from './components/SignUp.jsx';
import Transactions from './pages/Transactions.jsx';
import TrackTransaction from './components/TrackTransaction.jsx';
import BudgetCalendar from './pages/Budgetcalendar.jsx';
import './styles/index.css'; // Make sure you have this or equivalent

function App() {
  // Load transactions from localStorage on initial render
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction function
  const addTransaction = (tx) => {
    setTransactions(prev => [...prev, { id: Date.now(), ...tx }]);
  };

  // Update transaction function
  const updateTransaction = (updatedTransaction) => {
    setTransactions(prev => 
      prev.map(tx => tx.id === updatedTransaction.id ? updatedTransaction : tx)
    );
  };

  // Delete transaction function
  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 d-flex justify-content-center align-items-start">
          <Routes>
            <Route path="/dashboard" element={<Dashboard transactions={transactions} />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/budgcal" element={<BudgetCalendar />} />
            <Route 
              path="/transactions" 
              element={
                <Transactions 
                  transactions={transactions}
                  onUpdateTransaction={updateTransaction}
                  onDeleteTransaction={deleteTransaction}
                />
              }
            />
            <Route 
              path="/tracktransaction" 
              element={<TrackTransaction addTransaction={addTransaction} />}
            />
            {/* Add a default route to redirect to dashboard */}
            <Route path="/" element={<Dashboard transactions={transactions} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;