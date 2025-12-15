import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const data = [
  { name: "موردين محليين", value: 245000, color: "hsl(var(--chart-1))" },
  { name: "موردين خارجيين", value: 180000, color: "hsl(var(--chart-2))" },
  { name: "موردين خدمات", value: 95000, color: "hsl(var(--chart-3))" },
  { name: "موردين مواد", value: 130000, color: "hsl(var(--chart-4))" },
];

export function SupplierLiabilitiesChart() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">التزامات الموردين</h3>
        <span className="text-xs text-muted-foreground">حسب التصنيف</span>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
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
              formatter={(value: number) => [`${value.toLocaleString()} ر.س`, "المبلغ"]}
            />
            <Legend
              layout="vertical"
              align="left"
              verticalAlign="middle"
              wrapperStyle={{ direction: "rtl", paddingLeft: "20px" }}
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 pt-4 border-t border-border/50">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">إجمالي الالتزامات</span>
          <span className="text-lg font-bold text-foreground">
            {data.reduce((sum, item) => sum + item.value, 0).toLocaleString()} ر.س
          </span>
        </div>
      </div>
    </div>
  );
}
