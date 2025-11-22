import { Bell, Search, User, LogOut, Settings, Moon, Sun } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

type NavbarProps = {
  onLogout?: () => void;
};

export function Navbar({ onLogout }: NavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const notificationCount = 3;

  return (
    <div className="h-16 glass-navbar px-8 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses, groups..."
            className="w-full bg-[rgb(30,30,45)]/60 backdrop-blur-sm border border-[rgb(39,39,55)] rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4A8BFF] transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl hover:bg-[rgb(30,30,45)]/60 transition-all hover:scale-105"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-gray-400 hover:text-[#4A8BFF] transition-colors" />
          ) : (
            <Moon className="w-5 h-5 text-gray-400 hover:text-[#4A8BFF] transition-colors" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-[rgb(30,30,45)]/60 transition-all hover:scale-105">
          <Bell className="w-5 h-5 text-gray-400 hover:text-[#4A8BFF] transition-colors" />
          {notificationCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#4A8BFF] text-white text-xs border-2 border-[rgb(20,20,28)]">
              {notificationCount}
            </Badge>
          )}
        </button>
        
        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-4 border-l border-[rgb(39,39,55)] hover:opacity-80 transition-opacity">
              <Avatar className="h-9 w-9 ring-2 ring-[#4A8BFF]/30 transition-all hover:ring-[#4A8BFF]/60">
                <AvatarFallback className="bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C] text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-sm">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-[rgb(20,20,28)] border-[rgb(39,39,55)]" align="end">
            <DropdownMenuLabel className="text-gray-300">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[rgb(39,39,55)]" />
            <DropdownMenuItem className="focus:bg-[rgb(30,30,45)] focus:text-white cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-[rgb(30,30,45)] focus:text-white cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[rgb(39,39,55)]" />
            <DropdownMenuItem
              onClick={() => {
                if (onLogout) onLogout();
              }}
              className="focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}