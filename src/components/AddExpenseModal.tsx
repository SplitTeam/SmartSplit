import { useState } from "react";
import { X, DollarSign, Tag, Calendar as CalendarIcon, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

interface AddExpenseModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddExpenseModal({ open, onClose }: AddExpenseModalProps) {
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(["1"]);

  const participants = [
    { id: "1", name: "You", email: "john@example.com" },
    { id: "2", name: "Sarah Johnson", email: "sarah@example.com" },
    { id: "3", name: "Mike Davis", email: "mike@example.com" },
    { id: "4", name: "Emma Wilson", email: "emma@example.com" },
    { id: "5", name: "Tom Brown", email: "tom@example.com" },
  ];

  const toggleParticipant = (id: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            Add New Expense
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2 text-gray-300">
                <DollarSign className="w-4 h-4" />
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white placeholder-gray-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2 text-gray-300">
                <Tag className="w-4 h-4" />
                Category
              </Label>
              <Select>
                <SelectTrigger className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white">
                  <SelectItem value="food">Food & Dining</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="accommodation">Accommodation</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">
              Description
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="What was this expense for?"
              className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white placeholder-gray-500"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2 text-gray-300">
                <CalendarIcon className="w-4 h-4" />
                Date
              </Label>
              <Input
                id="date"
                type="date"
                defaultValue="2025-11-14"
                className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paidBy" className="text-gray-300">
                Paid By
              </Label>
              <Select defaultValue="1">
                <SelectTrigger className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white">
                  <SelectValue placeholder="Who paid?" />
                </SelectTrigger>
                <SelectContent className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white">
                  {participants.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-gray-300">
              <Users className="w-4 h-4" />
              Participants ({selectedParticipants.length} selected)
            </Label>
            <div className="glass-card rounded-xl p-4 space-y-3 max-h-64 overflow-y-auto">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3A8DFF] to-[#1A2A6C] flex items-center justify-center">
                      {participant.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-400">{participant.email}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedParticipants.includes(participant.id)}
                    onCheckedChange={() => toggleParticipant(participant.id)}
                    className="border-[rgb(39,39,55)]"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Split Amount:</span>
              <span className="text-xl">$0.00 per person</span>
            </div>
            <p className="text-sm text-gray-500">
              Each person pays an equal share of the total amount
            </p>
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-[rgb(39,39,55)] bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] text-white py-6 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 gradient-blue glow-blue hover:opacity-90 transition-opacity py-6 rounded-xl"
            >
              Add Expense
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
