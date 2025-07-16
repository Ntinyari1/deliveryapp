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
    // Here you would check for a stored auth token and fetch user data if available
    setTimeout(() => {
      setUser(null); // No user by default
      setIsLoading(false);
    }, 1000);
  }, []);

  const deriveNameFromEmail = (email: string): string => {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  const login = (userData: User) => {
    // If name is missing, derive from email
    if (!userData.name || userData.name.trim() === '') {
      userData.name = deriveNameFromEmail(userData.email);
    }
    setUser(userData);
  };

  const updateUser = (userData: User) => {
    if (!userData.name || userData.name.trim() === '') {
      userData.name = deriveNameFromEmail(userData.email);
    }
    setUser(userData);
  };

  const logout = async () => {
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