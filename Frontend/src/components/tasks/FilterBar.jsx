import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="glass-panel p-4 rounded-xl mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <Filter className="w-3.5 h-3.5" /> Status
        </label>
        <select 
          value={filters.status || ''} 
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
        >
          <option value="">All Statuses</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <Filter className="w-3.5 h-3.5" /> Priority
        </label>
        <select 
          value={filters.priority || ''} 
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value })}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <ArrowUpDown className="w-3.5 h-3.5" /> Sort By
        </label>
        <select 
          value={filters.sortBy || 'dueDate'} 
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
        >
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="createdAt">Created Date</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          <ArrowUpDown className="w-3.5 h-3.5" /> Direction
        </label>
        <select 
          value={filters.sortDir || 'asc'} 
          onChange={(e) => onFilterChange({ ...filters, sortDir: e.target.value })}
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm text-sm px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
    </div>
  );
}
