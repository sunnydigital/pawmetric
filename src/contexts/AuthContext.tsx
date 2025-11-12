/**
 * Authentication Context for PawMetric
 * Manages user authentication state and provides auth methods to the app
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, tokenManager } from "../services/api";
import type { User, UserLogin, UserCreate } from "../types/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: UserLogin) => Promise<void>;
  register: (userData: UserCreate) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const loadUser = () => {
      const savedUser = tokenManager.getUser();
      const token = tokenManager.getAccessToken();

      if (savedUser && token) {
        setUser(savedUser);
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials: UserLogin) => {
    try {
      const response = await api.login(credentials);
      if (response.success) {
        setUser(response.data.user);
      } else {
        throw new Error("Login failed");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (userData: UserCreate) => {
    try {
      const response = await api.register(userData);
      if (response.success) {
        setUser(response.data.user);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if API call fails
      setUser(null);
    }
  };

  const refreshUser = () => {
    const savedUser = tokenManager.getUser();
    setUser(savedUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
