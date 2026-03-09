import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = "md" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[150px] space-y-3">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary-500`} />
      <span className="text-sm text-slate-500 font-medium animate-pulse">Loading...</span>
    </div>
  );
}
