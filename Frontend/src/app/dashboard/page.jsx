"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/layout/Navbar';
import TaskCard from '@/components/tasks/TaskCard';
import TaskModal from '@/components/tasks/TaskModal';
import FilterBar from '@/components/tasks/FilterBar';
import Pagination from '@/components/tasks/Pagination';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Toast from '@/components/ui/Toast';
import { tasksApi } from '@/lib/api/tasks';
import { Plus, Layout } from 'lucide-react';

export default function Dashboard() {
  const [tasksData, setTasksData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState(null);
  
  // Filter state
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'dueDate',
    sortDir: 'asc',
    page: 0,
    size: 10,
  });

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await tasksApi.getTasks(filters);
      if (response.success) {
        setTasksData(response.data);
      } else {
        showToast(response.message || 'Failed to fetch tasks', 'error');
      }
    } catch (err) {
      showToast('Error loading tasks', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleFilterChange = (newFilters) => {
    setFilters({ ...newFilters, page: 0 }); // reset to page 0 on filter change
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleCreateTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = async (data) => {
    setIsSaving(true);
    try {
      let response;
      if (selectedTask) {
        response = await tasksApi.updateTask(selectedTask.id, data);
      } else {
        response = await tasksApi.createTask(data);
      }
      
      if (response.success) {
        showToast(selectedTask ? 'Task updated successfully' : 'Task created successfully');
        setIsModalOpen(false);
        fetchTasks();
      } else {
        showToast(response.message || 'Action failed', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error saving task', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const response = await tasksApi.deleteTask(id);
      if (response.success) {
        showToast('Task deleted successfully');
        fetchTasks();
      } else {
        showToast(response.message || 'Failed to delete task', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error deleting task', 'error');
    }
  };

  const handleCompleteTask = async (id) => {
    try {
      const response = await tasksApi.markAsCompleted(id);
      if (response.success) {
        showToast('Task marked as completed!');
        fetchTasks();
      } else {
        showToast(response.message || 'Failed to update task', 'error');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Error updating task status', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Task Dashboard
            </h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
              Manage, track, and organize your work seamlessly.
            </p>
          </div>
          
          <button 
            onClick={handleCreateTask}
            className="inline-flex items-center gap-2 px-5 py-3 border border-transparent text-sm font-semibold rounded-xl shadow-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {isLoading ? (
          <div className="py-20 glass-panel rounded-2xl border-dashed">
            <LoadingSpinner size="lg" />
          </div>
        ) : tasksData?.content?.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
              {tasksData.content.map((task) => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onComplete={handleCompleteTask}
                />
              ))}
            </div>
            <Pagination pageData={tasksData} onPageChange={handlePageChange} />
          </>
        ) : (
          <div className="text-center py-20 glass-panel rounded-2xl border-dashed border-2 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <Layout className="mx-auto h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="mt-2 text-lg font-bold text-slate-900 dark:text-white tracking-tight">No tasks found</h3>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Get started by creating a new task, or adjusting your current filters.
            </p>
            <button 
              onClick={handleCreateTask}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 border text-sm font-medium rounded-lg shadow-sm text-primary-700 bg-primary-50 hover:bg-primary-100 border-primary-200 dark:text-primary-300 dark:bg-primary-900/30 dark:border-primary-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add your first task
            </button>
          </div>
        )}

      </main>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTask}
        task={selectedTask}
        isSaving={isSaving}
      />

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
