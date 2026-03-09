"use client";

import React, { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

export default function Toast({ message, type, onClose, duration = 4000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = type === 'success' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800';
  const textColor = type === 'success' ? 'text-emerald-800 dark:text-emerald-300' : 'text-red-800 dark:text-red-300';
  const Icon = type === 'success' ? CheckCircle2 : XCircle;
  const iconColor = type === 'success' ? 'text-emerald-500' : 'text-red-500';

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${bgColor} shadow-lg max-w-sm glass-panel`}>
        <Icon className={`w-5 h-5 shrink-0 ${iconColor}`} />
        <p className={`text-sm font-medium ${textColor} flex-1`}>{message}</p>
        <button onClick={onClose} className={`shrink-0 p-1 opacity-60 hover:opacity-100 transition-opacity ${textColor}`}>
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
