import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkles, Lightbulb, TrendingUp, Users, Target, ArrowRight, PiggyBank, AlertCircle } from "lucide-react";

export function RecommendationsPage() {
  const savingTips = [
    {
      title: "Reduce Restaurant Spending",
      description: "You spent $450 on dining out this month. Cooking at home 2 more times per week could save you $180/month.",
      potential: "$180",
      difficulty: "Easy",
      icon: PiggyBank,
      color: "green",
    },
    {
      title: "Switch to Annual Subscriptions",
      description: "Converting 3 monthly subscriptions to annual billing could save you $85 per year.",
      potential: "$85",
      difficulty: "Easy",
      icon: Target,
      color: "blue",
    },
    {
      title: "Optimize Transport Costs",
      description: "Carpooling for your weekly commute could reduce transport expenses by 40%.",
      potential: "$65",
      difficulty: "Medium",
      icon: AlertCircle,
      color: "orange",
    },
  ];

  const expensePatterns = [
    {
      pattern: "Weekend Dining",
      frequency: "Every weekend",
      avgAmount: "$125",
      trend: "+12%",
      insight: "You consistently spend on restaurants every Friday and Saturday. Consider meal planning for weekends.",
    },
    {
      pattern: "Monthly Subscriptions",
      frequency: "Monthly",
      avgAmount: "$89",
      trend: "+5%",
      insight: "Three subscriptions renewed automatically. Review if you're actively using all services.",
    },
    {
      pattern: "Mid-Week Entertainment",
      frequency: "2-3x per week",
      avgAmount: "$45",
      trend: "+8%",
      insight: "Movie tickets and streaming rentals spike on Wednesdays. Look for discount days.",
    },
  ];

  const frequentSplits = [
    { name: "Sarah", count: 24, amount: "$1,245", category: "Restaurant", avatar: "S" },
    { name: "Mike", count: 18, amount: "$876", category: "Entertainment", avatar: "M" },
    { name: "Emma", count: 15, amount: "$654", category: "Shopping", avatar: "E" },
    { name: "Jake", count: 12, amount: "$432", category: "Transport", avatar: "J" },
  ];

  const growingCategories = [
    { name: "Food & Dining", growth: "+28%", amount: "$1,250", color: "#4A8BFF" },
    { name: "Entertainment", growth: "+18%", amount: "$497", color: "#8B5CF6" },
    { name: "Shopping", growth: "+12%", amount: "$680", color: "#10B981" },
  ];

  const groupSuggestions = [
    {
      title: "Merge 'Roommates' and 'Apartment Bills'",
      reason: "Same 4 members, similar expense types",
      benefit: "Easier tracking, fewer notifications",
      members: ["You", "Sarah", "Mike", "Emma"],
    },
    {
      title: "Create 'Weekend Squad' Sub-group",
      reason: "5 people consistently split weekend activities",
      benefit: "Streamlined weekend expense management",
      members: ["You", "Sarah", "Jake", "Lisa", "Tom"],
    },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 flex items-center gap-3">
          <span>Smart Recommendations</span>
          <Badge className="bg-gradient-to-r from-[#4A8BFF] to-[#8B5CF6] border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Insights
          </Badge>
        </h1>
        <p className="text-gray-400">Personalized tips to optimize your spending and splitting</p>
      </div>

      {/* Money-Saving Tips */}
      <div>
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          Money-Saving Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savingTips.map((tip, index) => (
            <Card
              key={index}
              className={`glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-${tip.color}-500/10 to-transparent`}
            >
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-${tip.color}-500/20 flex items-center justify-center`}>
                    <tip.icon className={`w-6 h-6 text-${tip.color}-400`} />
                  </div>
                  <Badge className={`bg-${tip.color}-500/20 text-${tip.color}-400 border-${tip.color}-500/30`}>
                    Save {tip.potential}
                  </Badge>
                </div>
                
                <div>
                  <h3 className="text-lg mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-400">{tip.description}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="border-[rgb(39,39,55)]">
                    {tip.difficulty}
                  </Badge>
                  <Button variant="ghost" size="sm" className="text-[#4A8BFF] hover:bg-[rgb(30,30,45)]">
                    Learn More
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Expense Patterns */}
      <div>
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#4A8BFF]" />
          Your Top Expense Patterns
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {expensePatterns.map((pattern, index) => (
            <Card key={index} className="glass-card border-[rgb(39,39,55)] card-hover">
              <CardContent className="pt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{pattern.pattern}</h3>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {pattern.trend}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">{pattern.frequency}</span>
                  <span className="text-gray-600">•</span>
                  <span className="text-[#4A8BFF]">{pattern.avgAmount} avg</span>
                </div>

                <p className="text-sm text-gray-400 pt-2 border-t border-[rgb(39,39,55)]">
                  {pattern.insight}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Frequent Split Partners & Growing Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Frequent Split Partners */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#4A8BFF]" />
              People You Frequently Split With
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {frequentSplits.map((person, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-xl bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] transition-all cursor-pointer border border-transparent hover:border-[#4A8BFF]/30"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C] flex items-center justify-center">
                    <span className="text-sm">{person.avatar}</span>
                  </div>
                  <div>
                    <p className="font-medium">{person.name}</p>
                    <p className="text-xs text-gray-400">{person.count} expenses • {person.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{person.amount}</p>
                  <p className="text-xs text-gray-500">total split</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Growing Categories */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4A8BFF]" />
              Categories Growing Fast
            </CardTitle>
            <p className="text-sm text-gray-400">Monitor these trending expenses</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {growingCategories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      {category.growth}
                    </Badge>
                    <span className="text-sm">{category.amount}</span>
                  </div>
                </div>
                <div className="w-full bg-[rgb(20,20,28)] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${75 - index * 15}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Group Consolidation Suggestions */}
      <div>
        <h2 className="text-xl mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-400" />
          Suggested Group Consolidation
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groupSuggestions.map((suggestion, index) => (
            <Card
              key={index}
              className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30"
            >
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-gray-400">{suggestion.reason}</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[rgb(30,30,45)] border border-purple-500/20">
                  <p className="text-xs text-gray-400 mb-2">Benefit:</p>
                  <p className="text-sm text-purple-400">{suggestion.benefit}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-2">Members ({suggestion.members.length}):</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    {suggestion.members.map((member, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="border-[rgb(39,39,55)] bg-[rgb(30,30,45)]"
                      >
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  Apply Suggestion
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
