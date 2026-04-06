import { useDashboardData } from '../../hooks/useDashboardData';
import SummaryCards from '../../components/dashboard/SummaryCards';
import BalanceChart from '../../components/dashboard/BalanceChart';
import SpendingDonut from '../../components/dashboard/SpendingDonut';
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
    <div className="space-y-8">
      <SummaryCards
        totalBalance={totalBalance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        savingsRate={savingsRate}
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <BalanceChart data={balanceTrend} />
        </div>
        <div className="lg:col-span-2">
          <SpendingDonut data={spendingByCategory} />
        </div>
      </div>
      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}
