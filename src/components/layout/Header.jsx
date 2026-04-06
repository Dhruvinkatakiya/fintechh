import { useState, useRef, useEffect } from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useAppStore } from '../../store';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../../utils/auth';
import toast from 'react-hot-toast';
import { createPortal } from 'react-dom';

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
  const avatarRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, minWidth: 192 });

  const title = PAGE_TITLES[location.pathname] || 'Dashboard';

  const handleLogout = () => {
    clearAuthToken();
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  // Position the portal menu to the avatar button
  useEffect(() => {
    if (!showUserMenu) return;

    function updatePosition() {
      const btn = avatarRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const menuWidth = 192; // match w-48
      let left = rect.right - menuWidth;
      if (left < 8) left = 8;
      const top = rect.bottom + window.scrollY + 8;
      setMenuStyle({ top, left, minWidth: menuWidth });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [showUserMenu]);

  // Close on Escape
  useEffect(() => {
    if (!showUserMenu) return;
    function onKey(e) {
      if (e.key === 'Escape') setShowUserMenu(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showUserMenu]);

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
            ref={avatarRef}
            onClick={() => setShowUserMenu((s) => !s)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:shadow-lg transition-shadow"
            style={{ background: 'var(--gradient-primary)' }}
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            DK
          </button>

          {/* Portal menu + overlay to avoid stacking/context issues */}
          {showUserMenu &&
            createPortal(
              <div
                role="menu"
                aria-label="User menu"
                style={{
                  position: 'absolute',
                  top: menuStyle.top,
                  left: menuStyle.left,
                  minWidth: menuStyle.minWidth,
                  zIndex: 9999,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <div
                  className="shadow-lg card-skeuomorphic"
                  style={{ border: '1px solid var(--border-color)' }}
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
              </div>,
              document.body,
            )}

          {showUserMenu &&
            createPortal(
              <div
                onClick={() => setShowUserMenu(false)}
                style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
              />,
              document.body,
            )}
        </div>
      </div>
    </header>
  );
}
