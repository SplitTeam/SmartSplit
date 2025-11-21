import { Users, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function GroupOverview() {
  const groupMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      balance: 125.50,
      owes: false,
    },
    {
      id: 2,
      name: "Mike Davis",
      email: "mike@example.com",
      balance: -45.75,
      owes: true,
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma@example.com",
      balance: 89.25,
      owes: false,
    },
    {
      id: 4,
      name: "Tom Brown",
      email: "tom@example.com",
      balance: -168.50,
      owes: true,
    },
    {
      id: 5,
      name: "You (John Doe)",
      email: "john@example.com",
      balance: 342.25,
      owes: false,
    },
  ];

  const totalExpenses = 2847.50;
  const yourShare = 569.50;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl gradient-blue flex items-center justify-center glow-blue">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="mb-0">Weekend Trip Squad</h1>
              <p className="text-gray-400 text-sm">{groupMembers.length} members</p>
            </div>
          </div>
        </div>
        <Button className="gradient-blue glow-blue hover:opacity-90 transition-opacity px-6 py-6 rounded-xl">
          Settle Up
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-[rgb(39,39,55)]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-base">
              <span>Total Group Expenses</span>
              <TrendingUp className="w-4 h-4 text-[#3A8DFF]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">${totalExpenses.toFixed(2)}</div>
            <p className="text-sm text-gray-400">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)]">
          <CardHeader>
            <CardTitle className="text-base">Your Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">${yourShare.toFixed(2)}</div>
            <p className="text-sm text-gray-400">Of total expenses</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-[rgb(39,39,55)]">
          <CardHeader>
            <CardTitle className="text-base">You Are Owed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1 text-green-400">+$342.25</div>
            <p className="text-sm text-gray-400">From group members</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="glass-card border-[rgb(39,39,55)]">
        <CardHeader>
          <CardTitle>Member Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {groupMembers.map((member) => (
              <div
                key={member.id}
                className="relative overflow-hidden rounded-xl bg-[rgb(30,30,45)] p-5 border border-[rgb(39,39,55)] hover:border-[#3A8DFF]/30 transition-all"
              >
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3A8DFF] to-[#1A2A6C] flex items-center justify-center text-lg">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-lg">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.email}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      {member.owes ? (
                        <>
                          <ArrowDownRight className="w-5 h-5 text-red-400" />
                          <span className="text-2xl text-red-400">
                            ${Math.abs(member.balance).toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <>
                          <ArrowUpRight className="w-5 h-5 text-green-400" />
                          <span className="text-2xl text-green-400">
                            ${member.balance.toFixed(2)}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {member.owes ? "Owes" : "Gets back"}
                    </p>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[rgb(39,39,55)]">
                  <div
                    className={`h-full ${member.owes ? "bg-red-500" : "bg-gradient-to-r from-[#3A8DFF] to-[#1A2A6C]"}`}
                    style={{
                      width: `${Math.min((Math.abs(member.balance) / totalExpenses) * 100 * 5, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card border-[rgb(39,39,55)]">
        <CardHeader>
          <CardTitle>Suggested Settlements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[rgb(30,30,45)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span>M</span>
                </div>
                <div>
                  <p>Mike Davis</p>
                  <p className="text-sm text-gray-400">owes you</p>
                </div>
              </div>
              <div className="text-xl text-[#3A8DFF]">$45.75</div>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-xl bg-[rgb(30,30,45)]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span>T</span>
                </div>
                <div>
                  <p>Tom Brown</p>
                  <p className="text-sm text-gray-400">owes you</p>
                </div>
              </div>
              <div className="text-xl text-[#3A8DFF]">$168.50</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
