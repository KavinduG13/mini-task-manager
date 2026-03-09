"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut, LayoutDashboard, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/20 dark:border-slate-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary-500 text-white p-2 rounded-lg shadow-lg shadow-primary-500/30">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-slate-800 dark:text-white tracking-tight">MiniTaskManager</span>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{user.fullName}</span>
                  <div className="flex items-center gap-1">
                    {isAdmin && <ShieldCheck className="w-3 h-3 text-indigo-500" />}
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {user.role}
                    </span>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="p-2 ml-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-full transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            )}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 ml-2 text-slate-500 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-full transition-colors"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
