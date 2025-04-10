import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

function Dashboard({ transactions = [], isLoading = false }) {
  const [timeRange, setTimeRange] = useState(5); // Default to 5 days

  // Get recent transactions based on selected time range
  const recentTransactions = useMemo(() => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - timeRange);
    
    return [...transactions]
      .filter(tx => new Date(tx.date) >= startDate)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, timeRange]);

  // Calculate total balance
  const balance = useMemo(() => {
    return transactions.reduce((acc, tx) => {
      return tx.type === 'Income' ? acc + tx.amount : acc - tx.amount;
    }, 0);
  }, [transactions]);

  // Calculate income and expense summary
  const summary = useMemo(() => {
    let income = 0, expense = 0;
    transactions.forEach(tx => {
      if (tx.type === 'Income') income += tx.amount;
      else expense += tx.amount;
    });
    return { Income: income, Expense: expense };
  }, [transactions]);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  };

  if (isLoading) {
    return <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <div className="container mt-4">
      {/* Balance Section */}
      <div className="card text-center mb-4">
        <div className="card-body">
          <h2 className="card-title">Total Balance</h2>
          <h3 className={balance >= 0 ? "text-success" : "text-danger"}>
            ${formatCurrency(balance)}
          </h3>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Recent Transactions</h3>
          <div className="form-group mb-0">
            <select 
              className="form-select" 
              value={timeRange} 
              onChange={(e) => setTimeRange(Number(e.target.value))}
            >
              <option value="5">Last 5 days</option>
              <option value="7">Last week</option>
              <option value="30">Last month</option>
              <option value="90">Last 3 months</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          {recentTransactions.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{formatDate(tx.date)}</td>
                      <td>
                        <span className={`badge ${tx.type === 'Income' ? 'bg-success' : 'bg-danger'}`}>
                          {tx.type}
                        </span>
                      </td>
                      <td>{tx.description}</td>
                      <td className={tx.type === 'Income' ? 'text-success' : 'text-danger'}>
                        {tx.type === 'Expense' ? '-' : '+'}${formatCurrency(tx.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted mb-3">No transactions in this period.</p>
              <Link to="/tracktransaction" className="btn btn-primary">
                Add Your First Transaction
              </Link>
            </div>
          )}
        </div>
        {recentTransactions.length > 0 && (
          <div className="card-footer text-end">
            <Link to="/transactions" className="btn btn-outline-primary">
              View All Transactions
            </Link>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="card">
        <div className="card-header">
          <h3 className="mb-0">Summary</h3>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between">
              <span>Total Income</span>
              <span className="text-success">${formatCurrency(summary.Income)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total Expenses</span>
              <span className="text-danger">${formatCurrency(summary.Expense)}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Savings Rate</span>
              <span className={summary.Income > 0 ? 
                ((summary.Income - summary.Expense) / summary.Income) * 100 > 0 ? "text-success" : "text-danger" 
                : "text-muted"}>
                {summary.Income > 0 ? 
                  `${(((summary.Income - summary.Expense) / summary.Income) * 100).toFixed(1)}%` 
                  : "N/A"}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;