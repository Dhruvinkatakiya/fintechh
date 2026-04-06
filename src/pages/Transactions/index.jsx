import { useState } from 'react';
import {
  Search, SlidersHorizontal, Plus, Pencil, Trash2, ArrowUpDown, Download,
  ChevronLeft, ChevronRight, X, ArrowUpRight, ArrowDownRight, RotateCcw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useFilteredTransactions } from '../../hooks/useFilteredTransactions';
import { useTransactionStore, useAppStore } from '../../store';
import { CATEGORIES, CATEGORY_COLORS, ROLES } from '../../constants';
import { formatCurrency, formatDate, exportToCSV } from '../../utils/helpers';
import Modal from '../../components/ui/Modal';
import TransactionForm from '../../components/ui/TransactionForm';
import EmptyState from '../../components/ui/EmptyState';

export default function TransactionsPage() {
  const { filters, updateFilter, setPage, toggleSort, resetFilters, paginated, totalPages, totalCount, filtered } =
    useFilteredTransactions();
  const { addTransaction, updateTransaction, deleteTransaction } = useTransactionStore();
  const role = useAppStore((s) => s.role);
  const isAdmin = role === ROLES.ADMIN;

  const [modalOpen, setModalOpen] = useState(false);
  const [editTxn, setEditTxn] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAdd = (data) => {
    addTransaction(data);
    setModalOpen(false);
    toast.success('Transaction added!');
  };

  const handleEdit = (data) => {
    updateTransaction(editTxn.id, data);
    setEditTxn(null);
    toast.success('Transaction updated!');
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
    setDeleteConfirm(null);
    toast.success('Transaction deleted!');
  };

  const handleExport = () => {
    const rows = filtered.map((t) => ({
      Date: t.date,
      Description: t.description,
      Category: t.category,
      Type: t.type,
      Amount: t.amount,
    }));
    exportToCSV(rows, 'fintechh-transactions');
    toast.success('CSV exported!');
  };

  const hasActiveFilters = filters.search || filters.category || filters.type || filters.dateFrom || filters.dateTo;

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            All Transactions
          </h2>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {totalCount} transaction{totalCount !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="btn btn-secondary btn-sm">
            <Download size={15} />
            <span className="hidden sm:inline">Export</span>
          </button>
          {isAdmin && (
            <button onClick={() => setModalOpen(true)} className="btn btn-primary btn-sm">
              <Plus size={15} />
              Add
            </button>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-tertiary)' }}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="input"
              style={{ paddingLeft: '36px' }}
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            <SlidersHorizontal size={15} />
            Filters
            {hasActiveFilters && (
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: showFilters ? '#fff' : '#6366f1' }}
              />
            )}
          </button>
          {hasActiveFilters && (
            <button onClick={resetFilters} className="btn btn-ghost btn-sm" style={{ color: '#ef4444' }}>
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 animate-fade-in"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Category</label>
              <select
                className="input"
                value={filters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>Type</label>
              <select
                className="input"
                value={filters.type}
                onChange={(e) => updateFilter('type', e.target.value)}
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>From</label>
              <input
                type="date"
                className="input"
                value={filters.dateFrom}
                onChange={(e) => updateFilter('dateFrom', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--text-secondary)' }}>To</label>
              <input
                type="date"
                className="input"
                value={filters.dateTo}
                onChange={(e) => updateFilter('dateTo', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      {paginated.length > 0 ? (
        <div className="card overflow-hidden animate-fade-in">
          <div className="table-container" style={{ border: 'none' }}>
            <table>
              <thead>
                <tr>
                  <th
                    className="cursor-pointer select-none"
                    onClick={() => toggleSort('date')}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      <ArrowUpDown size={13} style={{ opacity: filters.sortBy === 'date' ? 1 : 0.3 }} />
                    </div>
                  </th>
                  <th>Description</th>
                  <th>Category</th>
                  <th
                    className="cursor-pointer select-none"
                    onClick={() => toggleSort('amount')}
                  >
                    <div className="flex items-center gap-1">
                      Amount
                      <ArrowUpDown size={13} style={{ opacity: filters.sortBy === 'amount' ? 1 : 0.3 }} />
                    </div>
                  </th>
                  <th>Type</th>
                  {isAdmin && <th className="text-right">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {paginated.map((txn) => (
                  <tr key={txn.id}>
                    <td className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {formatDate(txn.date)}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: `${CATEGORY_COLORS[txn.category] || '#94a3b8'}15` }}
                        >
                          {txn.type === 'income' ? (
                            <ArrowUpRight size={14} style={{ color: '#10b981' }} />
                          ) : (
                            <ArrowDownRight size={14} style={{ color: CATEGORY_COLORS[txn.category] || '#94a3b8' }} />
                          )}
                        </div>
                        <span className="font-medium text-sm">{txn.description}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          background: `${CATEGORY_COLORS[txn.category] || '#94a3b8'}12`,
                          color: CATEGORY_COLORS[txn.category] || '#94a3b8',
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: CATEGORY_COLORS[txn.category] || '#94a3b8' }}
                        />
                        {txn.category}
                      </span>
                    </td>
                    <td>
                      <span
                        className="font-bold text-sm"
                        style={{ color: txn.type === 'income' ? '#10b981' : 'var(--text-primary)' }}
                      >
                        {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${txn.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                        {txn.type === 'income' ? '↑ Income' : '↓ Expense'}
                      </span>
                    </td>
                    {isAdmin && (
                      <td>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditTxn(txn)}
                            className="btn-ghost rounded-lg p-1.5"
                            title="Edit"
                          >
                            <Pencil size={15} style={{ color: 'var(--text-tertiary)' }} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(txn)}
                            className="btn-ghost rounded-lg p-1.5"
                            title="Delete"
                          >
                            <Trash2 size={15} style={{ color: '#ef4444' }} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderTop: '1px solid var(--border-color)' }}
            >
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Page {filters.page} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(filters.page - 1)}
                  disabled={filters.page <= 1}
                  className="btn btn-ghost btn-sm disabled:opacity-30"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (filters.page <= 3) {
                    pageNum = i + 1;
                  } else if (filters.page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = filters.page - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className="btn btn-sm w-8 h-8 p-0"
                      style={{
                        background: filters.page === pageNum ? 'var(--gradient-primary)' : 'transparent',
                        color: filters.page === pageNum ? 'white' : 'var(--text-secondary)',
                        boxShadow: filters.page === pageNum ? '0 2px 8px rgba(99,102,241,0.3)' : 'none',
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(filters.page + 1)}
                  disabled={filters.page >= totalPages}
                  className="btn btn-ghost btn-sm disabled:opacity-30"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            title="No transactions found"
            message={hasActiveFilters ? 'Try adjusting your filters to find what you\'re looking for.' : 'Add your first transaction to get started.'}
          />
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Transaction">
        <TransactionForm onSubmit={handleAdd} onCancel={() => setModalOpen(false)} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editTxn} onClose={() => setEditTxn(null)} title="Edit Transaction">
        {editTxn && (
          <TransactionForm
            initialData={editTxn}
            onSubmit={handleEdit}
            onCancel={() => setEditTxn(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Transaction">
        {deleteConfirm && (
          <div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
              Are you sure you want to delete this transaction?
            </p>
            <div
              className="p-3 rounded-xl mb-5 mt-3"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <p className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                {deleteConfirm.description}
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                {formatDate(deleteConfirm.date)} · {formatCurrency(deleteConfirm.amount)}
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn btn-secondary flex-1">
                Cancel
              </button>
              <button onClick={() => handleDelete(deleteConfirm.id)} className="btn btn-danger flex-1">
                <Trash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
