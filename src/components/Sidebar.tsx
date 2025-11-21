import { LayoutDashboard, Users, Receipt, Wallet, Settings, BarChart3, Repeat, ScanLine, Calendar, Sparkles, Trophy, DollarSign } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "groups", label: "Groups", icon: Users },
    { id: "expenses", label: "Expenses", icon: Receipt },
    { id: "balance", label: "Balance", icon: Wallet },
    { id: "recurring", label: "Recurring", icon: Repeat },
    { id: "scanner", label: "AI Scanner", icon: ScanLine },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "recommendations", label: "Insights", icon: Sparkles },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "settle", label: "Settle Up", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-[rgb(20,20,28)] border-r border-[rgb(39,39,55)] flex flex-col">
      <div className="p-6 border-b border-[rgb(39,39,55)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-blue flex items-center justify-center glow-blue-hover">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl">SmartSplit</span>
        </div>
      </div>
      
      <TooltipProvider>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Tooltip key={item.id} delayDuration={300}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C] text-white glow-blue shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-[rgb(30,30,45)]/80 hover:shadow-md"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)]">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </div>
  );
}