'use client';

import React from "react"

import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

type AuthMode = 'login' | 'signup';
type UserRole = 'customer' | 'shop-owner';

export function AuthForm() {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`[v0] ${mode} attempt:`, { email, role, password: '***' });
      // Here you would integrate with actual auth service
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-3 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setMode('login')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
            mode === 'login'
              ? 'bg-white text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode('signup')}
          className={`flex-1 py-2 px-4 rounded-md font-medium transition ${
            mode === 'signup'
              ? 'bg-white text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Welcome Message */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Welcome back
        </h2>
        <p className="text-sm text-muted-foreground">
          Enter your details to access your market account
        </p>
      </div>

      {/* Role Selector */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground uppercase tracking-wide text-center block">
          I am a
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              role === 'customer'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
            Customer
          </button>
          <button
            onClick={() => setRole('shop-owner')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
              role === 'shop-owner'
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            Shop Owner
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-foreground">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            {mode === 'login' && (
              <a href="#" className="text-sm text-primary hover:text-primary/80 font-medium">
                Forgot?
              </a>
            )}
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-12 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Social Login */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-white text-muted-foreground font-medium">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="py-3 px-4 border border-border rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 font-medium text-foreground"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#666"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#666"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#666"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#666"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="py-3 px-4 border border-border rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 font-medium text-foreground"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </button>
      </div>

      {/* Footer Links */}
      <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground border-t border-border">
        <a href="#" className="hover:text-foreground transition font-medium">
          Privacy Policy
        </a>
        <span>•</span>
        <a href="#" className="hover:text-foreground transition font-medium">
          Terms of Service
        </a>
        <span>•</span>
        <a href="#" className="hover:text-foreground transition font-medium">
          Help
        </a>
      </div>
    </div>
  );
}
