import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import JournalEntries from "./pages/JournalEntries";
import AddJournalEntry from "./pages/AddJournalEntry";
import EditLog from "./pages/EditLog";
import PaymentVoucher from "./pages/PaymentVoucher";
import ReceiptVoucher from "./pages/ReceiptVoucher";
import AddReceiptVoucher from "./pages/AddReceiptVoucher";
import AssetManagement from "./pages/AssetManagement";
import AddAsset from "./pages/AddAsset";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/journal-entries" element={<JournalEntries />} />
              <Route path="/journal-entries/add" element={<AddJournalEntry />} />
              <Route path="/journal-entries/edit-log" element={<EditLog />} />
              <Route path="/payment-voucher" element={<PaymentVoucher />} />
              <Route path="/receipt-voucher" element={<ReceiptVoucher />} />
              <Route path="/receipt-voucher/add" element={<AddReceiptVoucher />} />
              <Route path="/asset-management" element={<AssetManagement />} />
              <Route path="/asset-management/add" element={<AddAsset />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
