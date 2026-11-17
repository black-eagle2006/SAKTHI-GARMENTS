import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  registerCustomer: (data: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  registerCompany: (data: {
    companyName: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (updated: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session
  useEffect(() => {
    const savedToken = sessionStorage.getItem('sakthi_auth_token');
    const savedUser = sessionStorage.getItem('sakthi_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const { token: jwtToken, user: userData } = res.data;

      setToken(jwtToken);
      setUser(userData);
      sessionStorage.setItem('sakthi_auth_token', jwtToken);
      sessionStorage.setItem('sakthi_user', JSON.stringify(userData));
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed. Check your credentials.';
      return { success: false, message: msg };
    }
  };

  const registerCustomer = async (data: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    password: string;
  }) => {
    try {
      const res = await apiClient.post('/auth/register', data);
      const { token: jwtToken, user: userData } = res.data;

      if (jwtToken && userData) {
        setToken(jwtToken);
        setUser(userData);
        sessionStorage.setItem('sakthi_auth_token', jwtToken);
        sessionStorage.setItem('sakthi_user', JSON.stringify(userData));
      }
      return { success: true };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Registration failed.';
      return { success: false, message: msg };
    }
  };

  const registerCompany = async (data: {
    companyName: string;
    contactPerson: string;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    password: string;
  }) => {
    try {
      const res = await apiClient.post('/auth/register-company', data);
      return {
        success: true,
        message:
          res.data?.message ||
          'Company registered successfully. Pending Administrator approval.',
      };
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Company registration failed.';
      return { success: false, message: msg };
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (e) {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      setToken(null);
      sessionStorage.removeItem('sakthi_auth_token');
      sessionStorage.removeItem('sakthi_user');
      window.location.href = '/login';
    }
  };

  const updateUser = (updated: Partial<User>) => {
    if (!user) return;
    const newUser = { ...user, ...updated };
    setUser(newUser);
    sessionStorage.setItem('sakthi_user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        registerCustomer,
        registerCompany,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
