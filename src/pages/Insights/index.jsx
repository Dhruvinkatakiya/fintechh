import { TrendingUp, TrendingDown, Zap, CalendarDays } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useInsightsData } from '../../hooks/useDashboardData';
import { formatCurrency } from '../../utils/helpers';
import { CATEGORY_COLORS } from '../../constants';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-4 py-3 rounded-xl text-sm"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export default function InsightsPage() {
  const {
    topCategories,
    monthlyComparison,
    avgDailySpending,
    currentMonthTotal,
    prevMonthTotal,
    monthOverMonthChange,
    spendingTrendUp,
  } = useInsightsData();

  return (
    <div className="space-y-8">
      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
        {/* Spending Trend */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Spending Trend
            </p>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: spendingTrendUp
                  ? 'rgba(239, 68, 68, 0.1)'
                  : 'rgba(16, 185, 129, 0.1)',
              }}
            >
              {spendingTrendUp ? (
                <TrendingUp size={18} style={{ color: '#ef4444' }} />
              ) : (
                <TrendingDown size={18} style={{ color: '#10b981' }} />
              )}
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {monthOverMonthChange >= 0 ? '+' : ''}{monthOverMonthChange.toFixed(1)}%
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            {spendingTrendUp ? 'More spending' : 'Less spending'} vs last month
          </p>
          <div className="flex items-center gap-3 mt-3 pt-3" style={{ borderTop: '1px solid var(--border-color)' }}>
            <div>
              <p className="text-[10px] font-medium uppercase" style={{ color: 'var(--text-tertiary)' }}>This month</p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(currentMonthTotal)}</p>
            </div>
            <div className="w-px h-8" style={{ background: 'var(--border-color)' }} />
            <div>
              <p className="text-[10px] font-medium uppercase" style={{ color: 'var(--text-tertiary)' }}>Last month</p>
              <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatCurrency(prevMonthTotal)}</p>
            </div>
          </div>
        </div>

        {/* Average Daily */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Daily Average
            </p>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(99, 102, 241, 0.1)' }}
            >
              <CalendarDays size={18} style={{ color: '#6366f1' }} />
            </div>
          </div>
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {formatCurrency(avgDailySpending)}
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
            Average daily spending
          </p>
        </div>

        {/* Top Category */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
              Top Category
            </p>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(245, 158, 11, 0.1)' }}
            >
              <Zap size={18} style={{ color: '#f59e0b' }} />
            </div>
          </div>
          {topCategories[0] && (
            <>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {topCategories[0].category}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
                {formatCurrency(topCategories[0].total)} · {topCategories[0].percentage.toFixed(1)}% of total
              </p>
            </>
          )}
        </div>
      </div>

      {/* Top 3 Categories */}
      <div className="card p-6 animate-fade-in">
        <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Top Spending Categories
        </h3>
        <p className="text-xs mb-5" style={{ color: 'var(--text-tertiary)' }}>
          Where your money goes the most
        </p>
        <div className="space-y-4">
          {topCategories.map((cat, i) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-sm font-bold w-6 h-6 rounded-lg flex items-center justify-center"
                    style={{
                      background: `${CATEGORY_COLORS[cat.category] || '#94a3b8'}15`,
                      color: CATEGORY_COLORS[cat.category] || '#94a3b8',
                    }}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {cat.category}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      {cat.count} transaction{cat.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {formatCurrency(cat.total)}
                  </p>
                  <p className="text-xs font-medium" style={{ color: CATEGORY_COLORS[cat.category] || '#94a3b8' }}>
                    {cat.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
              {/* Progress bar */}
              <div
                className="w-full h-2 rounded-full overflow-hidden"
                style={{ background: 'var(--bg-tertiary)' }}
              >
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${cat.percentage}%`,
                    background: CATEGORY_COLORS[cat.category] || '#94a3b8',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Month-over-Month Comparison Chart */}
      <div className="card p-6 animate-fade-in">
        <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
          Month-over-Month Comparison
        </h3>
        <p className="text-xs mb-6" style={{ color: 'var(--text-tertiary)' }}>
          Income vs Expenses over the last 6 months
        </p>
        <div style={{ height: 360 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyComparison} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
                iconType="circle"
                iconSize={8}
              />
              <Bar
                dataKey="income"
                name="Income"
                fill="#10b981"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#ef4444"
                radius={[6, 6, 0, 0]}
                barSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
