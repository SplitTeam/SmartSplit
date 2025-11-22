import { useState, useEffect, useCallback } from "react";
import * as React from "react";
import { LoginPage } from "./components/LoginPage";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { AnalyticsPage } from "./components/AnalyticsPage";
import { ExpensesPage } from "./components/ExpensesPage";
import { GroupOverview } from "./components/GroupOverview";
import { BalancePage } from "./components/BalancePage";
import { RecurringExpensesPage } from "./components/RecurringExpensesPage";
import { AIScannerPage } from "./components/AIScannerPage";
import { CalendarViewPage } from "./components/CalendarViewPage";
import { RecommendationsPage } from "./components/RecommendationsPage";
import { AchievementsPage } from "./components/AchievementsPage";
import { SettleUpPage } from "./components/SettleUpPage";
import { AddExpenseModal } from "./components/AddExpenseModal";
import { Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

function getPageFromPath(): string {
  // Derive the current page slug from the window location, removing the Vite base if present.
  try {
    const baseRaw = (import.meta as any).env?.BASE_URL ?? "/";
    let base = String(baseRaw);
    if (!base.startsWith("/")) base = "/" + base;
    if (!base.endsWith("/")) base = base + "/";

    let path = window.location.pathname || "/";

    if (base !== "/" && path.startsWith(base)) {
      path = path.slice(base.length);
    } else if (path.startsWith("/")) {
      path = path.slice(1);
    }

    const slug = path.split("/")[0];
    return slug || "dashboard";
  } catch (e) {
    return "dashboard";
  }
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>(() => getPageFromPath());
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = useCallback(() => {
    // Clear any stored session (if applicable) and reset UI state
    try {
      // example: localStorage.removeItem('token'); // uncomment if you use tokens
    } catch (e) {}

    setIsLoggedIn(false);
    setCurrentPage("dashboard");

    try {
      const baseRaw = (import.meta as any).env?.BASE_URL ?? "/";
      let base = String(baseRaw);
      if (!base.startsWith("/")) base = "/" + base;
      if (!base.endsWith("/")) base = base + "/";
      const newPath = `${base}dashboard`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, "", newPath);
      }
    } catch (e) {}
  }, []);

  const handleNavigate = useCallback((page: string) => {
    // Update history and state. Respect BASE_URL so this works in dev and when deployed under
    // a subpath (e.g. GitHub Pages /SmartSplit/).
    try {
      const baseRaw = (import.meta as any).env?.BASE_URL ?? "/";
      let base = String(baseRaw);
      if (!base.startsWith("/")) base = "/" + base;
      if (!base.endsWith("/")) base = base + "/";

      const newPath = `${base}${page}`;
      if (window.location.pathname !== newPath) {
        window.history.pushState({}, "", newPath);
      }
    } catch (e) {
      // ignore and just set state
    }

    setCurrentPage(page);
  }, []);

  // Update page when user uses back/forward
  useEffect(() => {
    const onPop = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-[rgb(10,10,15)]">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar onLogout={handleLogout} />

          <main className="flex-1 overflow-y-auto">
            {currentPage === "dashboard" && <Dashboard onNavigate={handleNavigate} />}
            {currentPage === "analytics" && <AnalyticsPage />}
            {currentPage === "expenses" && (
              <ExpensesPage onAddExpense={() => setIsAddExpenseOpen(true)} />
            )}
            {currentPage === "groups" && <GroupOverview />}
            {currentPage === "balance" && <BalancePage />}
            {currentPage === "recurring" && <RecurringExpensesPage />}
            {currentPage === "scanner" && <AIScannerPage />}
            {currentPage === "calendar" && <CalendarViewPage />}
            {currentPage === "recommendations" && <RecommendationsPage />}
            {currentPage === "achievements" && <AchievementsPage />}
            {currentPage === "settle" && <SettleUpPage />}
            {currentPage === "settings" && (
              <div className="p-8">
                <h1 className="mb-2">Settings</h1>
                <p className="text-gray-400">Settings page coming soon...</p>
              </div>
            )}
          </main>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsAddExpenseOpen(true)}
              className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-linear-to-r from-[#4A8BFF] to-[#1A2A6C] text-white shadow-2xl hover:shadow-[0_0_40px_rgba(74,139,255,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center z-50 glow-blue"
            >
              <Plus className="w-7 h-7" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)]">
            <p>Add New Expense</p>
          </TooltipContent>
        </Tooltip>

        <AddExpenseModal
          open={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
}