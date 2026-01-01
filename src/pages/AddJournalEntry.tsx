import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { 
  Save, 
  X, 
  FileText, 
  Upload, 
  GripVertical,
  Trash2,
  Plus,
  Check,
  ChevronsUpDown,
  CalendarIcon
} from "lucide-react";

const accounts = [
  { value: "cash", label: "الخزينة الرئيسية" },
  { value: "bank", label: "البنك" },
  { value: "clients", label: "العملاء" },
  { value: "suppliers", label: "الموردون" },
  { value: "expenses", label: "المصروفات" },
  { value: "revenue", label: "الإيرادات" },
  { value: "inventory", label: "المخزون" },
  { value: "fixed-assets", label: "الأصول الثابتة" },
  { value: "payables", label: "الذمم الدائنة" },
  { value: "receivables", label: "الذمم المدينة" },
];

interface JournalLine {
  id: number;
  accountName: string;
  description: string;
  costCenter: string;
  tax: string;
  debit: number | string;
  credit: number | string;
}

const AddJournalEntry = () => {
  const navigate = useNavigate();
  const [journalDate, setJournalDate] = useState<Date>(new Date());
  const [currency, setCurrency] = useState("SAR");
  const [journalNumber, setJournalNumber] = useState("49068");
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<JournalLine[]>([
    { id: 1, accountName: "", description: "", costCenter: "", tax: "", debit: "", credit: "" },
    { id: 2, accountName: "", description: "", costCenter: "", tax: "", debit: "", credit: "" },
  ]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleAddLine = () => {
    const newId = Math.max(...lines.map(l => l.id)) + 1;
    setLines([...lines, { 
      id: newId, 
      accountName: "", 
      description: description, 
      costCenter: "", 
      tax: "", 
      debit: "", 
      credit: "" 
    }]);
  };

  const handleRemoveLine = (id: number) => {
    if (lines.length > 2) {
      setLines(lines.filter(line => line.id !== id));
    }
  };

  const handleLineChange = (id: number, field: keyof JournalLine, value: string | number) => {
    // Validate: prevent negative or zero values for debit/credit
    if (field === 'debit' || field === 'credit') {
      const numValue = Number(value);
      if (value !== '' && numValue < 0) return; // Prevent negative values
      
      // Clear the other field when one is filled
      setLines(lines.map(line => {
        if (line.id === id) {
          if (field === 'debit' && value !== '') {
            return { ...line, debit: value, credit: '' };
          } else if (field === 'credit' && value !== '') {
            return { ...line, credit: value, debit: '' };
          }
          return { ...line, [field]: value };
        }
        return line;
      }));
      return;
    }
    
    setLines(lines.map(line => 
      line.id === id ? { ...line, [field]: value } : line
    ));
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    
    const newLines = [...lines];
    const draggedItem = newLines[draggedIndex];
    newLines.splice(draggedIndex, 1);
    newLines.splice(index, 0, draggedItem);
    setLines(newLines);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const totalDebit = lines.reduce((sum, line) => sum + (Number(line.debit) || 0), 0);
  const totalCredit = lines.reduce((sum, line) => sum + (Number(line.credit) || 0), 0);
  const difference = totalDebit - totalCredit;
  const isBalanced = difference === 0;

  const handleSave = () => {
    if (!isBalanced) {
      alert("يجب أن يكون إجمالي المدين مساوياً لإجمالي الدائن");
      return;
    }
    // Save logic here
    navigate("/journal-entries");
  };

  const handleSaveAsDraft = () => {
    // Save as draft logic here
    navigate("/journal-entries");
  };

  const handleCancel = () => {
    navigate("/journal-entries");
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
              onClick={handleSave}
              className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              disabled={!isBalanced || lines.every(l => !l.accountName)}
            >
              <Save className="h-4 w-4" />
              حفظ
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 bg-background"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
              إلغاء
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2 bg-background"
              onClick={handleSaveAsDraft}
            >
              <FileText className="h-4 w-4" />
              حفظ كمسودة
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Header Section */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Right Column - Date, Currency, Number */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">التاريخ</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-right font-normal bg-background",
                              !journalDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="ml-2 h-4 w-4" />
                            {journalDate ? format(journalDate, "dd/MM/yyyy", { locale: ar }) : <span>اختر التاريخ</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={journalDate}
                            onSelect={(date) => date && setJournalDate(date)}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">العملة</label>
                      <Select value={currency} onValueChange={setCurrency}>
                        <SelectTrigger className="bg-background">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          <SelectItem value="SAR">SAR ريال سعودي</SelectItem>
                          <SelectItem value="USD">USD دولار أمريكي</SelectItem>
                          <SelectItem value="EUR">EUR يورو</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-right block">رقم</label>
                      <Input 
                        type="text" 
                        value={journalNumber}
                        onChange={(e) => setJournalNumber(e.target.value)}
                        className="bg-background text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Left Column - Description */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-right block">وصف</label>
                    <Textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="bg-background min-h-[100px] resize-none"
                      placeholder="أدخل وصف القيد..."
                    />
                  </div>

                  {/* Attachments */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-right block">المرفقات</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        <span className="text-primary cursor-pointer hover:underline">اختر من جهازك</span>
                        {" "}أو افلت الملف هنا
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Journal Lines Section */}
          <Card>
            <CardContent className="p-0">
              {/* Table Header */}
              <div className="grid grid-cols-[40px_40px_1fr_1fr_150px_150px_120px_120px] gap-2 bg-muted/50 px-4 py-3 border-b border-border text-sm font-medium">
                <div></div>
                <div></div>
                <div className="text-right">اسم الحساب *</div>
                <div className="text-right">وصف</div>
                <div className="text-right">مركز التكلفة</div>
                <div className="text-right">الضرائب</div>
                <div className="text-right text-destructive">مدين *</div>
                <div className="text-right text-destructive">دائن *</div>
              </div>

              <div className="divide-y divide-border">
                {lines.map((line, index) => (
                  <div 
                    key={line.id} 
                    className={cn(
                      "grid grid-cols-[40px_40px_1fr_1fr_150px_150px_120px_120px] gap-2 px-4 py-2 items-center hover:bg-muted/30 transition-colors",
                      draggedIndex === index && "bg-muted/50 opacity-70"
                    )}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    {/* Checkbox */}
                    <div className="flex justify-center">
                      <Checkbox />
                    </div>

                    {/* Drag Handle */}
                    <div className="flex justify-center cursor-grab active:cursor-grabbing">
                      <GripVertical className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                    </div>

                    {/* Account Name - Searchable Combobox */}
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between bg-background h-9 font-normal",
                              !line.accountName && "text-muted-foreground"
                            )}
                          >
                            {line.accountName
                              ? accounts.find((account) => account.value === line.accountName)?.label
                              : "الحساب الافتراضي"}
                            <ChevronsUpDown className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0 bg-popover border border-border z-50" align="start">
                          <Command>
                            <CommandInput placeholder="ابحث عن حساب..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>لا توجد نتائج</CommandEmpty>
                              <CommandGroup>
                                {accounts.map((account) => (
                                  <CommandItem
                                    key={account.value}
                                    value={account.label}
                                    onSelect={() => handleLineChange(line.id, 'accountName', account.value)}
                                  >
                                    {account.label}
                                    <Check
                                      className={cn(
                                        "mr-auto h-4 w-4",
                                        line.accountName === account.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Description */}
                    <div>
                      <Input 
                        value={line.description || description}
                        onChange={(e) => handleLineChange(line.id, 'description', e.target.value)}
                        className="bg-background h-9"
                        placeholder="وصف"
                      />
                    </div>

                    {/* Cost Center */}
                    <div>
                      <Select 
                        value={line.costCenter} 
                        onValueChange={(value) => handleLineChange(line.id, 'costCenter', value)}
                      >
                        <SelectTrigger className="bg-background h-9">
                          <SelectValue placeholder="مركز التكلفة" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          <SelectItem value="center1">المركز الرئيسي</SelectItem>
                          <SelectItem value="center2">فرع الرياض</SelectItem>
                          <SelectItem value="center3">فرع جدة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tax */}
                    <div>
                      <Select 
                        value={line.tax} 
                        onValueChange={(value) => handleLineChange(line.id, 'tax', value)}
                      >
                        <SelectTrigger className="bg-background h-9">
                          <SelectValue placeholder="-" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border border-border">
                          <SelectItem value="none">بدون ضريبة</SelectItem>
                          <SelectItem value="vat15">ض.ق.م 15%</SelectItem>
                          <SelectItem value="vat5">ض.ق.م 5%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Debit */}
                    <div>
                      <Input 
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={line.debit}
                        onChange={(e) => handleLineChange(line.id, 'debit', e.target.value)}
                        className={cn(
                          "bg-background h-9 text-left",
                          line.credit && "opacity-50 cursor-not-allowed"
                        )}
                        placeholder="مدين"
                        dir="ltr"
                        disabled={!!line.credit}
                      />
                    </div>

                    {/* Credit */}
                    <div className="flex items-center gap-1">
                      <Input 
                        type="number"
                        min="0.01"
                        step="0.01"
                        value={line.credit}
                        onChange={(e) => handleLineChange(line.id, 'credit', e.target.value)}
                        className={cn(
                          "bg-background h-9 text-left",
                          line.debit && "opacity-50 cursor-not-allowed"
                        )}
                        placeholder="دائن"
                        dir="ltr"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveLine(line.id)}
                        disabled={lines.length <= 2}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Line Button */}
              <div className="px-4 py-3 border-t border-border">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={handleAddLine}
                >
                  <Plus className="h-4 w-4" />
                  إضافة سطر
                </Button>
              </div>

              {/* Totals Section */}
              <div className="bg-muted/30 px-4 py-4 border-t border-border">
                <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
                  <div className="flex items-center gap-6 justify-end">
                    <div className="text-sm">
                      <span className="text-muted-foreground ml-2">إجمالي المدين:</span>
                      <span className="font-bold text-lg">{totalDebit.toLocaleString()}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground ml-2">إجمالي الدائن:</span>
                      <span className="font-bold text-lg">{totalCredit.toLocaleString()}</span>
                    </div>
                    {!isBalanced && (
                      <div className="text-sm">
                        <span className="text-destructive ml-2">الفرق:</span>
                        <span className="font-bold text-lg text-destructive">{Math.abs(difference).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    {isBalanced ? (
                      <span className="text-success text-sm font-medium px-3 py-1 bg-success/10 rounded-full">
                        ✓ القيد متوازن
                      </span>
                    ) : (
                      <span className="text-destructive text-sm font-medium px-3 py-1 bg-destructive/10 rounded-full">
                        ✗ القيد غير متوازن
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddJournalEntry;
