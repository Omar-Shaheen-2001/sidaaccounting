import { ArrowDownLeft, ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    description: "تحصيل فاتورة #1234",
    amount: 15000,
    type: "credit",
    date: "2024-01-15",
    account: "بنك الراجحي",
  },
  {
    id: 2,
    description: "دفع مستحقات مورد",
    amount: -8500,
    type: "debit",
    date: "2024-01-14",
    account: "صندوق النقدية",
  },
  {
    id: 3,
    description: "إيرادات مبيعات",
    amount: 23000,
    type: "credit",
    date: "2024-01-14",
    account: "بنك الأهلي",
  },
  {
    id: 4,
    description: "مصاريف تشغيلية",
    amount: -4200,
    type: "debit",
    date: "2024-01-13",
    account: "صندوق النقدية",
  },
  {
    id: 5,
    description: "تحصيل عميل VIP",
    amount: 45000,
    type: "credit",
    date: "2024-01-13",
    account: "بنك الراجحي",
  },
];

export function RecentTransactions() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-400">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">آخر الحركات</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          عرض الكل
        </Button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "p-2 rounded-lg",
                  tx.type === "credit" ? "bg-success/10" : "bg-destructive/10"
                )}
              >
                {tx.type === "credit" ? (
                  <ArrowDownLeft className="h-4 w-4 text-success" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-destructive" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.account}</p>
              </div>
            </div>
            <div className="text-left">
              <p
                className={cn(
                  "text-sm font-bold font-mono",
                  tx.type === "credit" ? "text-success" : "text-destructive"
                )}
              >
                {tx.type === "credit" ? "+" : ""}{tx.amount.toLocaleString()} ر.س
              </p>
              <p className="text-xs text-muted-foreground">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
