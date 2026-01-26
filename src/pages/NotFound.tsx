import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Home, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

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
      
      <main className="mr-56 p-6 transition-all duration-300">
        <div className="flex flex-col items-center justify-center min-h-[70vh]">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-12 w-12 text-destructive" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-foreground">404</h1>
              <p className="text-xl text-muted-foreground">الصفحة غير موجودة</p>
              <p className="text-sm text-muted-foreground max-w-md">
                عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
                <br />
                <span className="text-xs opacity-70 font-mono">{location.pathname}</span>
              </p>
            </div>
            
            <Button asChild size="lg" className="gap-2">
              <a href="/">
                <Home className="h-4 w-4" />
                العودة للوحة التحكم
              </a>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
