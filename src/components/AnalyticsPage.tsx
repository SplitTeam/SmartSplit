import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, TrendingDown, Utensils, ShoppingBag, Car, Film, Users, Calendar as CalendarIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function AnalyticsPage() {
  // Monthly spending data
  const monthlyData = [
    { month: "Jan", spending: 2400 },
    { month: "Feb", spending: 2210 },
    { month: "Mar", spending: 2800 },
    { month: "Apr", spending: 2650 },
    { month: "May", spending: 3100 },
    { month: "Jun", spending: 2847 },
  ];

  // Category distribution
  const categoryData = [
    { name: "Food", value: 1250, color: "#4A8BFF", icon: Utensils },
    { name: "Shopping", value: 680, color: "#8B5CF6", icon: ShoppingBag },
    { name: "Transport", value: 420, color: "#10B981", icon: Car },
    { name: "Entertainment", value: 497, color: "#F59E0B", icon: Film },
  ];

  // Spending heatmap data (6 weeks x 7 days)
  const generateHeatmapData = () => {
    const weeks = 6;
    const days = 7;
    const data = [];
    for (let week = 0; week < weeks; week++) {
      for (let day = 0; day < days; day++) {
        const amount = Math.random() * 200;
        data.push({ week, day, amount });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  const maxAmount = Math.max(...heatmapData.map(d => d.amount));

  const getHeatmapColor = (amount: number) => {
    const intensity = amount / maxAmount;
    if (intensity > 0.8) return "bg-[#4A8BFF]";
    if (intensity > 0.6) return "bg-[#4A8BFF]/80";
    if (intensity > 0.4) return "bg-[#4A8BFF]/60";
    if (intensity > 0.2) return "bg-[#4A8BFF]/40";
    return "bg-[#4A8BFF]/20";
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Analytics</h1>
        <p className="text-gray-400">Deep insights into your spending patterns</p>
      </div>

      {/* Insights Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-blue-500/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Monthly Trend</p>
                <p className="text-lg">Spending increased by <span className="text-blue-400 font-medium">18.5%</span> this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-purple-500/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Most Active Group</p>
                <p className="text-lg"><span className="text-purple-400 font-medium">Weekend Squad</span> with 24 expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-orange-500/10 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                <Utensils className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Top Category</p>
                <p className="text-lg">Most expensive: <span className="text-orange-400 font-medium">Food ($1,250)</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Spending Chart - 2 columns */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Monthly Spending Trend</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="w-3 h-3 mr-1" />
                +18.5%
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <defs>
                  <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A8BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4A8BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(39,39,55)" />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "rgb(20,20,28)",
                    border: "1px solid rgb(39,39,55)",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number) => [`$${value}`, "Spending"]}
                />
                <Line
                  type="monotone"
                  dataKey="spending"
                  stroke="#4A8BFF"
                  strokeWidth={3}
                  dot={{ fill: "#4A8BFF", r: 5 }}
                  activeDot={{ r: 7 }}
                  fill="url(#spendingGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution - 1 column */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle>Category Split</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "rgb(20,20,28)",
                    border: "1px solid rgb(39,39,55)",
                    borderRadius: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {categoryData.map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-[rgb(30,30,45)] transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cat.color + "20" }}>
                        <Icon className="w-4 h-4" style={{ color: cat.color }} />
                      </div>
                      <span className="text-sm">{cat.name}</span>
                    </div>
                    <span className="font-medium">${cat.value}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Heatmap */}
      <Card className="glass-card border-[rgb(39,39,55)] card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#4A8BFF]" />
            Spending Heatmap
          </CardTitle>
          <p className="text-sm text-gray-400">Daily spending intensity over the last 6 weeks</p>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6">
            {/* Day labels */}
            <div className="flex flex-col gap-1 text-xs text-gray-400 pt-6">
              <div className="h-3">Mon</div>
              <div className="h-3">Tue</div>
              <div className="h-3">Wed</div>
              <div className="h-3">Thu</div>
              <div className="h-3">Fri</div>
              <div className="h-3">Sat</div>
              <div className="h-3">Sun</div>
            </div>

            {/* Heatmap grid */}
            <div className="flex-1 overflow-x-auto">
              <div className="grid grid-flow-col gap-1" style={{ gridTemplateRows: "repeat(7, 1fr)" }}>
                {heatmapData.map((cell, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded ${getHeatmapColor(cell.amount)} hover:ring-2 hover:ring-[#4A8BFF] transition-all cursor-pointer`}
                    title={`$${cell.amount.toFixed(2)}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-6 text-xs text-gray-400">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded bg-[#4A8BFF]/20"></div>
              <div className="w-3 h-3 rounded bg-[#4A8BFF]/40"></div>
              <div className="w-3 h-3 rounded bg-[#4A8BFF]/60"></div>
              <div className="w-3 h-3 rounded bg-[#4A8BFF]/80"></div>
              <div className="w-3 h-3 rounded bg-[#4A8BFF]"></div>
            </div>
            <span>More</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
