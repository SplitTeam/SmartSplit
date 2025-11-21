import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, Sparkles, CheckCircle, Camera, FileText, Calendar, DollarSign, Tag, Users } from "lucide-react";

export function AIScannerPage() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScanned, setIsScanned] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      // Simulate processing
      setTimeout(() => {
        setUploadedFile(URL.createObjectURL(file));
        setIsProcessing(false);
        setIsScanned(true);
      }, 2000);
    }
  };

  const simulateScan = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsScanned(true);
      setIsProcessing(false);
    }, 2000);
  };

  const detectedData = {
    vendor: "Olive Garden Restaurant",
    amount: "125.50",
    date: "Nov 21, 2025",
    category: "Restaurant",
    items: [
      { name: "Pasta Primavera", price: "18.99" },
      { name: "Chicken Alfredo", price: "22.50" },
      { name: "Caesar Salad x2", price: "16.00" },
      { name: "Soft Drinks x4", price: "12.00" },
      { name: "Tiramisu", price: "8.50" },
    ],
    tax: "11.51",
    tip: "24.00",
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="mb-2 flex items-center gap-3">
          <span>AI Receipt Scanner</span>
          <Badge className="bg-gradient-to-r from-[#4A8BFF] to-[#8B5CF6] border-0 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </h1>
        <p className="text-gray-400">Upload receipts and let AI automatically extract expense details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="space-y-6">
          {/* Upload Box */}
          <Card className="glass-card border-[rgb(39,39,55)] card-hover">
            <CardContent className="pt-6">
              <label
                htmlFor="receipt-upload"
                className={`block border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  isProcessing
                    ? "border-[#4A8BFF] bg-[#4A8BFF]/10 animate-pulse"
                    : uploadedFile
                    ? "border-green-500 bg-green-500/10"
                    : "border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50 hover:bg-[#4A8BFF]/5"
                }`}
              >
                <input
                  id="receipt-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                <div className="flex flex-col items-center gap-4">
                  {isProcessing ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#4A8BFF]/20 flex items-center justify-center animate-spin">
                        <Sparkles className="w-8 h-8 text-[#4A8BFF]" />
                      </div>
                      <p className="text-lg text-[#4A8BFF]">Processing with AI...</p>
                    </>
                  ) : uploadedFile ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <p className="text-lg text-green-400">Receipt Scanned Successfully!</p>
                      <p className="text-sm text-gray-400">Upload another receipt to scan again</p>
                    </>
                  ) : (
                    <>
                      <div className="w-16 h-16 rounded-full bg-[#4A8BFF]/20 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-[#4A8BFF]" />
                      </div>
                      <div>
                        <p className="text-lg mb-2">Drop your receipt here</p>
                        <p className="text-sm text-gray-400">or click to browse files</p>
                      </div>
                      <Badge className="bg-[#4A8BFF]/20 text-[#4A8BFF] border-[#4A8BFF]/30">
                        JPG, PNG, PDF up to 10MB
                      </Badge>
                    </>
                  )}
                </div>
              </label>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  variant="outline"
                  className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50"
                  onClick={() => document.getElementById("receipt-upload")?.click()}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </Button>
                <Button
                  variant="outline"
                  className="border-[rgb(39,39,55)] hover:border-[#4A8BFF]/50"
                  onClick={simulateScan}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Use Sample
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {uploadedFile && (
            <Card className="glass-card border-[rgb(39,39,55)] card-hover">
              <CardHeader>
                <CardTitle className="text-sm">Receipt Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[rgb(30,30,45)] flex items-center justify-center border border-[rgb(39,39,55)]">
                  <img
                    src={uploadedFile}
                    alt="Receipt"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Detection Results */}
        <div className="space-y-6">
          {isScanned ? (
            <>
              {/* Detected Fields */}
              <Card className="glass-card border-[rgb(39,39,55)] card-hover border-[#4A8BFF]/30 bg-gradient-to-br from-[#4A8BFF]/5 to-transparent">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#4A8BFF]" />
                    AI Detected Fields
                  </CardTitle>
                  <p className="text-sm text-gray-400">Review and edit the extracted information</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="vendor" className="text-gray-400">Vendor / Restaurant</Label>
                    <Input
                      id="vendor"
                      value={detectedData.vendor}
                      className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="amount" className="text-gray-400">Total Amount</Label>
                      <div className="relative mt-2">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="amount"
                          value={detectedData.amount}
                          className="bg-[rgb(30,30,45)] border-[#4A8BFF]/30 pl-10 text-[#4A8BFF] glow-blue"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="date" className="text-gray-400">Date</Label>
                      <div className="relative mt-2">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="date"
                          value={detectedData.date}
                          className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-gray-400">Category</Label>
                    <div className="relative mt-2">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                      <Select defaultValue={detectedData.category.toLowerCase()}>
                        <SelectTrigger className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] pl-10">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[rgb(20,20,28)] border-[rgb(39,39,55)]">
                          <SelectItem value="restaurant">🍽️ Restaurant</SelectItem>
                          <SelectItem value="shopping">🛍️ Shopping</SelectItem>
                          <SelectItem value="transport">🚗 Transport</SelectItem>
                          <SelectItem value="entertainment">🎬 Entertainment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Line Items */}
                  <div>
                    <Label className="text-gray-400 mb-2 block">Detected Items</Label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {detectedData.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg bg-[rgb(30,30,45)] text-sm"
                        >
                          <span>{item.name}</span>
                          <span className="text-gray-400">${item.price}</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-2 text-sm">
                        <span className="text-gray-400">Tax</span>
                        <span className="text-gray-400">${detectedData.tax}</span>
                      </div>
                      <div className="flex items-center justify-between p-2 text-sm">
                        <span className="text-gray-400">Tip</span>
                        <span className="text-gray-400">${detectedData.tip}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Suggestions */}
              <Card className="glass-card border-[rgb(39,39,55)] card-hover bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    AI Smart Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[rgb(30,30,45)]">
                    <div className="w-8 h-8 rounded-lg bg-[#4A8BFF]/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-[#4A8BFF]" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Recommended Split</p>
                      <p className="text-xs text-gray-400">Split equally among 4 people in "Weekend Squad" group - $31.38 per person</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[rgb(30,30,45)]">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Tag className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Category Confidence</p>
                      <p className="text-xs text-gray-400">98% confident this is a Restaurant expense based on vendor and items</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-[rgb(30,30,45)]">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm mb-1">Receipt Validation</p>
                      <p className="text-xs text-gray-400">All line items add up correctly. No discrepancies detected.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-[rgb(39,39,55)]"
                  onClick={() => {
                    setIsScanned(false);
                    setUploadedFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-[#4A8BFF] to-[#1A2A6C] glow-blue">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Expense
                </Button>
              </div>
            </>
          ) : (
            <Card className="glass-card border-[rgb(39,39,55)] h-full flex items-center justify-center">
              <CardContent className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#4A8BFF]/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-10 h-10 text-[#4A8BFF]/50" />
                </div>
                <p className="text-gray-400">Upload a receipt to see AI-powered extraction</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
