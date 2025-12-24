import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Plus, 
  FileText, 
  Upload, 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal,
  ArrowLeft,
  SlidersHorizontal,
  Building2,
  User,
  Pencil,
  Trash2,
  Eye
} from "lucide-react";

// Mock data for journal entries
const mockEntries = [
  {
    id: 48965,
    date: "01/11/2025",
    description: "سلف مؤسسة شاهي شاغ سداد رواتب عمال شهر اكتوبر 10 / 2025",
    fromAccount: "مدينون - مؤسسة شاهي شاغ",
    toAccount: "الخزينة الرئيسية",
    transferDate: "1-12-2024",
    amount: 1083,
    postedBy: "dhomnah",
    branch: "Main Branch (المالك)",
  },
  {
    id: 48964,
    date: "20/12/2025",
    description: "ايداع في الخزينة الرئيسية",
    fromAccount: "خزينة - فرع الدائري",
    toAccount: "الخزينة الرئيسية",
    transferDate: "1-12-2024",
    amount: 1351,
    postedBy: "dhomnah",
    branch: "Main Branch (المالك)",
  },
  {
    id: 48963,
    date: "19/12/2025",
    description: "صرف مستحقات موردين - شركة التوريدات",
    fromAccount: "الخزينة الرئيسية",
    toAccount: "دائنون - شركة التوريدات",
    transferDate: "19-12-2024",
    amount: 5200,
    postedBy: "admin",
    branch: "Main Branch (المالك)",
  },
  {
    id: 48962,
    date: "18/12/2025",
    description: "تحصيل فاتورة مبيعات رقم 1542",
    fromAccount: "العملاء - شركة الأمل",
    toAccount: "الخزينة الرئيسية",
    transferDate: "18-12-2024",
    amount: 8750,
    postedBy: "dhomnah",
    branch: "Main Branch (المالك)",
  },
  {
    id: 48961,
    date: "17/12/2025",
    description: "دفع إيجار المكتب - ديسمبر 2024",
    fromAccount: "الخزينة الرئيسية",
    toAccount: "مصروفات الإيجار",
    transferDate: "17-12-2024",
    amount: 15000,
    postedBy: "admin",
    branch: "Main Branch (المالك)",
  },
];

