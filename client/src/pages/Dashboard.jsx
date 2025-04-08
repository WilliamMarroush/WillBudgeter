import { useState } from 'react';

function Dashboard() {
  // Placeholder state — you'll replace this with real data later
  const [balance, setBalance] = useState(0);
  const recentTransactions = [
    { id: 1, type: 'Income', amount: 2000, description: 'Freelance', date: '2025-04-01' },
    { id: 2, type: 'Expense', amount: 50, description: 'Groceries', date: '2025-04-02' },
    { id: 3, type: 'Expense', amount: 100, description: 'Utilities', date: '2025-04-03' },
  ];

  const summary = {
    Income: 2000,
    Expense: 150,
  };

  return (
    <div className="container mt-4">
      {/* Balance Section */}
      <div className="card text-center mb-4">
        <div className="card-body">
          <h2 className="card-title">Total Balance</h2>
          <h3 className="text-success">${balance}</h3>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="mb-4">
        <h3>Recent Transactions</h3>
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
                <td>{tx.date}</td>
                <td>{tx.type}</td>
                <td>{tx.description}</td>
                <td className={tx.type === 'Income' ? 'text-success' : 'text-danger'}>
                  {tx.type === 'Expense' ? '-' : '+'}${tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div>
        <h3>Summary</h3>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between">
            <span>Total Income</span>
            <span className="text-success">${summary.Income}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>Total Expenses</span>
            <span className="text-danger">${summary.Expense}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
