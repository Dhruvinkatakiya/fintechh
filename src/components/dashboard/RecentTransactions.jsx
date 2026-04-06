import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency, getRelativeTime } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../constants';
import { useNavigate } from 'react-router-dom';

export default function RecentTransactions({ transactions }) {
  const navigate = useNavigate();

  return (
    <div className="card p-5 sm:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            Recent Transactions
          </h3>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Latest activity
          </p>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className="btn btn-ghost btn-sm text-xs"
          style={{ color: '#6366f1' }}
        >
          View All →
        </button>
      </div>
      <div className="space-y-3">
        {transactions.map((txn, index) => (
          <div
            key={txn.id}
            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
            style={{
              background: 'transparent',
              animationDelay: `${index * 60}ms`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {/* Category dot */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{
                background: `${CATEGORY_COLORS[txn.category] || '#94a3b8'}15`,
              }}
            >
              {txn.type === 'income' ? (
                <ArrowUpRight size={18} style={{ color: '#10b981' }} />
              ) : (
                <ArrowDownRight size={18} style={{ color: CATEGORY_COLORS[txn.category] || '#94a3b8' }} />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                {txn.description}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {txn.category} · {getRelativeTime(txn.date)}
              </p>
            </div>

            {/* Amount */}
            <p
              className="text-sm font-bold whitespace-nowrap"
              style={{
                color: txn.type === 'income' ? '#10b981' : 'var(--text-primary)',
              }}
            >
              {txn.type === 'income' ? '+' : '-'}{formatCurrency(txn.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
