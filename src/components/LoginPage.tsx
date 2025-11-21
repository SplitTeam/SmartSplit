import * as React from "react";
import { Receipt } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface LoginPageProps {
  onLogin: () => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-[rgb(10,10,15)] via-[rgb(15,15,25)] to-[rgb(10,10,15)]">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-blue glow-blue mb-4">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">SmartSplit</h1>
          <p className="text-gray-400">Manage shared expenses effortlessly</p>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl mb-6">Welcome Back</h2>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white placeholder-gray-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-[rgb(30,30,45)] border-[rgb(39,39,55)] text-white placeholder-gray-500"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-600" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-[#3A8DFF] hover:underline">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full gradient-blue hover:opacity-90 transition-opacity glow-blue py-6 rounded-xl"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <a href="#" className="text-[#3A8DFF] hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
