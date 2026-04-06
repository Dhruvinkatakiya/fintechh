import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialTransactions } from '../data/mockData';
import { generateId } from '../utils/helpers';

export const useTransactionStore = create(
  persist(
    (set, get) => ({
      transactions: initialTransactions,

      addTransaction: (txn) => {
        const newTxn = { ...txn, id: generateId() };
        set((state) => ({
          transactions: [newTxn, ...state.transactions].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          ),
        }));
        return newTxn;
      },

      updateTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      getTransaction: (id) => {
        return get().transactions.find((t) => t.id === id);
      },
    }),
    {
      name: 'finvault-transactions',
    }
  )
);

export const useAppStore = create(
  persist(
    (set) => ({
      role: 'admin',
      theme: 'system',
      sidebarOpen: false,

      setRole: (role) => set({ role }),

      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      closeSidebar: () => set({ sidebarOpen: false }),
    }),
    {
      name: 'finvault-settings',
    }
  )
);

// Apply theme to document
export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // system
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}
