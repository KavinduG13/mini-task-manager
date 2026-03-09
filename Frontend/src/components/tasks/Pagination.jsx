import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pageData, onPageChange }) {
  if (!pageData || pageData.totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 glass-panel rounded-xl mt-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(pageData.number - 1)}
          disabled={pageData.first}
          className="relative inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(pageData.number + 1)}
          disabled={pageData.last}
          className="relative ml-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Showing <span className="font-medium">{pageData.numberOfElements > 0 ? pageData.number * pageData.size + 1 : 0}</span> to{' '}
            <span className="font-medium">
              {Math.min((pageData.number + 1) * pageData.size, pageData.totalElements)}
            </span>{' '}
            of <span className="font-medium">{pageData.totalElements}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(pageData.number - 1)}
              disabled={pageData.first}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            
            <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-slate-900 dark:text-white ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
              Page {pageData.number + 1} of {pageData.totalPages}
            </div>
            
            <button
              onClick={() => onPageChange(pageData.number + 1)}
              disabled={pageData.last}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-slate-400 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
