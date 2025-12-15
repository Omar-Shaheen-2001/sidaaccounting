import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { PieChart as PieIcon, TrendingUp } from "lucide-react";

const partnersData = [
  { name: "أحمد محمد", share: 40, profit: 120000, color: "hsl(var(--chart-1))" },
  { name: "سعيد علي", share: 35, profit: 105000, color: "hsl(var(--chart-2))" },
  { name: "خالد عبدالله", share: 25, profit: 75000, color: "hsl(var(--chart-3))" },
];

const totalProfit = partnersData.reduce((sum, p) => sum + p.profit, 0);

export function PartnersShareChart() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-500">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <PieIcon className="h-5 w-5 text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">حصص الشركاء</h3>
            <p className="text-xs text-muted-foreground">من صافي الربح - الفترات المغلقة</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-success">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">ربح</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Chart */}
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={partnersData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="share"
              >
                {partnersData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  direction: "rtl",
                }}
                formatter={(value: number) => [`${value}%`, "النسبة"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Partners List */}
        <div className="space-y-3">
          {partnersData.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: partner.color }}
                />
                <div>
                  <p className="text-sm font-medium">{partner.name}</p>
                  <p className="text-xs text-muted-foreground">{partner.share}%</p>
                </div>
              </div>
              <p className="text-sm font-bold text-success">
                {partner.profit.toLocaleString()} ر.س
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">إجمالي صافي الربح</span>
          <span className="text-xl font-bold text-success">
            {totalProfit.toLocaleString()} ر.س
          </span>
        </div>
      </div>
    </div>
  );
}
