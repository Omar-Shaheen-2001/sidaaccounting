import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  ComposedChart,
} from "recharts";
import { Scale } from "lucide-react";

const data = [
  { units: 0, revenue: 0, totalCost: 50000 },
  { units: 100, revenue: 30000, totalCost: 60000 },
  { units: 200, revenue: 60000, totalCost: 70000 },
  { units: 300, revenue: 90000, totalCost: 80000 },
  { units: 400, revenue: 120000, totalCost: 90000 },
  { units: 500, revenue: 150000, totalCost: 100000 },
  { units: 600, revenue: 180000, totalCost: 110000 },
];

const breakEvenPoint = 333;
const breakEvenRevenue = 100000;

export function BreakEvenChart() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-400">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <Scale className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">نقطة التعادل</h3>
            <p className="text-xs text-muted-foreground">تحليل الربحية</p>
          </div>
        </div>
      </div>

      {/* Break-even indicators */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground">التكاليف الثابتة</p>
          <p className="text-lg font-bold text-foreground">50,000 ر.س</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-primary/10 border border-primary/30">
          <p className="text-xs text-muted-foreground">نقطة التعادل</p>
          <p className="text-lg font-bold text-primary">{breakEvenPoint} وحدة</p>
        </div>
        <div className="text-center p-3 rounded-lg bg-secondary/50">
          <p className="text-xs text-muted-foreground">إيرادات التعادل</p>
          <p className="text-lg font-bold text-foreground">{breakEvenRevenue.toLocaleString()} ر.س</p>
        </div>
      </div>

      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="units"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              label={{ value: "الوحدات", position: "bottom", fontSize: 11 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                direction: "rtl",
              }}
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} ر.س`,
                name === "revenue" ? "الإيرادات" : "التكاليف الكلية",
              ]}
            />
            <ReferenceLine
              x={breakEvenPoint}
              stroke="hsl(var(--warning))"
              strokeDasharray="5 5"
              label={{
                value: "نقطة التعادل",
                position: "top",
                fill: "hsl(var(--warning))",
                fontSize: 11,
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-2))", strokeWidth: 2 }}
              name="revenue"
            />
            <Line
              type="monotone"
              dataKey="totalCost"
              stroke="hsl(var(--chart-5))"
              strokeWidth={2}
              dot={{ fill: "hsl(var(--chart-5))", strokeWidth: 2 }}
              name="totalCost"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
