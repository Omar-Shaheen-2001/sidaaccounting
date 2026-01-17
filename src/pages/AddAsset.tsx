import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddAsset = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    code: "000001",
    name: "",
    purchaseDate: new Date().toISOString().split('T')[0].split('-').reverse().join('/'),
    serviceStartDate: "",
    location: "",
    mainAccount: "",
    productiveLife: "",
    quantity: "",
    employee: "",
    description: "",
    purchaseValue: "",
    cashAccount: "",
    tax1: "",
    tax2: "",
  });

  const handleSave = () => {
    if (!formData.name) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم الأصل",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "تم الحفظ",
      description: "تم حفظ الأصل بنجاح",
    });
    navigate("/asset-management");
  };

  const handleCancel = () => {
    navigate("/asset-management");
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <TopBar
        companyName="شركة الأمل للتجارة"
        userName="محمد أحمد"
        userRole="مدير النظام"
        accountingPeriod="2024/01/01 - 2024/12/31"
        notificationCount={3}
      />
      
      <Sidebar />
      
      <main className="mr-56 p-6 transition-all duration-300">
        {/* Action Bar */}
        <div className="flex items-center gap-2 mb-6 bg-card rounded-lg p-2 shadow-sm border">
          <Button 
            className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
            onClick={handleSave}
          >
            <Save className="h-4 w-4" />
            حفظ
          </Button>
          <Button 
            variant="outline"
            onClick={handleCancel}
          >
            إلغاء
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleCancel}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Form Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Details Section */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center border-b pb-3">
              تفاصيل الأصل
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder=""
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">الكود *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceStartDate">تاريخ بداية الخدمة *</Label>
                  <Input
                    id="serviceStartDate"
                    type="text"
                    value={formData.serviceStartDate}
                    onChange={(e) => setFormData({ ...formData, serviceStartDate: e.target.value })}
                    placeholder=""
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchaseDate">تاريخ الشراء *</Label>
                  <Input
                    id="purchaseDate"
                    value={formData.purchaseDate}
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">المكان</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder=""
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mainAccount">الحساب الرئيسي *</Label>
                  <Select
                    value={formData.mainAccount}
                    onValueChange={(value) => setFormData({ ...formData, mainAccount: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed-assets">الأصول الثابتة</SelectItem>
                      <SelectItem value="equipment">المعدات</SelectItem>
                      <SelectItem value="vehicles">المركبات</SelectItem>
                      <SelectItem value="furniture">الأثاث</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">الكمية</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder=""
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productiveLife">العمر الانتاجي</Label>
                  <Input
                    id="productiveLife"
                    value={formData.productiveLife}
                    onChange={(e) => setFormData({ ...formData, productiveLife: e.target.value })}
                    placeholder=""
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="employee">موظف</Label>
                <Select
                  value={formData.employee}
                  onValueChange={(value) => setFormData({ ...formData, employee: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="من فضلك اختر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp1">محمد أحمد</SelectItem>
                    <SelectItem value="emp2">أحمد علي</SelectItem>
                    <SelectItem value="emp3">خالد محمود</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder=""
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>المرفقات</Label>
                <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Upload className="h-8 w-8" />
                    <span className="text-sm">افلت الملف هنا او اختر من جهازك</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Details Section */}
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6 text-center border-b pb-3">
              تفاصيل التسعير
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="purchaseValue">قيمة الشراء *</Label>
                <div className="flex gap-2">
                  <Input
                    id="purchaseValue"
                    type="number"
                    value={formData.purchaseValue}
                    onChange={(e) => setFormData({ ...formData, purchaseValue: e.target.value })}
                    placeholder=""
                    className="flex-1"
                  />
                  <Select defaultValue="SAR">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SAR">SAR</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cashAccount">حساب النقدية *</Label>
                <Select
                  value={formData.cashAccount}
                  onValueChange={(value) => setFormData({ ...formData, cashAccount: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">الصندوق</SelectItem>
                    <SelectItem value="bank">البنك</SelectItem>
                    <SelectItem value="petty-cash">النثرية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax2">الضريبة 2</Label>
                  <Select
                    value={formData.tax2}
                    onValueChange={(value) => setFormData({ ...formData, tax2: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الضريبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون ضريبة</SelectItem>
                      <SelectItem value="vat5">ضريبة 5%</SelectItem>
                      <SelectItem value="vat10">ضريبة 10%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax1">الضريبة 1</Label>
                  <Select
                    value={formData.tax1}
                    onValueChange={(value) => setFormData({ ...formData, tax1: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الضريبة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون ضريبة</SelectItem>
                      <SelectItem value="vat15">ضريبة القيمة المضافة 15%</SelectItem>
                      <SelectItem value="vat5">ضريبة 5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddAsset;
