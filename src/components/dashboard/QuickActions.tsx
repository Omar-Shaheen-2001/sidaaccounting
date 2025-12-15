import { Plus, FileText, Receipt, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  { label: "قيد جديد", icon: Plus, variant: "default" as const },
  { label: "تقرير سريع", icon: FileText, variant: "secondary" as const },
  { label: "فاتورة جديدة", icon: Receipt, variant: "secondary" as const },
  { label: "تحديث البيانات", icon: RefreshCw, variant: "outline" as const },
];

export function QuickActions() {
  return (
    <div className="dashboard-card animate-slide-up opacity-0 animation-delay-100">
      <h3 className="text-lg font-semibold mb-4">إجراءات سريعة</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            className="h-auto py-4 flex flex-col items-center gap-2"
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