const JournalEntries = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
  const totalItems = 14067;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEntries(mockEntries.map(entry => entry.id));
    } else {
      setSelectedEntries([]);
    }
  };

  const handleSelectEntry = (entryId: number, checked: boolean) => {
    if (checked) {
      setSelectedEntries(prev => [...prev, entryId]);
    } else {
      setSelectedEntries(prev => prev.filter(id => id !== entryId));
    }
  };

  const isAllSelected = mockEntries.length > 0 && selectedEntries.length === mockEntries.length;

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        companyName="شركة الأمل للتجارة"
        userName="محمد أحمد"
        userRole="مدير النظام"
        accountingPeriod="2024/01/01 - 2024/12/31"
        notificationCount={3}
      />
      
      <Sidebar />
      
      <main className="mr-56 transition-all duration-300">
        {/* Top Action Bar */}
        <div className="bg-muted/30 border-b border-border px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              onClick={() => navigate("/journal-entries/add")}
            >
              <Plus className="h-4 w-4" />
              أضف قيد
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 bg-background"
              onClick={() => navigate("/journal-entries/edit-log")}
            >
              <FileText className="h-4 w-4" />
              سجل التعديلات
            </Button>
            <Button variant="outline" className="gap-2 bg-background">
              <Upload className="h-4 w-4" />
              استيراد
            </Button>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              1-{itemsPerPage} من {totalItems.toLocaleString()}
            </span>
            <Select defaultValue="20">
              <SelectTrigger className="w-16 h-8 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border border-border">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search/Filter Section */}
        <div className="p-6">
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Button 
                    variant={showAdvancedSearch ? "default" : "outline"} 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    بحث متقدم
                  </Button>
                </div>
                <h3 className="text-lg font-semibold">بحث</h3>
              </div>

              {/* Filter Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الحساب</label>
                  <Select defaultValue="any">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="أي حساب" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="any">أي حساب</SelectItem>
                      <SelectItem value="cash">الخزينة الرئيسية</SelectItem>
                      <SelectItem value="bank">البنك</SelectItem>
                      <SelectItem value="clients">العملاء</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الوصف</label>
                  <Input placeholder="" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">التاريخ</label>
                  <div className="flex items-center gap-2">
                    <Input type="text" placeholder="إلى" className="bg-background" />
                    <span className="text-muted-foreground">-</span>
                    <Input type="text" placeholder="من" className="bg-background" />
                    <Select defaultValue="custom">
                      <SelectTrigger className="w-24 bg-background">
                        <SelectValue placeholder="تخصيص" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border border-border">
                        <SelectItem value="custom">تخصيص</SelectItem>
                        <SelectItem value="today">اليوم</SelectItem>
                        <SelectItem value="week">هذا الأسبوع</SelectItem>
                        <SelectItem value="month">هذا الشهر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Filter Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">المصدر</label>
                  <Select defaultValue="any">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="أي" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="any">أي</SelectItem>
                      <SelectItem value="manual">يدوي</SelectItem>
                      <SelectItem value="sales">مبيعات</SelectItem>
                      <SelectItem value="purchases">مشتريات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">رقم</label>
                  <Input placeholder="" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">حالة القيد</label>
                  <Select defaultValue="all">
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="الكل" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="posted">مرحّل</SelectItem>
                      <SelectItem value="draft">مسودة</SelectItem>
                      <SelectItem value="cancelled">ملغي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advanced Search Filters */}
              {showAdvancedSearch && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-muted/30 rounded-lg border border-border">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-right block">المبلغ أكبر من</label>
                    <Input type="number" placeholder="" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-right block">المبلغ أقل من</label>
                    <Input type="number" placeholder="" className="bg-background" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-right block">تاريخ الإنشاء</label>
                    <div className="flex items-center gap-2">
                      <Input type="text" placeholder="إلى" className="bg-background" />
                      <span className="text-muted-foreground">-</span>
                      <Input type="text" placeholder="من" className="bg-background" />
                      <Select defaultValue="custom">
                        <SelectTrigger className="w-24 bg-background">
                          <SelectValue placeholder="تخصيص" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          <SelectItem value="custom">تخصيص</SelectItem>
                          <SelectItem value="today">اليوم</SelectItem>
                          <SelectItem value="week">هذا الأسبوع</SelectItem>
                          <SelectItem value="month">هذا الشهر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 justify-start">
                <Button variant="outline" className="bg-background">إلغاء الفلتر</Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">بحث</Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">الترتيب حسب</span>
                <Select defaultValue="date">
                  <SelectTrigger className="w-32 h-8 bg-background">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border">
                    <SelectItem value="date">التاريخ</SelectItem>
                    <SelectItem value="amount">المبلغ</SelectItem>
                    <SelectItem value="id">الرقم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">النتائج</h3>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id="selectAll"
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                  <label htmlFor="selectAll" className="text-sm text-muted-foreground cursor-pointer">
                    تحديد الكل
                  </label>
                </div>
                {selectedEntries.length > 0 && (
                  <span className="text-sm text-primary font-medium">
                    ({selectedEntries.length} محدد)
                  </span>
                )}
              </div>
            </div>

            {/* Entry Cards */}
            <div className="space-y-3">
              {mockEntries.map((entry) => (
                <Card 
                  key={entry.id} 
                  className={`hover:shadow-md transition-shadow ${selectedEntries.includes(entry.id) ? 'ring-2 ring-primary' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between flex-row-reverse">
                      {/* Checkbox */}
                      <div className="flex items-center">
                        <Checkbox 
                          checked={selectedEntries.includes(entry.id)}
                          onCheckedChange={(checked) => handleSelectEntry(entry.id, checked as boolean)}
                        />
                      </div>
                      {/* Left side - Actions and Amount */}
                      <div className="flex items-center gap-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="bg-popover border border-border">
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" />
                              عرض
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer">
                              <Pencil className="h-4 w-4" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 cursor-pointer text-destructive">
                              <Trash2 className="h-4 w-4" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="flex items-center gap-1 text-primary font-bold">
                          <span>﷼</span>
                          <span>{entry.amount.toLocaleString()}</span>
                        </div>
                      </div>

                      {/* Center - Account Flow */}
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                          {entry.toAccount} {entry.transferDate}
                        </span>
                        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                          {entry.fromAccount}
                        </span>
                      </div>

                      {/* Right side - Description and Meta */}
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end mb-1">
                          <span className="text-sm font-medium">{entry.description}</span>
                          <span className="text-sm text-primary font-semibold">
                            #{entry.id} - {entry.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 justify-end text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {entry.branch}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            بواسطة: {entry.postedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JournalEntries;
