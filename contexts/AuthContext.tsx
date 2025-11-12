import React, { createContext, useState, useEffect } from 'react';
import type { User, AuthContextType } from '../types';
import { MOCK_USERS } from '../constants';

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('fstandard_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('fstandard_user');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const login = async (credentials: { email?: string; password?: string; phone?: string; otp?: string; }): Promise<void> => {
    setLoading(true);
    // Simulate API delay
    await new Promise(res => setTimeout(res, 500));
    
    let foundUser: User | undefined;
    if (credentials.email) {
      foundUser = MOCK_USERS.find(u => u.email === credentials.email);
      // In a real app, you'd also verify the password
    } else if (credentials.phone && credentials.otp === '123456') {
      // Mock finding user by phone
      foundUser = MOCK_USERS[0]; // Just log in as the first trader for demo
    }
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('fstandard_user', JSON.stringify(foundUser));
      window.location.hash = `#/dashboard/${foundUser.role}`;
    } else {
      throw new Error('Invalid credentials or OTP.');
    }
    setLoading(false);
  };
  
  const signup = async (details: { email?: string; password?: string; phone?: string; otp?: string; }): Promise<void> => {
    setLoading(true);
    // Simulate API delay
    await new Promise(res => setTimeout(res, 500));
    
    if ((details.email && details.password) || (details.phone && details.otp === '123456')) {
       const newUser: User = {
           id: String(Date.now()),
           email: details.email,
           phone: details.phone,
           role: 'trader', // Default role
           status: 'active', // Default status
       };
       setUser(newUser);
       localStorage.setItem('fstandard_user', JSON.stringify(newUser));
       window.location.hash = '#/dashboard/trader';
    } else {
       throw new Error('Invalid details provided for signup.');
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fstandard_user');
    window.location.hash = '#/signin';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};