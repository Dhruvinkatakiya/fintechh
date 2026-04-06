import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '../../constants';
import { formatCurrency } from '../../utils/helpers';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const data = payload[0];
  return (
    <div
      className="px-4 py-3 rounded-xl text-sm"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <p className="font-semibold" style={{ color: data.payload.fill }}>{data.name}</p>
      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        {formatCurrency(data.value)}
      </p>
    </div>
  );
}

export default function SpendingDonut({ data }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="card p-5 sm:p-6 animate-fade-in">
      <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
        Spending Breakdown
      </h3>
      <p className="text-xs mb-5" style={{ color: 'var(--text-tertiary)' }}>
        Expenses by category
      </p>
      <div className="flex flex-col items-center">
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                cornerRadius={4}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4 w-full max-w-sm">
          {data.slice(0, 6).map((item) => {
            const pct = total > 0 ? ((item.value / total) * 100).toFixed(1) : 0;
            return (
              <div key={item.name} className="flex items-center gap-2 text-xs">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: CATEGORY_COLORS[item.name] || '#94a3b8' }}
                />
                <span className="truncate" style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
                <span className="ml-auto font-semibold" style={{ color: 'var(--text-primary)' }}>{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
