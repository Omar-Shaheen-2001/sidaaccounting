import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  FileText,
  Receipt,
  CreditCard,
  Wallet,
  Building2,
  Search,
  Package,
  FileCheck,
  ArrowRightLeft,
  Home,
  CalendarDays,
  ChevronRight,
  ChevronDown,
  BookOpen,
  TrendingUp,
  Scale,
  Banknote,
  ClipboardList,
  FileSpreadsheet,
  PieChart,
  Calculator,
  ListTree,
  Settings,
  Users,
  Shield,
  Building,
  MapPin,
  Coins,
  Target,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface MenuSection {
  title: string;
  icon: React.ElementType;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "الحركات المحاسبية",
    icon: Receipt,
    items: [
      { title: "قيود اليومية", icon: FileText, path: "/journal-entries" },
      { title: "سند صرف", icon: CreditCard, path: "/payment-voucher" },
      { title: "سند استلام", icon: Wallet, path: "/receipt-voucher" },
      { title: "مشروعات تحت التنفيذ", icon: Building2, path: "/projects-in-progress" },
      { title: "فحص فوري للخزينة", icon: Search, path: "/cash-inspection" },
      { title: "إدارة الأصول", icon: Package, path: "/asset-management" },
      { title: "فحص ضريبة القيمة", icon: FileCheck, path: "/vat-inspection" },
      { title: "نقل عهدة عينية", icon: ArrowRightLeft, path: "/custody-transfer" },
      { title: "إدارة عقود الإيجار", icon: Home, path: "/lease-contracts" },
      { title: "مصروفات مدفوعة مقدمًا", icon: Banknote, path: "/prepaid-expenses" },
      { title: "إدارة الفترات المحاسبية", icon: CalendarDays, path: "/accounting-periods-management" },
    ],
  },
  {
    title: "التقارير",
    icon: FileSpreadsheet,
    items: [
      { title: "حساب الأستاذ", icon: BookOpen, path: "/ledger" },
      { title: "قائمة الدخل", icon: TrendingUp, path: "/income-statement" },
      { title: "قائمة المركز المالي", icon: Scale, path: "/balance-sheet" },
      { title: "قائمة التدفقات النقدية", icon: Banknote, path: "/cash-flow" },
      { title: "ميزان مراجعة أرصدة", icon: ClipboardList, path: "/trial-balance" },
      { title: "ميزان مراجعة حركات وأرصدة", icon: ClipboardList, path: "/trial-balance-detailed" },
      { title: "قائمة التغير في حقوق الملكية", icon: PieChart, path: "/equity-changes" },
      { title: "الإقرار الضريبي", icon: Calculator, path: "/tax-return" },
      { title: "دليل الحسابات العامة", icon: ListTree, path: "/chart-of-accounts" },
      { title: "الأصول الثابتة", icon: Package, path: "/fixed-assets" },
      { title: "المشروعات تحت التنفيذ", icon: Building2, path: "/projects-report" },
      { title: "العهد العينية", icon: ArrowRightLeft, path: "/custody-report" },
      { title: "عقود الإيجار", icon: Home, path: "/lease-report" },
      { title: "مصروفات مدفوعة مقدمًا", icon: Banknote, path: "/prepaid-report" },
    ],
  },
  {
    title: "إعدادات المحاسبة",
    icon: Calculator,
    items: [
      { title: "الفترات المحاسبية", icon: CalendarDays, path: "/accounting-periods" },
      { title: "أماكن الأصول", icon: MapPin, path: "/asset-locations" },
      { title: "دليل الحسابات", icon: ListTree, path: "/accounts-guide" },
      { title: "الضرائب والزكاة", icon: Coins, path: "/taxes-zakat" },
      { title: "مراكز التكلفة", icon: Target, path: "/cost-centers" },
      { title: "الأرصدة الافتتاحية", icon: DollarSign, path: "/opening-balances" },
      { title: "الفئات النقدية والعملات", icon: Banknote, path: "/currencies" },
    ],
  },
  {
    title: "الإعدادات",
    icon: Settings,
    items: [
      { title: "الأدوار", icon: Shield, path: "/roles" },
      { title: "المستخدمين", icon: Users, path: "/users" },
      { title: "إعدادات الشركة", icon: Building, path: "/company-settings" },
    ],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(["الحركات المحاسبية"]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside
      className={cn(
        "fixed right-0 top-0 h-screen bg-sidebar border-l border-sidebar-border transition-all duration-300 z-40 pt-[73px]",
        collapsed ? "w-16" : "w-56"
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

        {/* Dashboard Link */}
        <div className="p-3 border-b border-sidebar-border">
          <NavLink
            to="/"
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200",
              collapsed && "justify-center px-2"
            )}
            activeClassName="bg-sidebar-accent text-sidebar-primary"
          >
            <LayoutDashboard className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">لوحة التحكم</span>}
          </NavLink>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 p-3 space-y-2 overflow-y-auto scrollbar-thin">
          {menuSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {/* Section Header */}
              <button
                onClick={() => !collapsed && toggleSection(section.title)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all duration-200",
                  collapsed && "justify-center px-2"
                )}
              >
                <section.icon className="h-5 w-5 flex-shrink-0 text-primary" />
                {!collapsed && (
                  <>
                    <span className="text-sm font-semibold flex-1 text-right">{section.title}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        expandedSections.includes(section.title) && "rotate-180"
                      )}
                    />
                  </>
                )}
              </button>

              {/* Section Items */}
              {!collapsed && expandedSections.includes(section.title) && (
                <div className="mr-4 pr-2 border-r border-sidebar-border space-y-0.5">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200 text-sm"
                      activeClassName="bg-sidebar-accent text-sidebar-primary"
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span>{item.title}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
