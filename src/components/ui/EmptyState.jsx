import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'No data found', message = 'Try adjusting your filters.', icon: Icon = Inbox }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'var(--bg-tertiary)' }}
      >
        <Icon size={28} style={{ color: 'var(--text-tertiary)' }} />
      </div>
      <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
        {message}
      </p>
    </div>
  );
}
