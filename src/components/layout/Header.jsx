import { useState } from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useAppStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../../utils/auth';
import toast from 'react-hot-toast';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/transactions': 'Transactions',
  '/insights': 'Insights',
  '/dashboard': 'Dashboard',
};

export default function Header() {
  const { toggleSidebar, role } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const title = PAGE_TITLES[location.pathname] || 'Dashboard';

  const handleLogout = () => {
    clearAuthToken();
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

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

        {/* Avatar with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:shadow-lg transition-shadow"
            style={{ background: 'var(--gradient-primary)' }}
            aria-label="User menu"
          >
            DK
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div
              className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg overflow-hidden z-50"
              style={{
                background: 'var(--panel-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="p-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  User Account
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  demo@example.com
                </p>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium hover:bg-red-500/10 transition-colors"
                style={{ color: '#ef4444' }}
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          )}

          {/* Close menu when clicking outside */}
          {showUserMenu && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowUserMenu(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
}
