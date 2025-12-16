import { Wallet, Building2, Users, TrendingUp } from "lucide-react";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { CashBankChart } from "@/components/dashboard/CashBankChart";
import { SupplierLiabilitiesChart } from "@/components/dashboard/SupplierLiabilitiesChart";
import { BreakEvenChart } from "@/components/dashboard/BreakEvenChart";
import { CustomerBalancesChart } from "@/components/dashboard/CustomerBalancesChart";
import { PartnersShareChart } from "@/components/dashboard/PartnersShareChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar
        companyName="شركة الأمل للتجارة"
        userName="محمد أحمد"
        userRole="مدير النظام"
        accountingPeriod="2024/01/01 - 2024/12/31"
        notificationCount={3}
      />
      
      <Sidebar />
      
      <main className="mr-56 p-6 transition-all duration-300">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold">لوحة التحكم</h2>
          <p className="text-muted-foreground mt-1">نظرة عامة على الوضع المالي للشركة</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="إجمالي النقد"
            value="67,000 ر.س"
            subtitle="الصناديق النقدية"
            icon={Wallet}
            trend={{ value: 12, isPositive: true }}
            variant="default"
            animationDelay="animation-delay-100"
          />
          <StatCard
            title="إجمالي البنوك"
            value="148,000 ر.س"
            subtitle="الحسابات البنكية"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
            variant="success"
            animationDelay="animation-delay-200"
          />
          <StatCard
            title="مستحقات العملاء"
            value="1,001,000 ر.س"
            subtitle="إجمالي الذمم المدينة"
            icon={Users}
            trend={{ value: 5, isPositive: false }}
            variant="warning"
            animationDelay="animation-delay-300"
          />
          <StatCard
            title="التزامات الموردين"
            value="650,000 ر.س"
            subtitle="إجمالي الذمم الدائنة"
            icon={Building2}
            trend={{ value: 3, isPositive: false }}
            variant="destructive"
            animationDelay="animation-delay-400"
          />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CashBankChart />
          <SupplierLiabilitiesChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <BreakEvenChart />
          </div>
          <QuickActions />
        </div>

        {/* Charts Row 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CustomerBalancesChart />
          <PartnersShareChart />
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 gap-6">
          <RecentTransactions />
        </div>
      </main>
    </div>
  );
};

export default Index;
