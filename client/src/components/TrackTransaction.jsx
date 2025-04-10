import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

function TrackTransaction({ addTransaction }) {
  const [type, setType] = useState('Income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      type,
      description,
      amount: parseFloat(amount),
      date: date || new Date().toISOString().split('T')[0], // today's date if blank
    };

    addTransaction(transaction);
    navigate('/dashboard');
    setType('Income');
    setDescription('');
    setAmount('');
    setDate('');
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
          />
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date <small className="text-muted">(Leave blank to use today)</small></label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success w-100">Add Transaction</button>
      </form>
    </div>
  );
}

export default TrackTransaction;
