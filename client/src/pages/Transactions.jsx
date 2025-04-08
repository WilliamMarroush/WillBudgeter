import { useState } from 'react';

function Transactions() {
  // Add some sample transaction data
  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, date: '2025-04-01', type: 'Income', description: 'Salary', amount: 5000 },
    { id: 2, date: '2025-04-05', type: 'Expense', description: 'Groceries', amount: 150 },
    { id: 3, date: '2025-04-06', type: 'Expense', description: 'Internet', amount: 50 },
    { id: 4, date: '2025-04-07', type: 'Income', description: 'Freelance Work', amount: 1000 }
  ]);

  return (
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
  );
}

export default Transactions;
