"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const API_BASE = "https://nestjs-1-3k9w.onrender.com/auth";

// 👑 IMPORTANT: The path is now simply '/bg.jpg' based on your last code snippet.
const BARBIE_BG_URL = '/bg.jpg'; 

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
        }

    saveToken(data.accessToken);
    router.push("/dashboard");
  }

  return (
    // Background: Uses the 'bg.jpg' image, covering the whole screen.
    <div 
      className="flex items-center justify-center h-screen px-4"
      style={{ 
        backgroundImage: `url(${BARBIE_BG_URL})`,
        backgroundSize: 'cover',        // Ensures the image covers the entire screen
        backgroundPosition: 'center',   // Centers the image
        backgroundRepeat: 'no-repeat',  // Prevents tiling
      }}
    >
      
      {/* Card: Pure white background, high shadow, sharp contrast. Removed backdrop-blur. */}
      <Card className="w-full max-w-sm p-10 shadow-xl rounded-2xl bg-white border-0 transition-all duration-300 hover:shadow-pink-300/50">
        <CardContent>
          {/* Header: Changed to text-pink-700 (or use a custom color if Tailwind's pink-700 isn't bright enough) */}
          <h1 className="text-4xl font-extrabold mb-10 text-center text-pink-700 tracking-tight">
            Welcome Back
          </h1>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input: Pure white background, subtle gray border, vibrant pink focus ring */}
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 transition-all text-base py-6"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-lg bg-white border border-gray-200 text-gray-800 placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/40 transition-all text-base py-6"
            />
            {error && (
              // Error message: Standard soft red text
              <p className="text-red-500 text-xs text-center animate-pulse">{error}</p>
            )}
            {/* Button: Vibrant pink color, full rounded edges (used bg-pink-600 for a bright look) */}
            <Button
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-3 rounded-full transition-transform transform hover:scale-[1.02] mt-6 shadow-lg shadow-pink-400/50"
              type="submit"
            >
              Log In
            </Button>
          </form>

          <div className="mt-8 flex justify-between text-center">
            {/* Link: Pink text (text-pink-600 for intensity) */}
            <Button
              variant="link"
              className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
              onClick={() => router.push("/register")}
            >
              Create an account
            </Button>
            <Button
              variant="link"
              className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot password?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}