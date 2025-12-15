import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users } from "lucide-react";

const data = [
  { name: "عملاء تجزئة", value: 185000 },
  { name: "عملاء جملة", value: 320000 },
  { name: "مؤسسات حكومية", value: 95000 },
  { name: "شركات خاصة", value: 245000 },
  { name: "عملاء VIP", value: 156000 },
];

export function CustomerBalancesChart() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">أرصدة العملاء</h3>
            <p className="text-xs text-muted-foreground">المستحقات حسب التصنيف</p>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              type="number"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <YAxis
              dataKey="name"
              type="category"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              width={90}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                direction: "rtl",
              }}
              formatter={(value: number) => [`${value.toLocaleString()} ر.س`, "الرصيد"]}
            />
            <Bar
              dataKey="value"
              fill="hsl(var(--chart-1))"
              radius={[0, 6, 6, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">إجمالي المستحقات</span>
          <span className="text-lg font-bold text-primary">
            {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()} ر.س
          </span>
        </div>
      </div>
    </div>
  );
}
