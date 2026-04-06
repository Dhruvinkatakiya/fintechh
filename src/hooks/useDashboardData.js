import { useMemo } from 'react';
import { useTransactionStore } from '../store';
import { groupBy, sumBy, calcPercentChange } from '../utils/helpers';
import { MONTH_NAMES } from '../constants';

export function useDashboardData() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const now = new Date();

    // Totals
    const totalIncome = sumBy(
      transactions.filter((t) => t.type === 'income'),
      (t) => t.amount
    );
    const totalExpenses = sumBy(
      transactions.filter((t) => t.type === 'expense'),
      (t) => t.amount
    );
    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

    // Recent transactions
    const recentTransactions = transactions.slice(0, 5);

    // Balance trend (last 6 months)
    const balanceTrend = [];
    for (let i = 5; i >= 0; i--) {
      const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthLabel = MONTH_NAMES[month.getMonth()].slice(0, 3);

      const monthTxns = transactions.filter((t) => {
        const d = new Date(t.date);
        return d >= month && d <= monthEnd;
      });

      const income = sumBy(monthTxns.filter((t) => t.type === 'income'), (t) => t.amount);
      const expenses = sumBy(monthTxns.filter((t) => t.type === 'expense'), (t) => t.amount);

      balanceTrend.push({
        month: monthLabel,
        income: Math.round(income),
        expenses: Math.round(expenses),
        balance: Math.round(income - expenses),
      });
    }

    // Spending by category (donut chart)
    const expenseTxns = transactions.filter((t) => t.type === 'expense');
    const grouped = groupBy(expenseTxns, (t) => t.category);
    const spendingByCategory = Object.entries(grouped)
      .map(([category, txns]) => ({
        name: category,
        value: Math.round(sumBy(txns, (t) => t.amount)),
      }))
      .sort((a, b) => b.value - a.value);

    return {
      totalBalance,
      totalIncome,
      totalExpenses,
      savingsRate,
      recentTransactions,
      balanceTrend,
      spendingByCategory,
    };
  }, [transactions]);
}

export function useInsightsData() {
  const transactions = useTransactionStore((s) => s.transactions);

  return useMemo(() => {
    const now = new Date();

    // Current month expenses
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const currentMonthExpenses = transactions.filter(
      (t) => t.type === 'expense' && new Date(t.date) >= currentMonthStart && new Date(t.date) <= currentMonthEnd
    );

    // Previous month expenses
    const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const prevMonthExpenses = transactions.filter(
      (t) => t.type === 'expense' && new Date(t.date) >= prevMonthStart && new Date(t.date) <= prevMonthEnd
    );

    const currentTotal = sumBy(currentMonthExpenses, (t) => t.amount);
    const prevTotal = sumBy(prevMonthExpenses, (t) => t.amount);
    const monthOverMonthChange = calcPercentChange(currentTotal, prevTotal);

    // Top spending categories
    const allExpenses = transactions.filter((t) => t.type === 'expense');
    const totalExpenseAmount = sumBy(allExpenses, (t) => t.amount);
    const grouped = groupBy(allExpenses, (t) => t.category);
    const topCategories = Object.entries(grouped)
      .map(([category, txns]) => {
        const total = sumBy(txns, (t) => t.amount);
        return {
          category,
          total: Math.round(total),
          percentage: totalExpenseAmount > 0 ? (total / totalExpenseAmount) * 100 : 0,
          count: txns.length,
        };
      })
      .sort((a, b) => b.total - a.total)
      .slice(0, 3);

    // Average daily spending
    const daysInRange = Math.max(
      1,
      Math.ceil((now - new Date(now.getFullYear(), now.getMonth() - 5, 1)) / (1000 * 60 * 60 * 24))
    );
    const avgDailySpending = totalExpenseAmount / daysInRange;

    // Monthly comparison data
    const monthlyComparison = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      const monthLabel = MONTH_NAMES[monthStart.getMonth()].slice(0, 3);

      const monthExpenses = transactions.filter((t) => {
        const d = new Date(t.date);
        return t.type === 'expense' && d >= monthStart && d <= monthEnd;
      });

      const monthIncome = transactions.filter((t) => {
        const d = new Date(t.date);
        return t.type === 'income' && d >= monthStart && d <= monthEnd;
      });

      monthlyComparison.push({
        month: monthLabel,
        expenses: Math.round(sumBy(monthExpenses, (t) => t.amount)),
        income: Math.round(sumBy(monthIncome, (t) => t.amount)),
      });
    }

    return {
      topCategories,
      monthlyComparison,
      avgDailySpending,
      currentMonthTotal: currentTotal,
      prevMonthTotal: prevTotal,
      monthOverMonthChange,
      spendingTrendUp: currentTotal > prevTotal,
    };
  }, [transactions]);
}
