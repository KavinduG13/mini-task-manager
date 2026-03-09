"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedToken = Cookies.get('token');
    const savedUserStr = Cookies.get('user');

    if (savedToken && savedUserStr) {
      try {
        const parsedUser = JSON.parse(savedUserStr);
        setToken(savedToken);
        setUser(parsedUser);
      } catch (err) {
        console.error('Failed to parse user cookie', err);
        Cookies.remove('token');
        Cookies.remove('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newUser, newToken) => {
    setUser(newUser);
    setToken(newToken);
    Cookies.set('token', newToken, { expires: 7 });
    Cookies.set('user', JSON.stringify(newUser), { expires: 7 });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/login');
  };

  const isAuthenticated = !!token;
  const isAdmin = user?.role === 'ADMIN';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
