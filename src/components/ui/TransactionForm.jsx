import { useState } from 'react';
import { CATEGORIES, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants';

export default function TransactionForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    date: initialData?.date || new Date().toISOString().split('T')[0],
    description: initialData?.description || '',
    category: initialData?.category || 'Food',
    amount: initialData?.amount || '',
    type: initialData?.type || 'expense',
  });

  const [errors, setErrors] = useState({});

  const categoryOptions = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleChange = (key, value) => {
    const updates = { [key]: value };
    // Auto-switch category if type changes
    if (key === 'type') {
      const cats = value === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
      if (!cats.includes(form.category)) {
        updates.category = cats[0];
      }
    }
    setForm((prev) => ({ ...prev, ...updates }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!form.date) errs.date = 'Date is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.amount || Number(form.amount) <= 0) errs.amount = 'Enter a valid amount';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      amount: parseFloat(form.amount),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type toggle */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Type
        </label>
        <div className="flex rounded-xl p-1 gap-1" style={{ background: 'var(--bg-tertiary)' }}>
          {['expense', 'income'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleChange('type', type)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 capitalize"
              style={{
                background: form.type === type ? 'var(--bg-secondary)' : 'transparent',
                color: form.type === type
                  ? (type === 'income' ? '#10b981' : '#ef4444')
                  : 'var(--text-tertiary)',
                boxShadow: form.type === type ? 'var(--shadow-md)' : 'none',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Date
        </label>
        <input
          type="date"
          className="input"
          value={form.date}
          onChange={(e) => handleChange('date', e.target.value)}
        />
        {errors.date && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.date}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Description
        </label>
        <input
          type="text"
          className="input"
          placeholder="e.g., Coffee at Starbucks"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {errors.description && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.description}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Category
        </label>
        <select
          className="input"
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
          Amount ($)
        </label>
        <input
          type="number"
          className="input"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={form.amount}
          onChange={(e) => handleChange('amount', e.target.value)}
        />
        {errors.amount && <p className="text-xs mt-1" style={{ color: '#ef4444' }}>{errors.amount}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="btn btn-secondary flex-1">
          Cancel
        </button>
        <button type="submit" className="btn btn-primary flex-1">
          {initialData ? 'Update' : 'Add Transaction'}
        </button>
      </div>
    </form>
  );
}
