import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Trophy, Target, Users, TrendingUp, Zap, Star, Award, Crown, Lock } from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedDate?: string;
}

export function AchievementsPage() {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Create your first expense",
      icon: Target,
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      rarity: "common",
      unlockedDate: "Nov 1, 2025",
    },
    {
      id: 2,
      title: "Expense Tracker",
      description: "Add 10 expenses",
      icon: TrendingUp,
      unlocked: true,
      progress: 10,
      maxProgress: 10,
      rarity: "common",
      unlockedDate: "Nov 5, 2025",
    },
    {
      id: 3,
      title: "Debt-Free Champion",
      description: "Maintain positive balance for 30 days",
      icon: Trophy,
      unlocked: true,
      progress: 30,
      maxProgress: 30,
      rarity: "rare",
      unlockedDate: "Nov 15, 2025",
    },
    {
      id: 4,
      title: "Group Leader",
      description: "Create and manage 5 groups",
      icon: Crown,
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      rarity: "epic",
      unlockedDate: "Nov 18, 2025",
    },
    {
      id: 5,
      title: "Top Splitter",
      description: "Split 50 expenses with friends",
      icon: Users,
      unlocked: false,
      progress: 38,
      maxProgress: 50,
      rarity: "rare",
    },
    {
      id: 6,
      title: "Speed Settler",
      description: "Settle 5 debts within 24 hours",
      icon: Zap,
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      rarity: "rare",
    },
    {
      id: 7,
      title: "Century Club",
      description: "Track 100 total expenses",
      icon: Star,
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      rarity: "epic",
    },
    {
      id: 8,
      title: "Budget Master",
      description: "Stay under budget for 3 consecutive months",
      icon: Award,
      unlocked: false,
      progress: 1,
      maxProgress: 3,
      rarity: "epic",
    },
    {
      id: 9,
      title: "Social Butterfly",
      description: "Split expenses with 20 different people",
      icon: Users,
      unlocked: false,
      progress: 12,
      maxProgress: 20,
      rarity: "rare",
    },
    {
      id: 10,
      title: "Legendary Splitter",
      description: "Achieve 1000 total splits",
      icon: Crown,
      unlocked: false,
      progress: 245,
      maxProgress: 1000,
      rarity: "legendary",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return { bg: "from-gray-500/20 to-gray-700/20", text: "text-gray-400", border: "border-gray-500/30", badge: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
      case "rare":
        return { bg: "from-blue-500/20 to-blue-700/20", text: "text-blue-400", border: "border-blue-500/30", badge: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
      case "epic":
        return { bg: "from-purple-500/20 to-purple-700/20", text: "text-purple-400", border: "border-purple-500/30", badge: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
      case "legendary":
        return { bg: "from-orange-500/20 to-yellow-500/20", text: "text-orange-400", border: "border-orange-500/30", badge: "bg-orange-500/20 text-orange-400 border-orange-500/30" };
      default:
        return { bg: "from-gray-500/20 to-gray-700/20", text: "text-gray-400", border: "border-gray-500/30", badge: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => {
    const points = a.rarity === "legendary" ? 100 : a.rarity === "epic" ? 50 : a.rarity === "rare" ? 25 : 10;
    return sum + points;
  }, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 flex items-center gap-3">
          <Trophy className="w-8 h-8 text-[#4A8BFF]" />
          Achievements
        </h1>
        <p className="text-gray-400">Track your progress and unlock rewards</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-[#4A8BFF]/10 to-transparent">
          <CardContent className="pt-6 text-center">
            <Trophy className="w-8 h-8 text-[#4A8BFF] mx-auto mb-2" />
            <p className="text-3xl mb-1">{unlockedCount}</p>
            <p className="text-sm text-gray-400">Unlocked</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6 text-center">
            <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-3xl mb-1">{achievements.length - unlockedCount}</p>
            <p className="text-sm text-gray-400">Remaining</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-purple-500/10 to-transparent">
          <CardContent className="pt-6 text-center">
            <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <p className="text-3xl mb-1">{totalPoints}</p>
            <p className="text-sm text-gray-400">Total Points</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6 text-center">
            <Award className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <p className="text-3xl mb-1">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
            <p className="text-sm text-gray-400">Completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const colors = getRarityColor(achievement.rarity);
          const progressPercent = (achievement.progress / achievement.maxProgress) * 100;

          return (
            <Card
              key={achievement.id}
              className={`glass-card border-[rgb(39,39,55)] transition-all duration-300 relative overflow-hidden ${
                achievement.unlocked
                  ? `card-hover bg-gradient-to-br ${colors.bg} ${colors.border} shadow-lg`
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              {/* Glow effect for unlocked achievements */}
              {achievement.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#4A8BFF]/5 to-transparent pointer-events-none" />
              )}

              <CardContent className="pt-6 relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      achievement.unlocked
                        ? `bg-gradient-to-br ${colors.bg} ${colors.border} border-2 shadow-lg`
                        : "bg-gray-700/50 border-2 border-gray-600"
                    }`}
                  >
                    {achievement.unlocked ? (
                      <Icon className={`w-7 h-7 ${colors.text}`} />
                    ) : (
                      <Lock className="w-7 h-7 text-gray-500" />
                    )}
                  </div>

                  <Badge className={colors.badge}>
                    {achievement.rarity}
                  </Badge>
                </div>

                <div>
                  <h3 className={`mb-1 ${achievement.unlocked ? "" : "text-gray-400"}`}>
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Unlocked {achievement.unlockedDate}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Progress</span>
                        <span className="text-[#4A8BFF]">
                          {achievement.progress} / {achievement.maxProgress}
                        </span>
                      </div>
                      <Progress value={progressPercent} className="h-2 bg-[rgb(30,30,45)]" />
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Unlock animation overlay */}
              {achievement.unlocked && (
                <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
                  <Star className={`w-full h-full ${colors.text} animate-pulse`} />
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Rarity Legend */}
      <Card className="glass-card border-[rgb(39,39,55)]">
        <CardContent className="pt-6">
          <h3 className="mb-4">Rarity Guide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span className="text-sm">Common (10 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Rare (25 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-sm">Epic (50 pts)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-sm">Legendary (100 pts)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Import CheckCircle component
import { CheckCircle } from "lucide-react";
