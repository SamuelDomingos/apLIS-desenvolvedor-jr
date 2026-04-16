import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import AppSidebar from "./components/AppSidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageMedicos from "./pages/medicos/page";
import PagePacientes from "./pages/pacientes/page";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <TooltipProvider>
          <AppSidebar />
          <main className="flex-1 w-full overflow-auto">
            <div className="flex items-center justify-between p-2 border-b bg-background">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
              </div>
              <LanguageSwitcher />
            </div>
            <Routes>
              <Route path="/" element={<Navigate to="/medicos" replace />} />
              <Route path="/medicos" element={<PageMedicos />} />
              <Route path="/pacientes" element={<PagePacientes />} />
              <Route path="*" element={<Navigate to="/medicos" replace />} />
            </Routes>
          </main>
        </TooltipProvider>
      </SidebarProvider>
    </BrowserRouter>
  );
}
