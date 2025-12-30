import React, { createContext, useContext, useState, useEffect } from 'react';

 const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock authentication - in real app, this would call backend API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple mock validation
        if (email && password.length >= 6) {
          const mockUser = {
            id: Date.now(),
            email,
            name: email.split('@')[0],
            createdAt: new Date().toISOString()
          };
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const signup = async (email, password, name) => {
    // Mock signup - in real app, this would call backend API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6 && name) {
          const mockUser = {
            id: Date.now(),
            email,
            name,
            createdAt: new Date().toISOString()
          };
          setUser(mockUser);
          localStorage.setItem('user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Please provide valid details'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};