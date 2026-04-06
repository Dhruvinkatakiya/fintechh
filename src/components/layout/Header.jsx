import { Menu, Bell, Search } from 'lucide-react';
import { useAppStore } from '../../store';
import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
};

export default function Header() {
  const { toggleSidebar, role } = useAppStore();
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] || 'Dashboard';

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 h-16"
      style={{
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="flex items-center gap-3">
        <button
          className="btn-ghost rounded-xl p-2 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={22} style={{ color: 'var(--text-primary)' }} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {title}
          </h1>
          <p className="text-xs hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Role badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{
            background: role === 'admin' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(245, 158, 11, 0.12)',
            color: role === 'admin' ? '#6366f1' : '#f59e0b',
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: role === 'admin' ? '#6366f1' : '#f59e0b' }}
          />
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </div>

        {/* Notification bell */}
        <button className="btn-ghost rounded-xl p-2 relative">
          <Bell size={20} style={{ color: 'var(--text-secondary)' }} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: '#ef4444' }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer"
          style={{ background: 'var(--gradient-primary)' }}
        >
          DK
        </div>
      </div>
    </header>
  );
}
