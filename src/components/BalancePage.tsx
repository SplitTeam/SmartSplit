import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { TrendingUp, TrendingDown, Sparkles, DollarSign, ArrowRight, Calculator } from "lucide-react";
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
  Legend,
} from "recharts";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function BalancePage() {
  const [selectedPerson, setSelectedPerson] = useState<string>("");
  const [settleAmount, setSettleAmount] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Net Position Timeline Data
  const timelineData = [
    { date: "Jan 1", balance: 150 },
    { date: "Jan 8", balance: -80 },
    { date: "Jan 15", balance: 45 },
    { date: "Jan 22", balance: 180 },
    { date: "Jan 29", balance: 220 },
    { date: "Feb 5", balance: 95 },
    { date: "Feb 12", balance: 310 },
    { date: "Feb 19", balance: 342 },
  ];

  // People in debt network
  const people = [
    { name: "Sarah", balance: 125.50, angle: 0, color: "#10B981" }, // owes you
    { name: "Mike", balance: -45.30, angle: 60, color: "#EF4444" }, // you owe
    { name: "Emma", balance: 89.75, angle: 120, color: "#10B981" },
    { name: "Jake", balance: -28.00, angle: 180, color: "#EF4444" },
    { name: "Lisa", balance: 142.80, angle: 240, color: "#10B981" },
    { name: "Tom", balance: 57.50, angle: 300, color: "#10B981" },
  ];

  // Category Impact Data
  const categoryImpactData = [
    { name: "Restaurant", impact: -125, color: "#4A8BFF" },
    { name: "Shopping", impact: -86, color: "#8B5CF6" },
    { name: "Transport", impact: -24, color: "#10B981" },
    { name: "Entertainment", impact: -48, color: "#F59E0B" },
    { name: "Utilities", impact: -65, color: "#EC4899" },
  ];

  const currentBalance = 342.25;
  const calculateNewBalance = () => {
    if (!selectedPerson || !settleAmount) return currentBalance;
    const person = people.find(p => p.name === selectedPerson);
    if (!person) return currentBalance;
    
    const amount = parseFloat(settleAmount);
    if (isNaN(amount)) return currentBalance;
    
    // If they owe you (positive balance), settling reduces your balance
    // If you owe them (negative balance), settling increases your balance
    return currentBalance - (person.balance > 0 ? amount : -amount);
  };

  // Draw Debt Network Graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 120;
    const nodeRadius = 30;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    people.forEach((person) => {
      const angleRad = (person.angle * Math.PI) / 180;
      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY + radius * Math.sin(angleRad);

      // Draw glowing line
      ctx.save();
      ctx.shadowBlur = 15;
      ctx.shadowColor = person.color;
      ctx.strokeStyle = person.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.restore();

      // Draw outer node circle
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = person.color;
      ctx.fillStyle = person.color + "20";
      ctx.strokeStyle = person.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Draw person initials
      ctx.fillStyle = "#fff";
      ctx.font = "14px Inter";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(person.name.substring(0, 2).toUpperCase(), x, y);

      // Draw amount
      ctx.font = "11px Inter";
      ctx.fillStyle = person.color;
      ctx.fillText(`$${Math.abs(person.balance).toFixed(0)}`, x, y + nodeRadius + 15);
    });

    // Draw center node (user)
    ctx.save();
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#4A8BFF";
    
    // Gradient for center
    const gradient = ctx.createLinearGradient(centerX - 40, centerY - 40, centerX + 40, centerY + 40);
    gradient.addColorStop(0, "#4A8BFF");
    gradient.addColorStop(1, "#1A2A6C");
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Draw "YOU" text
    ctx.fillStyle = "#fff";
    ctx.font = "bold 16px Inter";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("YOU", centerX, centerY);
  }, [people]);

  const newBalance = calculateNewBalance();
  const balanceChange = newBalance - currentBalance;

  return (
    <TooltipProvider>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="mb-2">Balance Analysis</h1>
          <p className="text-gray-400">Track your financial position and relationships</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="glass-card border-[rgb(39,39,55)] card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Net Balance</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-3xl text-green-400 number-glow" style={{ textShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}>
                    +${currentBalance.toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your total net position across all groups</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="glass-card border-[rgb(39,39,55)] card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">You Are Owed</span>
                    <ArrowRight className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-3xl text-blue-400">$445.55</div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total amount others owe you</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="glass-card border-[rgb(39,39,55)] card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">You Owe</span>
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="text-3xl text-red-400">$103.30</div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total amount you owe to others</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="glass-card border-[rgb(39,39,55)] card-hover">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Relationships</span>
                    <span className="text-[#4A8BFF]">6</span>
                  </div>
                  <div className="text-3xl">4 <span className="text-xl text-gray-500">/ 2</span></div>
                  <p className="text-xs text-gray-500 mt-1">positive / negative</p>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your debt relationships breakdown</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Net Position Timeline */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>Net Position Timeline</span>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+15.6%</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <defs>
                  <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4A8BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4A8BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgb(39,39,55)" />
                <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: "rgb(20,20,28)",
                    border: "1px solid rgb(39,39,55)",
                    borderRadius: "12px",
                  }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, "Balance"]}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#4A8BFF"
                  strokeWidth={3}
                  dot={{ fill: "#4A8BFF", r: 5, strokeWidth: 2, stroke: "#1A2A6C" }}
                  activeDot={{ r: 7 }}
                  fill="url(#balanceGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Middle Row - Debt Network and Settle Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Debt Network Graph */}
          <Card className="glass-card border-[rgb(39,39,55)] card-hover">
            <CardHeader>
              <CardTitle>Debt Network</CardTitle>
              <p className="text-sm text-gray-400">Your financial relationships</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                className="max-w-full"
              />
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-400">They owe you</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-400">You owe them</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Settle Simulation */}
          <div className="space-y-6">
            <Card className="glass-card border-[rgb(39,39,55)] card-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#4A8BFF]" />
                  Settle Simulation
                </CardTitle>
                <p className="text-sm text-gray-400">Preview balance changes</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Select Person</label>
                  <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                    <SelectTrigger className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)]">
                      <SelectValue placeholder="Choose a person..." />
                    </SelectTrigger>
                    <SelectContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
                      {people.map((person) => (
                        <SelectItem key={person.name} value={person.name}>
                          <div className="flex items-center justify-between w-full">
                            <span>{person.name}</span>
                            <span className={person.balance > 0 ? "text-green-400" : "text-red-400"}>
                              {person.balance > 0 ? "+" : ""}${person.balance.toFixed(2)}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Amount to Settle</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={settleAmount}
                      onChange={(e) => setSettleAmount(e.target.value)}
                      className="pl-10 bg-[rgb(30,30,45)] border-[rgb(39,39,55)]"
                    />
                  </div>
                </div>

                {selectedPerson && settleAmount && (
                  <div className="mt-6 p-4 rounded-xl bg-[rgb(30,30,45)] border border-[#4A8BFF]/30">
                    <div className="text-sm text-gray-400 mb-3">Preview</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Current Balance</span>
                        <span className="text-green-400">${currentBalance.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Settlement</span>
                        <span className={balanceChange > 0 ? "text-green-400" : "text-red-400"}>
                          {balanceChange > 0 ? "+" : ""}${balanceChange.toFixed(2)}
                        </span>
                      </div>
                      <div className="h-px bg-[rgb(39,39,55)] my-2"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">New Balance</span>
                        <span className={`text-xl ${newBalance >= 0 ? "text-green-400" : "text-red-400"} number-glow`}>
                          {newBalance >= 0 ? "+" : ""}${newBalance.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Balance Insights */}
            <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-[#4A8BFF]/10 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#4A8BFF]" />
                  Balance Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm">Your net balance increased by <span className="text-green-400 font-medium">12%</span> in the last 30 days.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm">You have <span className="text-blue-400 font-medium">4 positive</span> relationships. Keep tracking expenses to maintain this!</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm">Restaurant expenses contributed <span className="text-purple-400 font-medium">-$125</span> to your balance this month.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Category Impact Chart */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle>Category Impact on Balance</CardTitle>
            <p className="text-sm text-gray-400">How each category affects your financial position</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <ResponsiveContainer width={300} height={300}>
                  <PieChart>
                    <defs>
                      {categoryImpactData.map((entry, index) => (
                        <filter key={index} id={`shadow-${index}`}>
                          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={entry.color} floodOpacity="0.5" />
                        </filter>
                      ))}
                    </defs>
                    <Pie
                      data={categoryImpactData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="impact"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {categoryImpactData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          filter={`url(#shadow-${index})`}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "rgb(20,20,28)",
                        border: "1px solid rgb(39,39,55)",
                        borderRadius: "12px",
                      }}
                      formatter={(value: number) => [`$${Math.abs(value).toFixed(2)}`, "Impact"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {categoryImpactData.map((category) => (
                  <div
                    key={category.name}
                    className="p-4 rounded-xl bg-[rgb(30,30,45)] border border-transparent hover:border-[#4A8BFF]/30 transition-all card-hover"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        ${Math.abs(category.impact)}
                      </Badge>
                    </div>
                    <div className="w-full bg-[rgb(20,20,28)] rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(Math.abs(category.impact) / 125) * 100}%`,
                          backgroundColor: category.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}
