"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import React from "react";
import { CreateUserAccount, LogIn, UserType } from "./lib/types";
import { createFetchWithAuth } from "./lib/fetch"; // Adjust path as needed

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (user: LogIn) => Promise<void>;
    register: (user: CreateUserAccount) => Promise<void>;
    logout: () => Promise<void>;
    user: UserType | null;
    refreshUser: () => Promise<void>;
    getUser: () => Promise<UserType | null>;
}
const AuthContext = createContext<AuthContextType | null>(null);

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
    const setIsLoading = (isLoading: boolean) => setAuthState(prev => ({ ...prev, isLoading }));

    const { fetchWithAuthorization } = useMemo(() => createFetchWithAuth(), []);

    const logout = useCallback(async () => {
        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
    }, []);

    const getUser = useCallback(async (): Promise<UserType | null> => {
        return await fetchWithAuthorization(`/api/users`);
    }, [fetchWithAuthorization]); 

    const refreshUser = useCallback(async () => {
        try {
            const user = await getUser();
            console.log("Fetched user for refresh:", user);
            setUser(user);
            setIsAuthenticated(!!user);
        } catch (error) {
            console.error("Error refreshing user data:", error);
            await logout(); 
        }
    }, [getUser, logout, setUser, setIsAuthenticated]);

    const login = useCallback(async ({ password, email }: LogIn) => {
        try {
            const { accessToken, refreshToken } = await fetchWithAuthorization(`/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, email }),
            });
            Cookies.set('accessToken', accessToken, { expires: 1 / 48 }); 
            Cookies.set('refreshToken', refreshToken, { expires: 7 });
            await refreshUser();
        } catch (error) {
            console.error('Error Login User:', error);
            await logout(); 
            throw error; 
        }
    }, []);

    const register = useCallback(async ({ name, password, email }: CreateUserAccount) => {
        try {
            const { accessToken, refreshToken } = await fetchWithAuthorization(`/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password, email }),
            });
            Cookies.set('accessToken', accessToken, { expires: 1 / 48 });
            Cookies.set('refreshToken', refreshToken, { expires: 7 });
            await refreshUser();
        } catch (error) {
            console.error('Error creating user:', error);
            await logout(); 
            throw error; 
        }
    }, []);

    const checkAuth = useCallback(async () => {
        setIsLoading(true);
        const token = Cookies.get('accessToken');

        if (!token) {
            await logout();
            setIsLoading(false);
            return;
        }

        try {
            const fetchedUser = await getUser();
            if (fetchedUser) {
                setAuthState({ user: fetchedUser, isAuthenticated: true, isLoading: false });
            } else {
               
                console.warn("No user data fetched during initial check. Logging out.");
                await logout();
            }
        } catch (error) {
            console.error("Error during initial authentication check:", error);
            await logout();
        } finally {
            setIsLoading(false); 
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    const value = useMemo<AuthContextType>(() => ({
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        register,
        refreshUser,
        getUser,
    }), [authState, login, logout, register, refreshUser, getUser]);

    if (authState.isLoading) {
        return <div>Loading authentication...</div>;
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
