import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

// Mock data for edit log entries
const mockEditLogEntries = [
  {
    id: 1,
    date: "24/12/2025 18:58",
    procedure: "إضافة",
    employee: "dhomnah (المالك)",
    journalNumber: 49191,
    accountName: "الخزينة الرئيسية - 333",
    description: "The system 000003# مصروف shall format monetary values according to The system shall log audit data in a way that ensures traceability between journal entries and user actions.",
    currency: "SAR",
    debit: 0,
    credit: 1000,
    localDebit: 0,
    localCredit: 1000,
    journalDate: "24/12/2025",
  },
  {
    id: 2,
    date: "24/12/2025 18:58",
    procedure: "إضافة",
    employee: "dhomnah (المالك)",
    journalNumber: 49191,
    accountName: "م تشغيل - رسوم و اشتراكات - فرع الدائري - 24",
    description: "The system 000003# مصروف shall format monetary values according to The system shall log audit data in a way that ensures traceability between journal entries.",
    currency: "SAR",
    debit: 1000,
    credit: 0,
    localDebit: 1000,
    localCredit: 0,
    journalDate: "24/12/2025",
  },
  {
    id: 3,
    date: "23/12/2025 14:30",
    procedure: "تعديل",
    employee: "admin (مدير)",
    journalNumber: 49190,
    accountName: "البنك الأهلي - 101",
    description: "تعديل قيد إيداع بنكي",
    currency: "SAR",
    debit: 5000,
    credit: 0,
    localDebit: 5000,
    localCredit: 0,
    journalDate: "23/12/2025",
  },
  {
    id: 4,
    date: "22/12/2025 10:15",
    procedure: "حذف",
    employee: "dhomnah (المالك)",
    journalNumber: 49189,
    accountName: "العملاء - شركة الأمل - 201",
    description: "حذف قيد خاطئ",
    currency: "SAR",
    debit: 0,
    credit: 2500,
    localDebit: 0,
    localCredit: 2500,
    journalDate: "22/12/2025",
  },
  {
    id: 5,
    date: "21/12/2025 16:45",
    procedure: "إضافة",
    employee: "admin (مدير)",
    journalNumber: 49188,
    accountName: "مصروفات الرواتب - 401",
    description: "صرف رواتب شهر ديسمبر",
    currency: "SAR",
    debit: 15000,
    credit: 0,
    localDebit: 15000,
    localCredit: 0,
    journalDate: "21/12/2025",
  },
];

const EditLog = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const totalItems = 16813;

  // Filter states
  const [accountFilter, setAccountFilter] = useState("any");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [actionType, setActionType] = useState("any");
  const [employeeCode, setEmployeeCode] = useState("any");

  const handleSearch = () => {
    console.log("Searching with filters:", {
      accountFilter,
      descriptionFilter,
      dateFrom,
      dateTo,
      actionType,
      employeeCode,
    });
  };

  const handleResetFilters = () => {
    setAccountFilter("any");
    setDescriptionFilter("");
    setDateFrom("");
    setDateTo("");
    setActionType("any");
    setEmployeeCode("any");
  };

  const getProcedureStyle = (procedure: string) => {
    switch (procedure) {
      case "إضافة":
        return "text-green-600 bg-green-50 dark:bg-green-950/30";
      case "تعديل":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950/30";
      case "حذف":
        return "text-red-600 bg-red-50 dark:bg-red-950/30";
      default:
        return "";
    }
  };

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
              variant="outline" 
              className="gap-2 bg-background"
              onClick={() => navigate("/journal-entries")}
            >
              <ArrowLeft className="h-4 w-4" />
              العودة للقيود
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
          </div>
        </div>

        <div className="p-6">
          {/* Search Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-right mb-4">بحث</h3>

              {/* Filter Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الحساب</label>
                  <Select value={accountFilter} onValueChange={setAccountFilter}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="أي حساب" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="any">أي حساب</SelectItem>
                      <SelectItem value="cash">الخزينة الرئيسية</SelectItem>
                      <SelectItem value="bank">البنك</SelectItem>
                      <SelectItem value="clients">العملاء</SelectItem>
                      <SelectItem value="expenses">المصروفات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الوصف</label>
                  <Input 
                    placeholder="" 
                    className="bg-background" 
                    value={descriptionFilter}
                    onChange={(e) => setDescriptionFilter(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">التاريخ</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="text" 
                      placeholder="إلى" 
                      className="bg-background" 
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                    <span className="text-muted-foreground">-</span>
                    <Input 
                      type="text" 
                      placeholder="من" 
                      className="bg-background" 
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">الإجراء</label>
                  <Select value={actionType} onValueChange={setActionType}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="أي إجراء" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="any">أي إجراء</SelectItem>
                      <SelectItem value="add">إضافة</SelectItem>
                      <SelectItem value="edit">تعديل</SelectItem>
                      <SelectItem value="delete">حذف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-right block">كود الموظف</label>
                  <Select value={employeeCode} onValueChange={setEmployeeCode}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="أي موظف" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border border-border">
                      <SelectItem value="any">أي موظف</SelectItem>
                      <SelectItem value="dhomnah">dhomnah</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 justify-start">
                <Button variant="outline" className="bg-background" onClick={handleResetFilters}>
                  إلغاء الفلتر
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSearch}>
                  بحث
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-right mb-4">النتائج</h3>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="text-right font-semibold">تاريخ القيد</TableHead>
                      <TableHead className="text-right font-semibold">دائن محلي</TableHead>
                      <TableHead className="text-right font-semibold">مدين محلي</TableHead>
                      <TableHead className="text-right font-semibold">دائن</TableHead>
                      <TableHead className="text-right font-semibold">مدين</TableHead>
                      <TableHead className="text-right font-semibold">العملة</TableHead>
                      <TableHead className="text-right font-semibold">الوصف</TableHead>
                      <TableHead className="text-right font-semibold">الاسم</TableHead>
                      <TableHead className="text-right font-semibold">رقم القيد</TableHead>
                      <TableHead className="text-right font-semibold">الموظف</TableHead>
                      <TableHead className="text-right font-semibold">الإجراء</TableHead>
                      <TableHead className="text-right font-semibold">التاريخ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockEditLogEntries.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-muted/30">
                        <TableCell className="text-right">{entry.journalDate}</TableCell>
                        <TableCell className="text-right font-mono">
                          {entry.localCredit.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {entry.localDebit.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {entry.credit.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-mono">
                          {entry.debit.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">{entry.currency}</TableCell>
                        <TableCell className="text-right max-w-xs truncate" title={entry.description}>
                          {entry.description}
                        </TableCell>
                        <TableCell className="text-right">{entry.accountName}</TableCell>
                        <TableCell className="text-right font-mono">{entry.journalNumber}</TableCell>
                        <TableCell className="text-right">{entry.employee}</TableCell>
                        <TableCell className="text-right">
                          <span className={`px-2 py-1 rounded text-sm ${getProcedureStyle(entry.procedure)}`}>
                            {entry.procedure}
                          </span>
                        </TableCell>
                        <TableCell className="text-right whitespace-nowrap">{entry.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination at bottom */}
              <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  1-{itemsPerPage} من {totalItems.toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EditLog;
