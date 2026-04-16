import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "./ui/sidebar";
import { useNavigate } from "react-router-dom";
import { Users, Stethoscope, LayoutDashboard } from "lucide-react";

export default function AppSidebar() {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 px-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight">apLIS</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/medicos")}
              className="flex items-center gap-3 px-3 py-6 h-12 transition-colors"
            >
              <Stethoscope className="h-5 w-5" />
              <span className="font-medium">Médicos</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => navigate("/pacientes")}
              className="flex items-center gap-3 px-3 py-6 h-12 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span className="font-medium">Pacientes</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
