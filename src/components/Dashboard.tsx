import { TrendingUp, TrendingDown, DollarSign, Users, Calendar, ArrowRight, Utensils, Film, ShoppingBag, Car, Hash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const recentActivities = [
    {
      id: 1,
      title: "Dinner at Restaurant",
      amount: 125.50,
      paidBy: "Sarah",
      date: "2 hours ago",
      participants: 4,
      category: "restaurant",
      tags: ["food", "social"],
      status: "settled",
    },
    {
      id: 2,
      title: "Movie Tickets",
      amount: 48.00,
      paidBy: "You",
      date: "Yesterday",
      participants: 3,
      category: "entertainment",
      tags: ["fun", "weekend"],
      status: "you-paid",
    },
    {
      id: 3,
      title: "Grocery Shopping",
      amount: 86.25,
      paidBy: "Mike",
      date: "2 days ago",
      participants: 5,
      category: "shopping",
      tags: ["food", "essentials"],
      status: "pending",
    },
    {
      id: 4,
      title: "Uber Ride",
      amount: 24.50,
      paidBy: "Emma",
      date: "3 days ago",
      participants: 2,
      category: "transport",
      tags: ["travel"],
      status: "settled",
    },
  ];

  // Category data for pie chart
  const categoryData = [
    { name: "Restaurant", value: 450, color: "#4A8BFF" },
    { name: "Shopping", value: 280, color: "#8B5CF6" },
    { name: "Transport", value: 180, color: "#10B981" },
    { name: "Entertainment", value: 220, color: "#F59E0B" },
  ];

  // Monthly spending data for line chart
  const monthlyData = [
    { month: "Jan", amount: 2400 },
    { month: "Feb", amount: 2210 },
    { month: "Mar", amount: 2800 },
    { month: "Apr", amount: 2650 },
    { month: "May", amount: 3100 },
    { month: "Jun", amount: 2847 },
  ];

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, JSX.Element> = {
      restaurant: <Utensils className="w-5 h-5" />,
      entertainment: <Film className="w-5 h-5" />,
      shopping: <ShoppingBag className="w-5 h-5" />,
      transport: <Car className="w-5 h-5" />,
    };
    return icons[category] || <DollarSign className="w-5 h-5" />;
  };

  const getStatusBadge = (status: string, paidBy: string) => {
    if (status === "you-paid") {
      return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">You paid</Badge>;
    } else if (status === "pending") {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    } else {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid by {paidBy}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your expenses and balances</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="gradient-blue-animated border-0 glow-blue card-hover overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Total Expenses</span>
              <DollarSign className="w-5 h-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-2 number-glow">$2,847.50</div>
            <div className="flex items-center gap-2 text-sm text-blue-100">
              <TrendingUp className="w-4 h-4" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Balance</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-2 text-green-400 number-glow" style={{ textShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}>+$342.25</div>
            <p className="text-sm text-gray-400">You are owed</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Active Groups</span>
              <Users className="w-5 h-5 text-[#4A8BFF]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-2">8</div>
            <p className="text-sm text-gray-400">Groups you're part of</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <Card className="glass-card border-[rgb(39,39,55)] lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activity</span>
              <button 
                onClick={() => onNavigate("expenses")}
                className="text-sm text-[#4A8BFF] hover:underline flex items-center gap-1 transition-all hover:gap-2"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] transition-all cursor-pointer border border-transparent hover:border-[#4A8BFF]/30 card-hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4A8BFF]/20 to-[#1A2A6C]/20 flex items-center justify-center text-[#4A8BFF]">
                      {getCategoryIcon(activity.category)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{activity.title}</p>
                        {getStatusBadge(activity.status, activity.paidBy)}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {activity.participants} people
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {activity.date}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {activity.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#4A8BFF]/10 text-[#4A8BFF] text-xs"
                          >
                            <Hash className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl">${activity.amount.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Charts - Takes 1 column */}
        <div className="space-y-6">
          {/* Category Distribution Pie Chart */}
          <Card className="glass-card border-[rgb(39,39,55)] card-hover">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(20,20,28)",
                      border: "1px solid rgb(39,39,55)",
                      borderRadius: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {categoryData.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-gray-400 text-xs">{cat.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend Line Chart */}
          <Card className="glass-card border-[rgb(39,39,55)] card-hover">
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgb(39,39,55)" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(20,20,28)",
                      border: "1px solid rgb(39,39,55)",
                      borderRadius: "12px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#4A8BFF"
                    strokeWidth={3}
                    dot={{ fill: "#4A8BFF", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}