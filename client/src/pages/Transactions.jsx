import { useState } from 'react';
import { Link } from 'react-router-dom';
function Transactions({transactions = []}) {
  // Add some sample transaction data
  return (
    <>
      <div className="mb-4">
        <h3>All Transactions</h3>
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
            {[...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).map((tx) => (
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
      <Link to="/tracktransaction" className="btn btn-primary">
        Track Transaction
      </Link>
    </>
  );
}

export default Transactions;
