import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';

const cardConfigs = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: DollarSign,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)',
    shadowColor: 'rgba(99, 102, 241, 0.25)',
    format: (v) => formatCurrency(v),
  },
  {
    key: 'income',
    label: 'Total Income',
    icon: ArrowUpRight,
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    shadowColor: 'rgba(16, 185, 129, 0.25)',
    format: (v) => formatCurrency(v),
  },
  {
    key: 'expenses',
    label: 'Total Expenses',
    icon: ArrowDownRight,
    gradient: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
    shadowColor: 'rgba(239, 68, 68, 0.25)',
    format: (v) => formatCurrency(v),
  },
  {
    key: 'savings',
    label: 'Savings Rate',
    icon: PiggyBank,
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    shadowColor: 'rgba(245, 158, 11, 0.25)',
    format: (v) => `${v.toFixed(1)}%`,
  },
];

export default function SummaryCards({ totalBalance, totalIncome, totalExpenses, savingsRate }) {
  const values = {
    balance: totalBalance,
    income: totalIncome,
    expenses: totalExpenses,
    savings: savingsRate,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger">
      {cardConfigs.map((config) => (
        <div
          key={config.key}
          className="card p-5 group cursor-default"
          style={{ transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              {config.label}
            </p>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: config.gradient, boxShadow: `0 4px 12px ${config.shadowColor}` }}
            >
              <config.icon size={18} color="white" />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {config.format(values[config.key])}
          </p>
          <div className="flex items-center gap-1 mt-2">
            {config.key === 'savings' ? (
              <span className="text-xs font-medium" style={{ color: values.savings >= 20 ? '#10b981' : '#f59e0b' }}>
                {values.savings >= 20 ? 'On track' : 'Needs improvement'}
              </span>
            ) : (
              <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Last 6 months
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
