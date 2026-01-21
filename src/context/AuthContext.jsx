import React, { createContext, useState, useEffect } from 'react';
import { me as apiMe, logout as apiLogout } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user on mount if token exists
  useEffect(() => {
    const initUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await apiMe();
          setUser(userData);
          setError(null);
        } catch (err) {
          console.error('Failed to fetch user:', err);
          setError('Failed to load user data');
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    initUser();
  }, []);

  const logout = async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError(err?.response?.data?.message || 'Logout failed');
      // Still clear local state even if API fails
      setUser(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
    error,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
