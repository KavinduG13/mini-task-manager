import React from 'react';
import { Calendar, Clock, Edit2, Trash2, CheckCircle2 } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onComplete }) {
  const isCompleted = task.status === 'DONE';

  const statusColors = {
    TODO: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    IN_PROGRESS: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    DONE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  };

  const priorityColors = {
    LOW: 'text-slate-500 bg-slate-50 dark:bg-slate-800/50',
    MEDIUM: 'text-amber-600 bg-amber-50 dark:bg-amber-900/30',
    HIGH: 'text-red-600 bg-red-50 dark:bg-red-900/30',
  };

  return (
    <div className={`glass-panel rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative group overflow-hidden ${isCompleted ? 'opacity-75' : ''}`}>
      {isCompleted && (
        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full border-b border-l border-emerald-500/20 -mt-1 -mr-1 z-0"></div>
      )}
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-3">
          <div className="flex gap-2 mb-2">
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${statusColors[task.status]}`}>
              {task.status.replace('_', ' ')}
            </span>
            <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
              {task.priority} Priority
            </span>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {!isCompleted && (
              <button 
                onClick={() => onComplete(task.id)}
                className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-lg transition-colors"
                title="Mark as completed"
              >
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
            <button 
              onClick={() => onEdit(task)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              title="Edit task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
              title="Delete task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className={`font-bold text-lg mb-2 text-slate-800 dark:text-white ${isCompleted ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
          {task.title}
        </h3>
        
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 min-h-[40px]">
          {task.description || <span className="italic opacity-50">No description provided</span>}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700/50">
          <div className="flex items-center gap-4">
            {task.dueDate && (
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400" title={`Created by ${task.userFullName}`}>
            <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold">
              {task.userFullName.charAt(0)}
            </div>
            <span className="truncate max-w-[80px]">{task.userFullName}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
