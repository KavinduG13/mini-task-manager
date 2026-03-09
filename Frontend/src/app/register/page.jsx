"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authApi } from '@/lib/api/auth';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterPage() {
  const { login } = useAuth();
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    try {
      const response = await authApi.register(data);
      if (response.success && response.data.token) {
        login(response.data, response.data.token);
        window.location.href = '/dashboard';
      } else {
        setServerError(response.message || 'Registration failed');
      }
    } catch (err) {
      setServerError(err.response?.data?.message || 'Server error during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md glass-panel rounded-2xl p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-primary-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -ml-16 -mb-16 transition-all group-hover:bg-purple-500/30"></div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold text-center text-slate-800 dark:text-white mb-2 tracking-tight">
            Create an Account
          </h1>
          <p className="text-center text-slate-500 dark:text-slate-400 mb-8">
            Join us to start managing your tasks today.
          </p>

          {serverError && (
            <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-200 text-red-700 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                className="input-field"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="input-field"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <input
                type="password"
                {...register('password')}
                className="input-field"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 mt-6 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-70 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Sign Up <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
