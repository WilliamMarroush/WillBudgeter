import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

function Transactions({ 
  transactions = [], 
  onUpdateTransaction, 
  onDeleteTransaction 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const itemsPerPage = 10;

  // Format date for input fields
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Handle delete with confirmation
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDeleteTransaction(id);
    }
  };

  // Handle edit button click
  const handleEditClick = (transaction) => {
    setEditingTransaction({...transaction});
    // Use Bootstrap's modal API to show the modal
    const modalElement = document.getElementById('editTransactionModal');
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
  };

  // Handle save edited transaction
  const handleSaveEdit = (e) => {
    e.preventDefault();
    onUpdateTransaction(editingTransaction);
    // Hide the modal using Bootstrap's API
    const modalElement = document.getElementById('editTransactionModal');
    const bootstrapModal = bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
    setEditingTransaction(null);
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTransaction(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    return [...transactions]
      .filter(tx => {
        // Filter by type
        if (filterType !== 'All' && tx.type !== filterType) return false;
        
        // Filter by search term
        if (searchTerm && !tx.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        
        return true;
      })
      // Sort with newest dates first - explicitly create Date objects
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
  }, [transactions, filterType, searchTerm]);

  // Get current page items
  const currentTransactions = useMemo(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);
  }, [filteredTransactions, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      {/* Bootstrap Modal for Edit Transaction */}
      <div className="modal fade" id="editTransactionModal" tabIndex="-1" aria-labelledby="editTransactionModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            {editingTransaction && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="editTransactionModalLabel">Edit Transaction</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form id="editForm" onSubmit={handleSaveEdit}>
                    <div className="mb-3">
                      <label htmlFor="editDate" className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="editDate"
                        name="date"
                        value={formatDateForInput(editingTransaction.date)}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editType" className="form-label">Type</label>
                      <select
                        className="form-select"
                        id="editType"
                        name="type"
                        value={editingTransaction.type}
                        onChange={handleEditChange}
                        required
                      >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editDescription" className="form-label">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editDescription"
                        name="description"
                        value={editingTransaction.description}
                        onChange={handleEditChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editAmount" className="form-label">Amount</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          className="form-control"
                          id="editAmount"
                          name="amount"
                          value={editingTransaction.amount}
                          onChange={handleEditChange}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" form="editForm" className="btn btn-primary">Save Changes</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Transactions</h2>
        <Link to="/tracktransaction" className="btn btn-primary">
          Add Transaction
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset to first page on search
                }}
              />
            </div>
            <div className="col-md-6">
              <select 
                className="form-select" 
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1); // Reset to first page on filter change
                }}
              >
                <option value="All">All Types</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card">
        <div className="card-body">
          {currentTransactions.length > 0 ? (
            <>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Description</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td>{tx.date}</td>
                        <td>
                          <span className={`badge ${tx.type === 'Income' ? 'bg-success' : 'bg-danger'}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td>{tx.description}</td>
                        <td className={tx.type === 'Income' ? 'text-success' : 'text-danger'}>
                          {tx.type === 'Expense' ? '-' : '+'}${parseFloat(tx.amount).toFixed(2)}
                        </td>
                        <td>
                          <button 
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => handleEditClick(tx)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(tx.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Transactions pagination" className="mt-4">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    
                    {[...Array(totalPages).keys()].map(number => (
                      <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => paginate(number + 1)}
                        >
                          {number + 1}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted mb-3">No transactions match your filters.</p>
              {filterType !== 'All' || searchTerm ? (
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setFilterType('All');
                    setSearchTerm('');
                  }}
                >
                  Clear Filters
                </button>
              ) : (
                <Link to="/tracktransaction" className="btn btn-primary">
                  Add Your First Transaction
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transactions;