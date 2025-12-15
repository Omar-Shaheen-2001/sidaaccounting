import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "يناير", cash: 45000, bank: 120000 },
  { name: "فبراير", cash: 52000, bank: 135000 },
  { name: "مارس", cash: 48000, bank: 142000 },
  { name: "أبريل", cash: 61000, bank: 128000 },
  { name: "مايو", cash: 55000, bank: 156000 },
  { name: "يونيو", cash: 67000, bank: 148000 },
];

export function CashBankChart() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">أرصدة النقد والبنوك</h3>
        <span className="text-xs text-muted-foreground">آخر 6 أشهر</span>
      </div>
      <div className="h-[300px]">
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
              fontSize={12}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                direction: "rtl",
              }}
              formatter={(value: number) => [`${value.toLocaleString()} ر.س`, ""]}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend
              wrapperStyle={{ direction: "rtl" }}
              formatter={(value) => (value === "cash" ? "نقدي" : "بنكي")}
            />
            <Bar
              dataKey="cash"
              fill="hsl(var(--chart-1))"
              radius={[0, 4, 4, 0]}
              name="cash"
            />
            <Bar
              dataKey="bank"
              fill="hsl(var(--chart-2))"
              radius={[0, 4, 4, 0]}
              name="bank"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
