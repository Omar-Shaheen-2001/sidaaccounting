import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Upload, ChevronDown, AlertTriangle, ArrowLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AssetManagement = () => {
  const navigate = useNavigate();
  const [assets] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);

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
          <div className="flex items-center justify-between mb-6 bg-card rounded-lg p-3 shadow-sm border">
            <div className="flex items-center gap-3">
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
                onClick={() => navigate("/asset-management/add")}
              >
                <Plus className="h-4 w-4" />
                أضف أصل
              </Button>
              <Button variant="outline" size="icon" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>تصدير إلى Excel</DropdownMenuItem>
                  <DropdownMenuItem>تصدير إلى PDF</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Checkbox 
                checked={selectAll}
                onCheckedChange={(checked) => setSelectAll(checked as boolean)}
              />
            </div>
          </div>

          {/* Content Area */}
          {assets.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-20 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <div className="space-y-1">
                      <div className="w-12 h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="w-10 h-1.5 bg-muted-foreground/30 rounded"></div>
                      <div className="w-8 h-1.5 bg-muted-foreground/30 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-foreground mb-4">
                لم يتم إضافة أي سجلات بعد
              </h3>
              
              <div className="flex items-center gap-6 text-sm">
                <button 
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  الانتقال إلى الصفحة السابقة
                </button>
                <button 
                  onClick={() => navigate("/asset-management/add")}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  أضف أصل
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-lg border shadow-sm">
              {/* Table will be added when assets exist */}
            </div>
        )}
      </main>
    </div>
  );
};

export default AssetManagement;
