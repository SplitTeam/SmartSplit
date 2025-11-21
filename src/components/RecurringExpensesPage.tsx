import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Repeat, Edit, Tv, Music, Dumbbell, Zap, Calendar, DollarSign, Plus, Coffee } from "lucide-react";

interface RecurringExpense {
  id: number;
  name: string;
  amount: number;
  frequency: string;
  nextDate: string;
  enabled: boolean;
  icon: string;
  category: string;
}

export function RecurringExpensesPage() {
  const [expenses, setExpenses] = useState<RecurringExpense[]>([
    {
      id: 1,
      name: "Netflix Premium",
      amount: 15.99,
      frequency: "Monthly",
      nextDate: "Dec 1, 2025",
      enabled: true,
      icon: "netflix",
      category: "Entertainment",
    },
    {
      id: 2,
      name: "Spotify Family",
      amount: 16.99,
      frequency: "Monthly",
      nextDate: "Nov 28, 2025",
      enabled: true,
      icon: "music",
      category: "Entertainment",
    },
    {
      id: 3,
      name: "Gym Membership",
      amount: 49.99,
      frequency: "Monthly",
      nextDate: "Dec 5, 2025",
      enabled: true,
      icon: "gym",
      category: "Health",
    },
    {
      id: 4,
      name: "Internet Bill",
      amount: 59.99,
      frequency: "Monthly",
      nextDate: "Nov 30, 2025",
      enabled: true,
      icon: "zap",
      category: "Utilities",
    },
    {
      id: 5,
      name: "Weekly Coffee",
      amount: 25.00,
      frequency: "Weekly",
      nextDate: "Nov 25, 2025",
      enabled: false,
      icon: "coffee",
      category: "Food",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleExpense = (id: number) => {
    setExpenses(expenses.map(exp => 
      exp.id === id ? { ...exp, enabled: !exp.enabled } : exp
    ));
  };

  const getIcon = (iconName: string) => {
    const icons: Record<string, JSX.Element> = {
      netflix: <Tv className="w-5 h-5" />,
      music: <Music className="w-5 h-5" />,
      gym: <Dumbbell className="w-5 h-5" />,
      zap: <Zap className="w-5 h-5" />,
      coffee: <DollarSign className="w-5 h-5" />,
    };
    return icons[iconName] || <Repeat className="w-5 h-5" />;
  };

  const getFrequencyColor = (frequency: string) => {
    if (frequency === "Weekly") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (frequency === "Monthly") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    return "bg-purple-500/20 text-purple-400 border-purple-500/30";
  };

  const totalMonthly = expenses
    .filter(e => e.enabled)
    .reduce((sum, exp) => {
      const multiplier = exp.frequency === "Weekly" ? 4 : 1;
      return sum + (exp.amount * multiplier);
    }, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Recurring Payments</h1>
          <p className="text-gray-400">Manage your subscription and recurring expenses</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C] hover:shadow-lg hover:shadow-[#4A8BFF]/30 transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Add Recurring Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
            <DialogHeader>
              <DialogTitle>Add Recurring Expense</DialogTitle>
              <DialogDescription className="text-gray-400">
                Set up a new recurring payment or subscription
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="expense-name">Expense Name</Label>
                <Input
                  id="expense-name"
                  placeholder="e.g., Netflix, Gym Membership"
                  className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select>
                    <SelectTrigger className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2">
                    <SelectValue placeholder="Select category..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="health">Health & Fitness</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsModalOpen(false)} className="border-[rgb(39,39,55)]">
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C]">
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">Total Monthly</p>
            <p className="text-3xl text-[#4A8BFF] number-glow">${totalMonthly.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">Active Subscriptions</p>
            <p className="text-3xl">{expenses.filter(e => e.enabled).length}</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">Next Payment</p>
            <p className="text-lg">Nov 25, 2025</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">Yearly Cost</p>
            <p className="text-3xl">${(totalMonthly * 12).toFixed(0)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Recurring Expenses List */}
      <Card className="glass-card border-[rgb(39,39,55)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Repeat className="w-5 h-5 text-[#4A8BFF]" />
            Your Recurring Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className={`p-4 rounded-2xl border transition-all card-hover ${
                  expense.enabled
                    ? "bg-[rgb(30,30,45)] border-transparent hover:border-[#4A8BFF]/30"
                    : "bg-[rgb(25,25,35)] border-gray-700 opacity-60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      expense.enabled 
                        ? "bg-gradient-to-br from-[#4A8BFF]/20 to-[#1A2A6C]/20 text-[#4A8BFF]"
                        : "bg-gray-700 text-gray-500"
                    }`}>
                      {getIcon(expense.icon)}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{expense.name}</p>
                        <Badge className={getFrequencyColor(expense.frequency)}>
                          {expense.frequency}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Next: {expense.nextDate}
                        </span>
                        <span>•</span>
                        <span>{expense.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amount and Controls */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xl">${expense.amount.toFixed(2)}</p>
                      {expense.frequency === "Weekly" && (
                        <p className="text-xs text-gray-500">${(expense.amount * 4).toFixed(2)}/mo</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-[rgb(35,35,50)]"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      
                      <Switch
                        checked={expense.enabled}
                        onCheckedChange={() => toggleExpense(expense.id)}
                        className="data-[state=checked]:bg-[#4A8BFF]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}