import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Printer,
  ExternalLink,
  Plus,
  Settings,
  Upload,
  SlidersHorizontal,
  ArrowUpDown,
  CalendarIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { cn } from "@/lib/utils";

const PaymentVoucher = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedVouchers, setSelectedVouchers] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"7days" | "30days" | "365days">("7days");
  const [dateFilterType, setDateFilterType] = useState("custom");
  const [createdDateFilterType, setCreatedDateFilterType] = useState("custom");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [createdDateFrom, setCreatedDateFrom] = useState<Date>();
  const [createdDateTo, setCreatedDateTo] = useState<Date>();
  const [sortBy, setSortBy] = useState("voucherDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const totalItems = 150;

  // Mock data for payment vouchers
  const vouchers = [
    {
      id: 1,
      voucherNumber: "000010",
      date: "29/12/2025",
      description: "fdbvbvf",
      cashBankAccount: "Main Treasury",
      accounts: ["حساب المصروفات"],
      source: "manual",
      createdBy: "أحمد محمد",
      amount: 100.00,
      status: "posted"
    },
    {
      id: 2,
      voucherNumber: "000009",
      date: "28/12/2025",
      description: "دفعة للمورد",
      cashBankAccount: "البنك الأهلي",
      accounts: ["حساب الموردين"],
      source: "manual",
      createdBy: "محمد علي",
      amount: 5000.00,
      status: "draft"
    },
    {
      id: 3,
      voucherNumber: "000008",
      date: "27/12/2025",
      description: "مصروفات إدارية",
      cashBankAccount: "Main Treasury",
      accounts: ["المصروفات الإدارية"],
      source: "journal_entry",
      createdBy: "سارة أحمد",
      amount: 750.00,
      status: "posted"
    },
    {
      id: 4,
      voucherNumber: "000007",
      date: "26/12/2025",
      description: "سداد قرض",
      cashBankAccount: "البنك الأهلي",
      accounts: ["حساب القروض"],
      source: "asset_management",
      createdBy: "أحمد محمد",
      amount: 15000.00,
      status: "posted"
    },
    {
      id: 5,
      voucherNumber: "000006",
      date: "25/12/2025",
      description: "مشتريات معدات",
      cashBankAccount: "Main Treasury",
      accounts: ["حساب الأصول"],
      source: "manual",
      createdBy: "محمد علي",
      amount: 8500.00,
      status: "draft"
    },
  ];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedVouchers(vouchers.map((v) => v.id));
    } else {
      setSelectedVouchers([]);
    }
  };

  const handleSelectVoucher = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedVouchers([...selectedVouchers, id]);
    } else {
      setSelectedVouchers(selectedVouchers.filter((vId) => vId !== id));
    }
  };

  const getSourceLabel = (source: string) => {
    const sourceLabels: Record<string, string> = {
      manual: "يدوي",
      journal_entry: "قيد يومية",
      receipt: "سند قبض",
      instant_treasury: "فحص خزنة فوري",
      asset_management: "إدارة الأصول",
      projects: "مشاريع تحت التنفيذ",
      lease_management: "إدارة الإيجارات",
      prepaid_expenses: "مصروفات مدفوعة مقدماً",
    };
    return sourceLabels[source] || source;
  };

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <TopBar
        companyName="شركة النخبة للتجارة"
        userName="أحمد محمد"
        userRole="مدير النظام"
        accountingPeriod="2025"
        notificationCount={3}
      />
      
      <Sidebar />
      
      <main className="mr-56 p-6 transition-all duration-300">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 ml-2" />
                سند صرف
              </Button>
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">استيراد</span>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Pagination Top */}
            <div className="flex items-center gap-4">
              <Select value={itemsPerPage.toString()} onValueChange={(v) => setItemsPerPage(parseInt(v))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-muted-foreground">
                {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} من {totalItems}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= totalItems}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Access Status Tabs */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card 
              className={`cursor-pointer transition-all ${activeTab === "7days" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveTab("7days")}
            >
              <CardContent className="p-6 text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
                <p className="text-sm mb-2">آخر 7 أيام</p>
                <p className="text-2xl font-bold">100.00 ₴</p>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer transition-all ${activeTab === "30days" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveTab("30days")}
            >
              <CardContent className="p-6 text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
                <p className="text-sm mb-2">آخر 30 يوم</p>
                <p className="text-2xl font-bold">100.00 ₴</p>
              </CardContent>
            </Card>
            <Card 
              className={`cursor-pointer transition-all ${activeTab === "365days" ? "ring-2 ring-primary" : ""}`}
              onClick={() => setActiveTab("365days")}
            >
              <CardContent className="p-6 text-center bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
                <p className="text-sm mb-2">آخر 365 يوم</p>
                <p className="text-2xl font-bold">100.00 ₴</p>
              </CardContent>
            </Card>
          </div>

          {/* Search & Filter Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">بحث</h3>
              </div>

              {/* Basic Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Voucher Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الكود</label>
                  <Input type="text" placeholder="رقم السند" className="bg-background" />
                </div>

                {/* Date Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">التاريخ</label>
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-right font-normal flex-1",
                            !dateTo && "text-muted-foreground"
                          )}
                          disabled={dateFilterType !== "custom"}
                        >
                          <CalendarIcon className="ml-2 h-4 w-4" />
                          {dateTo ? format(dateTo, "dd/MM/yyyy", { locale: ar }) : "إلى"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <span className="text-muted-foreground">-</span>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-right font-normal flex-1",
                            !dateFrom && "text-muted-foreground"
                          )}
                          disabled={dateFilterType !== "custom"}
                        >
                          <CalendarIcon className="ml-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, "dd/MM/yyyy", { locale: ar }) : "من"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <Select value={dateFilterType} onValueChange={setDateFilterType}>
                      <SelectTrigger className="w-24 bg-background">
                        <SelectValue placeholder="تخصيص" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">تخصيص</SelectItem>
                        <SelectItem value="lastMonth">آخر شهر</SelectItem>
                        <SelectItem value="lastYear">آخر سنة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">التصنيف</label>
                  <Select defaultValue="any">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="أي تصنيف" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">أي تصنيف</SelectItem>
                      <SelectItem value="expenses">مصروفات</SelectItem>
                      <SelectItem value="payments">مدفوعات</SelectItem>
                      <SelectItem value="transfers">تحويلات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Cash/Bank Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">نقدي / بنكي</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="الكل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="cash">نقدي</SelectItem>
                      <SelectItem value="bank">بنكي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row - Status & Source */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الحالة</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="الكل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="posted">مرحّل</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Source Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">المصدر</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="الكل" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="manual">يدوي</SelectItem>
                      <SelectItem value="journal_entry">قيد يومية</SelectItem>
                      <SelectItem value="receipt">سند قبض</SelectItem>
                      <SelectItem value="instant_treasury">فحص خزنة فوري</SelectItem>
                      <SelectItem value="asset_management">إدارة الأصول</SelectItem>
                      <SelectItem value="projects">مشاريع تحت التنفيذ</SelectItem>
                      <SelectItem value="lease_management">إدارة الإيجارات</SelectItem>
                      <SelectItem value="prepaid_expenses">مصروفات مدفوعة مقدماً</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2"></div>
              </div>

              {/* Advanced Search Toggle */}
              <div className="flex items-center justify-end mb-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="text-primary"
                >
                  <SlidersHorizontal className="h-4 w-4 ml-2" />
                  بحث متقدم
                </Button>
              </div>

              {/* Advanced Filters */}
              {showAdvancedSearch && (
                <div className="border-t pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">الوصف</label>
                      <Input type="text" placeholder="البحث في الوصف" className="bg-background" />
                    </div>

                    {/* Amount Greater Than */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">المبلغ أكبر من</label>
                      <Input type="number" placeholder="0.00" className="bg-background" min="0" />
                    </div>

                    {/* Amount Less Than */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">المبلغ أقل من</label>
                      <Input type="number" placeholder="0.00" className="bg-background" min="0" />
                    </div>

                    {/* Created By */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">أنشئ بواسطة</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="bg-background">
                          <SelectValue placeholder="الكل" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">الكل</SelectItem>
                          <SelectItem value="ahmed">أحمد محمد</SelectItem>
                          <SelectItem value="mohamed">محمد علي</SelectItem>
                          <SelectItem value="sara">سارة أحمد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Creation Date */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">تاريخ الإنشاء</label>
                      <div className="flex items-center gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-right font-normal flex-1",
                                !createdDateTo && "text-muted-foreground"
                              )}
                              disabled={createdDateFilterType !== "custom"}
                            >
                              <CalendarIcon className="ml-2 h-4 w-4" />
                              {createdDateTo ? format(createdDateTo, "dd/MM/yyyy", { locale: ar }) : "إلى"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={createdDateTo}
                              onSelect={setCreatedDateTo}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <span className="text-muted-foreground">-</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-right font-normal flex-1",
                                !createdDateFrom && "text-muted-foreground"
                              )}
                              disabled={createdDateFilterType !== "custom"}
                            >
                              <CalendarIcon className="ml-2 h-4 w-4" />
                              {createdDateFrom ? format(createdDateFrom, "dd/MM/yyyy", { locale: ar }) : "من"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={createdDateFrom}
                              onSelect={setCreatedDateFrom}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <Select value={createdDateFilterType} onValueChange={setCreatedDateFilterType}>
                          <SelectTrigger className="w-24 bg-background">
                            <SelectValue placeholder="تخصيص" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">تخصيص</SelectItem>
                            <SelectItem value="lastMonth">آخر شهر</SelectItem>
                            <SelectItem value="lastYear">آخر سنة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
                <Button variant="outline" className="min-w-24">إلغاء الفلتر</Button>
                <Button className="bg-primary hover:bg-primary/90 min-w-24">بحث</Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardContent className="p-6">
              {/* Results Header with Sort */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">النتائج</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">الترتيب حسب</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="h-4 w-4 ml-2" />
                        {sortBy === "voucherDate" ? "تاريخ السند" : sortBy === "creationDate" ? "تاريخ الإنشاء" : "رقم السند"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => toggleSort("voucherDate")}>
                        تاريخ السند
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleSort("creationDate")}>
                        تاريخ الإنشاء
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleSort("voucherNumber")}>
                        رقم السند
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Vouchers List */}
              <div className="space-y-2">
                {/* Select All */}
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <Checkbox
                    checked={selectedVouchers.length === vouchers.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm text-muted-foreground">تحديد الكل</span>
                </div>

                {/* Voucher Items */}
                {vouchers.map((voucher) => (
                  <div
                    key={voucher.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors ${
                      voucher.status === "draft" ? "border-r-4 border-r-yellow-500" : ""
                    }`}
                  >
                    {/* Right Side - Checkbox, Voucher Number, Date, Description */}
                    <div className="flex items-center gap-4">
                      <Checkbox
                        checked={selectedVouchers.includes(voucher.id)}
                        onCheckedChange={(checked) => handleSelectVoucher(voucher.id, checked as boolean)}
                      />
                      
                      <div className="text-right">
                        <p className="font-medium">{voucher.voucherNumber} - {voucher.date}</p>
                        <p className="text-sm text-muted-foreground">{voucher.description}</p>
                      </div>
                    </div>

                    {/* Left Side - Price and 3 dots */}
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">{voucher.amount.toFixed(2)} ₴</span>
                          {voucher.status === "draft" && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">مسودة</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>🏦 {voucher.cashBankAccount}</span>
                          <span>•</span>
                          <span className="truncate max-w-40">{voucher.accounts.join(", ")}</span>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {getSourceLabel(voucher.source)} • أنشئ بواسطة: {voucher.createdBy}
                        </span>
                      </div>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="shrink-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 ml-2" />
                            عرض
                          </DropdownMenuItem>
                          {voucher.source === "manual" && (
                            <>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 ml-2" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </>
                          )}
                          {voucher.source !== "manual" && (
                            <DropdownMenuItem>
                              <ExternalLink className="h-4 w-4 ml-2" />
                              الانتقال للمصدر
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 ml-2" />
                            نسخ
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Printer className="h-4 w-4 ml-2" />
                            طباعة
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Pagination */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronRight className="h-4 w-4 ml-1" />
                  السابق
                </Button>
                <span className="text-sm text-muted-foreground">
                  صفحة {currentPage} من {Math.ceil(totalItems / itemsPerPage)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage * itemsPerPage >= totalItems}
                >
                  التالي
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
    </div>
  );
};

export default PaymentVoucher;
