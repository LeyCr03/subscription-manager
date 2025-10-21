"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import React from "react";
import { CreateUserAccount, LogIn, UserType } from "./lib/types";
import { createFetchWithAuth } from './lib/fetch';

export interface AuthContext {

  isAuthenticated: boolean;
  login: (user: LogIn) => Promise<void>;
  register: (user: CreateUserAccount) => Promise<void>;
  logout: () => Promise<void>;
  user: UserType | null;
  refreshUser: () => Promise<void>;
  getUser: () => Promise<UserType | null>;
}
const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean,
    user: UserType | null,
    isLoading: boolean
  }>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  const setUser = (user: UserType | null) => setAuthState(prev => ({ ...prev, user }));
  const setIsAuthenticated = (isAuthenticated: boolean) => setAuthState(prev => ({ ...prev, isAuthenticated }));

  async function getUser(): Promise<UserType | null> {
    const url = `/api/users`; // Corrected URL

    const { fetchWithAuthorization } = createFetchWithAuth();  // Get the functions

    try {
      const response = await fetchWithAuthorization(url); // Use fetchWithAuthorization

      const responseUser: UserType = await response.json();
      return responseUser;
    } catch (error) {
      console.error(error);
      logout(); // Terminate session
      return null;
    }
  }


  const logout = React.useCallback(async () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  }, []);

  async function refreshUser() {
    const user = await getUser();
    console.log({ user });
    setUser(user);
    setIsAuthenticated(!!user);
  }

  const login = React.useCallback(async ({ password, email }: LogIn) => {
    const url = 'http://localhost:3001/api/auth/login';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error Login');
      }

      const { accessToken, refreshToken } = await response.json();
      Cookies.set('accessToken', accessToken, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      await refreshUser()
    } catch (error) {
      console.error('Error Login User:', error);
      throw error;
    }
  }, []);

  const register = React.useCallback(async ({ name, password, email }: CreateUserAccount) => {
    const url = 'http://localhost:3001/api/auth/register';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password, email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating user');
      }

      const { accessToken, refreshToken } = await response.json();
      Cookies.set('accessToken', accessToken, { expires: 1 });
      Cookies.set('refreshToken', refreshToken, { expires: 7 });
      await refreshUser()
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }, []);

  const checkAuth = async () => {
    try {
      const token = Cookies.get('accessToken');
      if (token) {
        const fetchedUser = await getUser();
        if (fetchedUser) {
          setAuthState({ user: fetchedUser, isAuthenticated: true, isLoading: false });
        } else {
          await logout();
        }
      } else {
        await logout();
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      await logout();
    } finally {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  React.useEffect(() => {
    checkAuth();
  }, []);



  const value = React.useMemo(() => ({
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    login,
    logout,
    register,
    refreshUser,
    getUser,
  }), [authState]);
  if (authState.isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};