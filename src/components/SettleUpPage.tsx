import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { CheckCircle, XCircle, Clock, DollarSign, Upload, CreditCard, Building, Wallet, ArrowRight, User } from "lucide-react";

interface Settlement {
  id: number;
  person: string;
  amount: number;
  type: "owe" | "owed";
  status: "pending" | "approved" | "rejected";
  method?: string;
  date?: string;
  proof?: string;
}

export function SettleUpPage() {
  const [settlements, setSettlements] = useState<Settlement[]>([
    { id: 1, person: "Sarah", amount: 125.50, type: "owed", status: "pending" },
    { id: 2, person: "Mike", amount: 45.30, type: "owe", status: "pending" },
    { id: 3, person: "Emma", amount: 89.75, type: "owed", status: "approved", method: "Bank Transfer", date: "Nov 18, 2025" },
    { id: 4, person: "Jake", amount: 28.00, type: "owe", status: "pending" },
    { id: 5, person: "Lisa", amount: 142.80, type: "owed", status: "pending" },
  ]);

  const [isSettleModalOpen, setIsSettleModalOpen] = useState(false);
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);

  const openSettleModal = (settlement: Settlement) => {
    setSelectedSettlement(settlement);
    setIsSettleModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
    }
  };

  const pendingSettlements = settlements.filter(s => s.status === "pending");
  const totalOwed = settlements.filter(s => s.type === "owed" && s.status !== "rejected").reduce((sum, s) => sum + s.amount, 0);
  const totalOwe = settlements.filter(s => s.type === "owe" && s.status !== "rejected").reduce((sum, s) => sum + s.amount, 0);
  const netPosition = totalOwed - totalOwe;

  const settlementHistory = [
    { person: "Emma", amount: 89.75, method: "Bank Transfer", date: "Nov 18, 2025", status: "approved" },
    { person: "Tom", amount: 65.00, method: "Cash", date: "Nov 15, 2025", status: "approved" },
    { person: "Sarah", amount: 45.50, method: "Revolut", date: "Nov 12, 2025", status: "approved" },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2">Settle Up</h1>
        <p className="text-gray-400">Manage your settlements and payment confirmations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">You Are Owed</p>
            <p className="text-3xl text-green-400 number-glow" style={{ textShadow: "0 0 20px rgba(16, 185, 129, 0.5)" }}>
              ${totalOwed.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">You Owe</p>
            <p className="text-3xl text-red-400">${totalOwe.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-[#4A8BFF]/10 to-transparent">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">Net Position</p>
            <p className={`text-3xl ${netPosition >= 0 ? "text-green-400" : "text-red-400"}`}>
              {netPosition >= 0 ? "+" : ""}${netPosition.toFixed(2)}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardContent className="pt-6">
            <p className="text-sm text-gray-400 mb-2">Pending Settlements</p>
            <p className="text-3xl">{pendingSettlements.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Settlements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* People Who Owe You */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <ArrowRight className="w-5 h-5" />
              People Who Owe You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {settlements.filter(s => s.type === "owed").map((settlement) => (
              <div
                key={settlement.id}
                className="p-4 rounded-2xl bg-[rgb(30,30,45)] border border-transparent hover:border-green-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500/20 to-green-700/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">{settlement.person}</p>
                      <p className="text-sm text-gray-400">owes you</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl text-green-400">${settlement.amount.toFixed(2)}</p>
                    {getStatusBadge(settlement.status)}
                  </div>
                </div>

                {settlement.status === "pending" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-green-500/30 text-green-400 hover:bg-green-500/10"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Received
                  </Button>
                )}

                {settlement.status === "approved" && settlement.method && (
                  <div className="text-sm text-gray-400">
                    Settled via {settlement.method} on {settlement.date}
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* People You Owe */}
        <Card className="glass-card border-[rgb(39,39,55)] card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <ArrowRight className="w-5 h-5 rotate-180" />
              People You Owe
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {settlements.filter(s => s.type === "owe").map((settlement) => (
              <div
                key={settlement.id}
                className="p-4 rounded-2xl bg-[rgb(30,30,45)] border border-transparent hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-red-700/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium">{settlement.person}</p>
                      <p className="text-sm text-gray-400">you owe</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl text-red-400">${settlement.amount.toFixed(2)}</p>
                    {getStatusBadge(settlement.status)}
                  </div>
                </div>

                {settlement.status === "pending" && (
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50"
                      onClick={() => openSettleModal(settlement)}
                    >
                      <Building className="w-4 h-4 mr-1" />
                      Bank
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50"
                      onClick={() => openSettleModal(settlement)}
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      Revolut
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50"
                      onClick={() => openSettleModal(settlement)}
                    >
                      <Wallet className="w-4 h-4 mr-1" />
                      Cash
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Settlement History Timeline */}
      <Card className="glass-card border-[rgb(39,39,55)] card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#4A8BFF]" />
            Settlement History
          </CardTitle>
          <p className="text-sm text-gray-400">Recent completed settlements</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settlementHistory.map((history, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium mb-1">Settled with {history.person}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <span>{history.method}</span>
                    <span>•</span>
                    <span>{history.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl">${history.amount.toFixed(2)}</p>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-1">
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settle Modal */}
      <Dialog open={isSettleModalOpen} onOpenChange={setIsSettleModalOpen}>
        <DialogContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
          <DialogHeader>
            <DialogTitle>Settle Payment</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedSettlement && `Settle $${selectedSettlement.amount.toFixed(2)} with ${selectedSettlement.person}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="payment-method">Payment Method</Label>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <Button variant="outline" className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50">
                  <Building className="w-4 h-4 mr-2" />
                  Bank
                </Button>
                <Button variant="outline" className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Revolut
                </Button>
                <Button variant="outline" className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50">
                  <Wallet className="w-4 h-4 mr-2" />
                  Cash
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="reference">Transaction Reference (Optional)</Label>
              <Input
                id="reference"
                placeholder="e.g., TXN123456"
                className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2"
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this settlement..."
                className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2"
                rows={3}
              />
            </div>

            <div>
              <Label>Upload Proof (Optional)</Label>
              <div className="mt-2 border-2 border-dashed border-[rgb(39,39,55)] rounded-xl p-6 text-center hover:border-[#4A8BFF]/50 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">Click to upload screenshot or receipt</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettleModalOpen(false)} className="border-[rgb(39,39,55)]">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C]">
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Settlement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
