import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'sender' | 'rider' | 'admin';
  profileImage?: string;
  isApproved?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  updateUser: (userData: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for stored auth token
    // For demo purposes, let's set a default user
    const demoUser: User = {
      id: 'demo-user',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      role: 'sender',
      isApproved: true,
    };
    
    setTimeout(() => {
      setUser(null); // Start with no user to show auth flow
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    // Clear any stored auth tokens or data
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, updateUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};