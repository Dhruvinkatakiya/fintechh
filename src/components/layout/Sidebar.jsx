import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowRightLeft,
  TrendingUp,
  X,
  Moon,
  Sun,
  Monitor,
  Shield,
  Eye,
  ChevronDown,
} from 'lucide-react';
import { useAppStore } from '../../store';
import { ROLES } from '../../constants';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowRightLeft, label: 'Transactions' },
  { to: '/insights', icon: TrendingUp, label: 'Insights' },
];

const themeOptions = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  // { value: 'system', icon: Monitor, label: 'System' },
];

export default function Sidebar() {
  const { sidebarOpen, closeSidebar, role, setRole, theme, setTheme } = useAppStore();
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          width: '272px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 h-[72px]">
          <div className="flex items-center gap-4">
            {/* <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: 'var(--gradient-primary)' }}
            >
              F
            </div> */}
            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              fintechh
            </span>
          </div>
          <button
            className="btn-ghost rounded-lg p-2 lg:hidden"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="px-5 py-5 space-y-2">
          <p
            className="text-xs font-semibold uppercase tracking-wider px-3 mb-3"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Menu
          </p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeSidebar}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                style={{
                  background: isActive ? 'var(--gradient-primary)' : 'transparent',
                  color: isActive ? 'white' : 'var(--text-secondary)',
                  boxShadow: isActive ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--bg-tertiary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }
                }}
              >
                <item.icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="mt-auto px-5 pt-4 pb-5 space-y-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          {/* Theme switcher */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider px-3 mb-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Theme
            </p>
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              {themeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                  style={{
                    background: theme === opt.value ? 'var(--bg-secondary)' : 'transparent',
                    color: theme === opt.value ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    boxShadow: theme === opt.value ? 'var(--shadow-md)' : 'none',
                  }}
                >
                  <opt.icon size={14} />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role switcher */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider px-3 mb-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Role
            </p>
            <div
              className="flex rounded-xl p-1 gap-1"
              style={{ background: 'var(--bg-tertiary)' }}
            >
              <button
                onClick={() => setRole(ROLES.ADMIN)}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: role === ROLES.ADMIN ? 'var(--bg-secondary)' : 'transparent',
                  color: role === ROLES.ADMIN ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  boxShadow: role === ROLES.ADMIN ? 'var(--shadow-md)' : 'none',
                }}
              >
                <Shield size={14} />
                Admin
              </button>
              <button
                onClick={() => setRole(ROLES.VIEWER)}
                className="flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                style={{
                  background: role === ROLES.VIEWER ? 'var(--bg-secondary)' : 'transparent',
                  color: role === ROLES.VIEWER ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  boxShadow: role === ROLES.VIEWER ? 'var(--shadow-md)' : 'none',
                }}
              >
                <Eye size={14} />
                Viewer
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
