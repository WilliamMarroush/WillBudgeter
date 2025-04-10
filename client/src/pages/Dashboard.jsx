import { useState, useMemo } from 'react';

function Dashboard({transactions = []}) {
  // Core states

  const recentTransactions = useMemo(() => {
    const fiveDaysAgo = new Date();
    fiveDaysAgo.setDate(fiveDaysAgo.getDate()-5);
    return [...transactions]
    .filter(tx => new Date(tx.date) >= fiveDaysAgo)
    .sort((a,b) => new Date(b.date) - new Date(a.date));
  }, [transactions]);

  const balance = useMemo(()=>{
    return transactions.reduce((acc,tx)=>{
      return tx.type === 'Income' ? acc + tx.amount : acc - tx.amount;
    },0);
  },[transactions]);

  const summary = useMemo(()=>{
    let income = 0, expense = 0;
    transactions.forEach(tx=>{
      if (tx.type === 'Income') income += tx.amount;
      else expense += tx.amount;
    });
    return {Income:income, Expense:expense};
  },[transactions]);

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
        {recentTransactions.length > 0 ? (
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
        ) : (
          <p className="text-muted">No transactions yet.</p>
        )}
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
