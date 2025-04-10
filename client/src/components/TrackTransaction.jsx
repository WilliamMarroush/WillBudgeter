import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TrackTransaction({ addTransaction }) {
  const [type, setType] = useState('Income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today's date
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate amount
    if (parseFloat(amount) <= 0) {
      alert('Amount must be greater than zero');
      return;
    }
    
    const transaction = {
      type,
      description,
      amount: parseFloat(amount),
      date: date || new Date().toISOString().split('T')[0], // today's date if somehow blank
    };
    
    addTransaction(transaction);
    
    // Reset form and navigate
    setType('Income');
    setDescription('');
    setAmount('');
    setDate(new Date().toISOString().split('T')[0]);
    
    navigate('/transactions'); // Navigate to transactions page instead of dashboard
  };

  return (
    <div className="container mt-4 p-4 border rounded" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 text-center">Track a New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="e.g. Salary, Groceries, Rent"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              step="0.01"
              min="0.01"
              className="form-control"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="d-flex justify-content-between">
          <button 
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success">Add Transaction</button>
        </div>
      </form>
    </div>
  );
}

export default TrackTransaction;