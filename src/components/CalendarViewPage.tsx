import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, TrendingUp, DollarSign, Filter } from "lucide-react";

export function CalendarViewPage() {
  const [currentMonth, setCurrentMonth] = useState("November 2025");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Generate calendar data (Nov 2025)
  const generateCalendarData = () => {
    const days = [];
    const startDay = 5; // Nov 1 is Friday (0 = Sun)
    const daysInMonth = 30;

    // Empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
      days.push({ day: null, amount: 0, expenses: 0 });
    }

    // Days with random spending data
    for (let day = 1; day <= daysInMonth; day++) {
      const amount = Math.random() * 300;
      const expenses = Math.floor(Math.random() * 8);
      days.push({ day, amount, expenses });
    }

    return days;
  };

  const calendarDays = generateCalendarData();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getAmountColor = (amount: number) => {
    if (amount > 200) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (amount > 100) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    if (amount > 50) return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (amount > 0) return "bg-green-500/20 text-green-400 border-green-500/30";
    return "bg-gray-500/10 text-gray-500";
  };

  const totalMonthSpending = calendarDays.reduce((sum, day) => sum + (day.amount || 0), 0);
  const activeDays = calendarDays.filter(day => day.day && day.amount > 0).length;
  const avgPerDay = totalMonthSpending / activeDays;
  const busiestDay = calendarDays.reduce((max, day) => 
    day.amount > (max.amount || 0) ? day : max
  , { day: null, amount: 0 });

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Calendar View</h1>
          <p className="text-gray-400">Track your daily spending patterns</p>
        </div>

        <div className="flex items-center gap-3">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48 bg-[rgb(30,30,45)] border-[rgb(39,39,55)]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
              <SelectItem value="all">All Expenses</SelectItem>
              <SelectItem value="food">🍽️ Food & Dining</SelectItem>
              <SelectItem value="shopping">🛍️ Shopping</SelectItem>
              <SelectItem value="transport">🚗 Transport</SelectItem>
              <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Summary */}
        <div className="space-y-4">
          <Card className="glass-card border-[rgb(39,39,55)] card-hover">
            <CardHeader>
              <CardTitle className="text-sm text-gray-400">Month Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                <p className="text-2xl text-[#4A8BFF] number-glow">${totalMonthSpending.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Average per Day</p>
                <p className="text-xl">${avgPerDay.toFixed(2)}</p>
              </div>
              
              <div>
                <p className="text-xs text-gray-500 mb-1">Active Days</p>
                <p className="text-xl">{activeDays} days</p>
              </div>

              <div className="pt-4 border-t border-[rgb(39,39,55)]">
                <p className="text-xs text-gray-500 mb-2">Busiest Day</p>
                <div className="flex items-center justify-between">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    Nov {busiestDay.day}
                  </Badge>
                  <span className="text-sm">${busiestDay.amount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-blue-500/10 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm mb-1">Spending Trend</p>
                  <p className="text-xs text-gray-400">You spent 15% more this week compared to last week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-purple-500/10 to-transparent">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <CalendarIcon className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-sm mb-1">Weekend Pattern</p>
                  <p className="text-xs text-gray-400">Weekends account for 40% of your monthly spending</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Grid */}
        <div className="lg:col-span-3">
          <Card className="glass-card border-[rgb(39,39,55)] card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-[#4A8BFF]" />
                  {currentMonth}
                </CardTitle>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-[rgb(30,30,45)]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-[rgb(30,30,45)]"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day Names Header */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {dayNames.map(name => (
                  <div key={name} className="text-center text-xs text-gray-500 font-medium py-2">
                    {name}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {calendarDays.map((dayData, index) => {
                  if (!dayData.day) {
                    return <div key={index} className="aspect-square" />;
                  }

                  const isHighSpending = dayData.amount > 200;
                  const isMediumSpending = dayData.amount > 100 && dayData.amount <= 200;

                  return (
                    <div
                      key={index}
                      className={`aspect-square p-2 rounded-xl border transition-all cursor-pointer card-hover flex flex-col ${
                        isHighSpending
                          ? "bg-red-500/10 border-red-500/30 hover:border-red-500/50"
                          : isMediumSpending
                          ? "bg-orange-500/10 border-orange-500/30 hover:border-orange-500/50"
                          : dayData.amount > 0
                          ? "bg-[rgb(30,30,45)] border-[rgb(39,39,55)] hover:border-[#4A8BFF]/30"
                          : "bg-[rgb(25,25,35)] border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-auto">
                        <span className={`text-sm ${
                          isHighSpending ? "text-red-400 font-medium" : 
                          isMediumSpending ? "text-orange-400 font-medium" : 
                          "text-gray-400"
                        }`}>
                          {dayData.day}
                        </span>
                        {isHighSpending && (
                          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        )}
                      </div>
                      
                      {dayData.amount > 0 && (
                        <div className="mt-auto">
                          <p className={`text-xs font-medium ${
                            isHighSpending ? "text-red-400" :
                            isMediumSpending ? "text-orange-400" :
                            "text-[#4A8BFF]"
                          }`}>
                            ${dayData.amount.toFixed(0)}
                          </p>
                          {dayData.expenses > 0 && (
                            <p className="text-[10px] text-gray-500">
                              {dayData.expenses} items
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[rgb(39,39,55)] text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/30"></div>
                  <span className="text-gray-400">$0-50</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-500/20 border border-blue-500/30"></div>
                  <span className="text-gray-400">$50-100</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-orange-500/20 border border-orange-500/30"></div>
                  <span className="text-gray-400">$100-200</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/30"></div>
                  <span className="text-gray-400">$200+</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
