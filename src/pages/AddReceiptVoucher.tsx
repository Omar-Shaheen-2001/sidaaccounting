import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Save, X, Upload, Plus, CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const AddReceiptVoucher = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form state
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("SAR");
  const [description, setDescription] = useState("");
  const [voucherCode, setVoucherCode] = useState("000002");
  const [voucherDate, setVoucherDate] = useState<Date>(new Date());
  const [payer, setPayer] = useState("");
  const [classification, setClassification] = useState("");
  const [subAccount, setSubAccount] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [taxes, setTaxes] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال المبلغ",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم الحفظ",
      description: "تم إنشاء سند القبض بنجاح",
    });
    
    setIsSaving(false);
    navigate("/receipt-voucher");
  };

  const handleSaveAsDraft = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    toast({
      title: "تم الحفظ كمسودة",
      description: "تم حفظ سند القبض كمسودة",
    });
    
    setIsSaving(false);
    navigate("/receipt-voucher");
  };

  const handleCancel = () => {
    navigate("/receipt-voucher");
  };

  const handleAddTax = () => {
    setTaxes([...taxes, ""]);
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <TopBar 
        companyName="شركة سيدا"
        userName="أحمد محمد"
        userRole="مدير مالي"
        accountingPeriod="2026"
        notificationCount={3}
      />
      <Sidebar />
      
      <main className="pr-64 pt-16">
        <div className="p-6">
          {/* Action Bar */}
          <div className="flex items-center gap-2 mb-6 bg-muted/30 p-2 rounded-lg border">
            <div className="flex items-center gap-2">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ
                <ChevronDown className="h-4 w-4 mr-2" />
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSaveAsDraft}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 ml-2" />
                حفظ كمسودة
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleCancel}
              >
                <X className="h-4 w-4 ml-2" />
                إلغاء
              </Button>
            </div>
          </div>

          {/* Main Form */}
          <Card className="border-border/50">
            <CardContent className="p-6 space-y-6">
              {/* Amount Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-right block">المبلغ</Label>
                <div className="flex items-center gap-2">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">SAR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="text-left text-2xl font-bold h-14 flex-1 bg-primary/5 border-primary/20"
                    dir="ltr"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-right block">الوصف</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="أدخل وصف السند..."
                  className="min-h-[100px] resize-none"
                />
              </div>

              {/* Attachments */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-right block">المرفقات</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-primary hover:underline">
                    أفلت الملف هنا أو اختر من جهازك
                  </p>
                </div>
              </div>

              {/* Voucher Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Voucher Code */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    رقم الكود <span className="text-destructive">*</span>
                    <span className="text-muted-foreground text-xs">؟</span>
                  </Label>
                  <Input
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="text-left"
                    dir="ltr"
                  />
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">التاريخ</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !voucherDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {voucherDate ? format(voucherDate, "dd/MM/yyyy") : "اختر التاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={voucherDate}
                        onSelect={(date) => date && setVoucherDate(date)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Payer */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">الباعث</Label>
                  <Select value={payer} onValueChange={setPayer}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الباعث" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer1">عميل 1</SelectItem>
                      <SelectItem value="customer2">عميل 2</SelectItem>
                      <SelectItem value="customer3">عميل 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Classification */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">التصنيف</Label>
                  <div className="flex items-center gap-2">
                    <Select value={classification} onValueChange={setClassification}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="اختر التصنيف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">مبيعات</SelectItem>
                        <SelectItem value="services">خدمات</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add Classification Link */}
              <div className="text-sm text-primary hover:underline cursor-pointer">
                + إضافة تصنيف
              </div>

              {/* Sub Account & Taxes Section */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="recurring"
                      checked={isRecurring}
                      onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
                    />
                    <Label htmlFor="recurring" className="text-sm cursor-pointer">
                      متكرر
                    </Label>
                  </div>
                  
                  <span className="text-sm text-muted-foreground">الحساب الفرعي متعدد</span>
                  <span className="text-sm text-muted-foreground">الضرائب</span>
                </div>

                <div className="flex items-center gap-2">
                  <Select value={subAccount} onValueChange={setSubAccount}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="إلى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">البنك</SelectItem>
                      <SelectItem value="cash">الصندوق</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddTax}
                    className="text-primary"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة ضرائب
                  </Button>
                </div>
              </div>

              {/* Tax Items */}
              {taxes.length > 0 && (
                <div className="space-y-2 pt-4">
                  {taxes.map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="اختر الضريبة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vat15">ضريبة القيمة المضافة 15%</SelectItem>
                          <SelectItem value="vat5">ضريبة القيمة المضافة 5%</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTaxes(taxes.filter((_, i) => i !== index))}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AddReceiptVoucher;
