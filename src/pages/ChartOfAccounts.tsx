import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  FileDown, 
  Printer, 
  Search, 
  FolderOpen, 
  Plus,
  MoreHorizontal,
  ChevronDown,
  Filter,
  RotateCcw
} from "lucide-react";

// Sample account data
const accountsData = [
  {
    id: 1,
    code: "#1",
    name: "الأصول",
    balance: 2257512.75,
    type: "مدين",
    category: "assets",
    color: "#1e3a5f",
  },
  {
    id: 2,
    code: "#2",
    name: "الخصوم",
    balance: 2143676.07,
    type: "دائن",
    category: "liabilities",
    color: "#1e3a5f",
  },
  {
    id: 3,
    code: "#3",
    name: "المصروفات",
    balance: 15882.83,
    type: "مدين",
    category: "expenses",
    color: "#1e3a5f",
  },
  {
    id: 4,
    code: "#4",
    name: "الدخل",
    balance: 129719.54,
    type: "دائن",
    category: "income",
    color: "#1e3a5f",
  },
];

const categoryLabels = {
  assets: "الأصول",
  liabilities: "الخصوم",
  expenses: "المصروفات",
  income: "الدخل",
};

const ChartOfAccounts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("main");
  const [accountLevel, setAccountLevel] = useState("all");
  const [accountType, setAccountType] = useState("all");
  const [excludeAccounts, setExcludeAccounts] = useState("none");
  const [sortBy, setSortBy] = useState("code-asc");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredAccounts = accountsData.filter((account) => {
    if (selectedCategory && account.category !== selectedCategory) return false;
    if (searchTerm && !account.name.includes(searchTerm)) return false;
    if (accountType === "debit" && account.type !== "مدين") return false;
    if (accountType === "credit" && account.type !== "دائن") return false;
    return true;
  });

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (sortBy === "code-asc") return a.id - b.id;
    if (sortBy === "code-desc") return b.id - a.id;
    return 0;
  });

  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const resetFilters = () => {
    setAccountLevel("all");
    setAccountType("all");
    setExcludeAccounts("none");
    setSortBy("code-asc");
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col mr-56 transition-all duration-300">
        <TopBar
          companyName="شركة الأمل للتجارة"
          userName="محمد أحمد"
          userRole="مدير النظام"
          accountingPeriod="2024/01/01 - 2024/12/31"
          notificationCount={3}
        />
        
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-foreground">دليل الحسابات</h1>
            
            {/* Action Bar */}
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2">
                <FileDown className="h-4 w-4" />
                <span className="hidden sm:inline">تصدير</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Printer className="h-4 w-4" />
                <span className="hidden sm:inline">طباعة</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">فلترة</span>
              </Button>
            </div>
          </div>

          {/* Filters Section */}
          {showFilters && (
            <div className="bg-card border border-border rounded-lg p-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">مستوى الحساب</label>
                  <Select value={accountLevel} onValueChange={setAccountLevel}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="اختر المستوى" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="main">الحسابات الرئيسية</SelectItem>
                      <SelectItem value="sub">الحسابات الفرعية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">نوع الحساب</label>
                  <Select value={accountType} onValueChange={setAccountType}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="اختر النوع" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="debit">مدين</SelectItem>
                      <SelectItem value="credit">دائن</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">استثناء الحسابات</label>
                  <Select value={excludeAccounts} onValueChange={setExcludeAccounts}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="اختر" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="none">لا شيء</SelectItem>
                      <SelectItem value="customers">حسابات العملاء</SelectItem>
                      <SelectItem value="suppliers">حسابات الموردين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">ترتيب حسب</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="اختر الترتيب" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="code-asc">رمز الحساب - تصاعدي</SelectItem>
                      <SelectItem value="code-desc">رمز الحساب - تنازلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button size="sm" className="gap-2">
                  عرض التقرير
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={resetFilters}>
                  <RotateCcw className="h-4 w-4" />
                  إعادة تعيين
                </Button>
              </div>
            </div>
          )}

          {/* Main Content - Responsive Layout */}
          <div className="flex flex-col-reverse lg:flex-row-reverse gap-4 md:gap-6">
            {/* Right Sidebar - Category Filter */}
            <div className="w-full lg:w-64 xl:w-72 bg-card border border-border rounded-lg p-4 h-fit flex-shrink-0">
              <div className="relative mb-4">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ابحث"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-background"
                />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                {Object.entries(categoryLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                    className={`w-full flex items-center gap-2 p-2 rounded-md text-right transition-colors ${
                      selectedCategory === key 
                        ? "bg-primary/10 text-primary" 
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="w-4 h-4 rounded bg-[#1e3a5f] flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Accounts List */}
            <div className="flex-1 min-w-0 bg-card border border-border rounded-lg overflow-hidden">
              {/* Branch Selector Row */}
              <div className="flex items-center justify-between p-3 md:p-4 border-b border-border bg-muted/30">
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2">
                  <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline">فرع القيود</span>
                  <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                    <SelectTrigger className="w-[140px] md:w-[180px] bg-background text-sm">
                      <SelectValue placeholder="اختر الفرع" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border z-50">
                      <SelectItem value="main">Main Branch</SelectItem>
                      <SelectItem value="branch1">الفرع الأول</SelectItem>
                      <SelectItem value="branch2">الفرع الثاني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Accounts Table */}
              <div className="divide-y divide-border">
                {sortedAccounts.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    لا توجد بيانات متاحة
                  </div>
                ) : (
                  sortedAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center justify-between p-3 md:p-4 hover:bg-muted/50 transition-colors cursor-pointer gap-2"
                    >
                      {/* Left side - menu and balance */}
                      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="bg-popover border border-border z-50">
                            <DropdownMenuItem>عرض التفاصيل</DropdownMenuItem>
                            <DropdownMenuItem>تعديل</DropdownMenuItem>
                            <DropdownMenuItem>عرض الحركات</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        
                        <div className="text-left">
                          <div className="font-semibold text-foreground text-sm md:text-base">
                            {formatNumber(account.balance)}
                          </div>
                          <div className="text-xs md:text-sm text-muted-foreground">
                            {account.type}
                          </div>
                        </div>
                      </div>

                      {/* Right side - icon and name */}
                      <div className="flex items-center gap-2 md:gap-3 min-w-0">
                        <div className="text-right min-w-0">
                          <div className="font-medium text-foreground text-sm md:text-base truncate">{account.name}</div>
                          <div className="text-xs md:text-sm text-muted-foreground">{account.code}</div>
                        </div>
                        <div 
                          className="w-8 h-8 md:w-10 md:h-10 rounded flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: account.color }}
                        >
                          <FolderOpen className="h-4 w-4 md:h-5 md:w-5 text-white" />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Account Button */}
              <div className="p-3 md:p-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center gap-2 text-primary hover:text-primary"
                  onClick={() => navigate("/chart-of-accounts/add")}
                >
                  <Plus className="h-4 w-4" />
                  أضف حساب
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
