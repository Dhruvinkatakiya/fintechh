import { lazy, Suspense } from 'react';
import { useDashboardData } from '../../hooks/useDashboardData';
import SummaryCards from '../../components/dashboard/SummaryCards';
const BalanceChart = lazy(() => import('../../components/dashboard/BalanceChart'));
const SpendingDonut = lazy(() => import('../../components/dashboard/SpendingDonut'));
import RecentTransactions from '../../components/dashboard/RecentTransactions';

export default function DashboardPage() {
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    savingsRate,
    recentTransactions,
    balanceTrend,
    spendingByCategory,
  } = useDashboardData();

  return (
    <div className="space-y-6 lg:space-y-7">
      <SummaryCards
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        savingsRate={savingsRate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-xl" />}>
            <BalanceChart data={balanceTrend} />
          </Suspense>
        </div>
        <div className="lg:col-span-2">
          <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-xl" />}>
            <SpendingDonut data={spendingByCategory} />
          </Suspense>
        </div>
      </div>
      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}
