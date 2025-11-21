import { useState } from "react";
import { Plus, Filter, Calendar, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

interface ExpensesPageProps {
  onAddExpense: () => void;
}

export function ExpensesPage({ onAddExpense }: ExpensesPageProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  
  const expenses = [
    {
      id: 1,
      amount: 125.50,
      category: "Food",
      description: "Dinner at Restaurant",
      paidBy: "Sarah Johnson",
      participants: ["You", "Sarah", "Mike", "Emma"],
      date: "Nov 14, 2025",
    },
    {
      id: 2,
      amount: 48.00,
      category: "Entertainment",
      description: "Movie Tickets",
      paidBy: "You",
      participants: ["You", "Sarah", "Mike"],
      date: "Nov 13, 2025",
    },
    {
      id: 3,
      amount: 86.25,
      category: "Groceries",
      description: "Weekly Shopping",
      paidBy: "Mike Davis",
      participants: ["You", "Sarah", "Mike", "Emma", "Tom"],
      date: "Nov 12, 2025",
    },
    {
      id: 4,
      amount: 24.50,
      category: "Transport",
      description: "Uber to Airport",
      paidBy: "Emma Wilson",
      participants: ["You", "Emma"],
      date: "Nov 11, 2025",
    },
    {
      id: 5,
      amount: 320.00,
      category: "Accommodation",
      description: "Hotel Booking",
      paidBy: "You",
      participants: ["You", "Sarah", "Mike", "Emma"],
      date: "Nov 10, 2025",
    },
    {
      id: 6,
      amount: 65.80,
      category: "Food",
      description: "Pizza Night",
      paidBy: "Tom Brown",
      participants: ["You", "Tom", "Mike"],
      date: "Nov 9, 2025",
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Food: "bg-green-500/20 text-green-400 border-green-500/30",
      Entertainment: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      Groceries: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      Transport: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      Accommodation: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    };
    return colors[category] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Expenses</h1>
          <p className="text-gray-400">Track and manage all your shared expenses</p>
        </div>
        <Button
          onClick={onAddExpense}
          className="gradient-blue glow-blue hover:opacity-90 transition-opacity flex items-center gap-2 px-6 py-6 rounded-xl"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </Button>
      </div>
      
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search expenses..."
            className="w-full bg-[rgb(30,30,45)] border border-[rgb(39,39,55)] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3A8DFF]"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setFilterOpen(!filterOpen)}
          className="border-[rgb(39,39,55)] bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] text-white flex items-center gap-2 px-6 rounded-xl"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
        <Button
          variant="outline"
          className="border-[rgb(39,39,55)] bg-[rgb(30,30,45)] hover:bg-[rgb(35,35,50)] text-white flex items-center gap-2 px-6 rounded-xl"
        >
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>
      </div>
      
      <Card className="glass-card border-[rgb(39,39,55)]">
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[rgb(39,39,55)] hover:bg-transparent">
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Paid By</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.map((expense) => (
                <TableRow
                  key={expense.id}
                  className="border-[rgb(39,39,55)] hover:bg-[rgb(30,30,45)] cursor-pointer transition-colors"
                >
                  <TableCell className="font-medium">{expense.description}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getCategoryColor(expense.category)}>
                      {expense.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#3A8DFF]">
                    ${expense.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-gray-300">{expense.paidBy}</TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {expense.participants.slice(0, 3).map((participant, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3A8DFF] to-[#1A2A6C] border-2 border-[rgb(20,20,28)] flex items-center justify-center text-xs"
                          title={participant}
                        >
                          {participant.charAt(0)}
                        </div>
                      ))}
                      {expense.participants.length > 3 && (
                        <div className="w-8 h-8 rounded-full bg-[rgb(30,30,45)] border-2 border-[rgb(20,20,28)] flex items-center justify-center text-xs text-gray-400">
                          +{expense.participants.length - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-400">{expense.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
