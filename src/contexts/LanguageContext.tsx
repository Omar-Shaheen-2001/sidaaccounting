import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    dashboard: "لوحة التحكم",
    registeredCompany: "الشركة المسجلة",
    accountingPeriod: "الفترة المحاسبية",
    notifications: "الإشعارات",
    unpostedEntries: "قيود غير مرحّلة",
    unpostedEntriesDesc: "يوجد 5 قيود بانتظار الترحيل",
    periodClosing: "اقتراب إغلاق الفترة",
    periodClosingDesc: "متبقي 3 أيام على إغلاق الفترة الحالية",
    myAccount: "حسابي",
    profile: "الملف الشخصي",
    settings: "الإعدادات",
    logout: "تسجيل الخروج",
    systemName: "نظام سيدا المحاسبي",
    systemNameEn: "SIDA Accounting System",
    dashboardOverview: "نظرة عامة على الوضع المالي للشركة",
    totalCash: "إجمالي النقد",
    cashBoxes: "الصناديق النقدية",
    totalBanks: "إجمالي البنوك",
    bankAccounts: "الحسابات البنكية",
    customerReceivables: "مستحقات العملاء",
    totalReceivables: "إجمالي الذمم المدينة",
    supplierLiabilities: "التزامات الموردين",
    totalPayables: "إجمالي الذمم الدائنة",
  },
  en: {
    dashboard: "Dashboard",
    registeredCompany: "Registered Company",
    accountingPeriod: "Accounting Period",
    notifications: "Notifications",
    unpostedEntries: "Unposted Entries",
    unpostedEntriesDesc: "5 entries pending posting",
    periodClosing: "Period Closing Soon",
    periodClosingDesc: "3 days remaining until period close",
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    logout: "Logout",
    systemName: "SIDA Accounting System",
    systemNameEn: "SIDA Accounting System",
    dashboardOverview: "Overview of company financial status",
    totalCash: "Total Cash",
    cashBoxes: "Cash Boxes",
    totalBanks: "Total Banks",
    bankAccounts: "Bank Accounts",
    customerReceivables: "Customer Receivables",
    totalReceivables: "Total Receivables",
    supplierLiabilities: "Supplier Liabilities",
    totalPayables: "Total Payables",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ar";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
