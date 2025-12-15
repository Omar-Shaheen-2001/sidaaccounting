import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Wallet,
  Users,
  TrendingUp,
  FileText,
  Settings,
  ChevronRight,
  Building2,
  PieChart,
  Receipt,
  Scale,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "لوحة التحكم",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "النقد والبنوك",
    icon: Wallet,
    path: "/cash-bank",
  },
  {
    title: "الموردين",
    icon: Building2,
    path: "/suppliers",
  },
  {
    title: "العملاء",
    icon: Users,
    path: "/customers",
  },
  {
    title: "نقطة التعادل",
    icon: Scale,
    path: "/break-even",
  },
  {
    title: "حصص الشركاء",
    icon: PieChart,
    path: "/partners",
  },
  {
    title: "التقارير",
    icon: FileText,
    path: "/reports",
  },
  {
    title: "القيود",
    icon: Receipt,
    path: "/entries",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-screen bg-sidebar border-l border-sidebar-border transition-all duration-300 z-40 pt-[73px]",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -left-3 top-20 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ChevronRight
            className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")}
          />
        </button>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
                collapsed && "justify-center px-2"
              )}
              activeClassName="bg-sidebar-accent text-sidebar-primary"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Settings */}
        <div className="p-3 border-t border-sidebar-border">
          <NavLink
            to="/settings"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
              collapsed && "justify-center px-2"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-primary"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">الإعدادات</span>}
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
