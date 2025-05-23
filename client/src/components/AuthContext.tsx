import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { BACKEND_URL } from '../data/config';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      // In development, you can use this mock user for testing
      // Comment out the actual API call when working locally
      
      // Mock user for development
      // Uncomment this for local development without backend
      /* 
      setUser({
        id: 'user-1',
        name: 'Test User',
        email: 'test@example.com'
      });
      return;
      */
      
      const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For development without backend
      // Uncomment this for local development
      /*
      setUser({
        id: 'user-1',
        name: 'Test User',
        email: email
      });
      
      toast({
        title: 'Login Successful',
        description: `Welcome back, Test User!`,
      });
      return;
      */
      
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast({
          title: 'Login Failed',
          description: error.message || 'Invalid credentials',
          variant: 'destructive',
        });
        return;
      }

      const data = await res.json();
      setUser(data.user);

      toast({
        title: 'Login Successful',
        description: `Welcome back, ${data.user.name}!`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Login Failed',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // For development without backend
      // Uncomment this for local development
      /*
      setUser({
        id: 'user-2',
        name: name,
        email: email
      });
      
      toast({
        title: 'Signup Successful',
        description: `Welcome, ${name}!`,
      });
      return;
      */
      
      const res = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast({
          title: 'Signup Failed',
          description: error.message || 'Invalid input',
          variant: 'destructive',
        });
        return;
      }

      const data = await res.json();
      setUser(data.user);

      toast({
        title: 'Signup Successful',
        description: `Welcome, ${data.user.name}!`,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Signup Failed',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  const logout = async () => {
    try {
      // For development without backend
      // Uncomment this for local development
      /*
      setUser(null);
      
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });
      return;
      */
      
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Logout Failed',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
