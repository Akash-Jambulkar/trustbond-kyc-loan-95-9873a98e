
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Define User Roles
export type UserRole = 'admin' | 'bank' | 'user' | null;

// Define User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Define Auth Context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

// Create the Auth Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo purposes
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  {
    id: '2',
    name: 'Bank Manager',
    email: 'bank@example.com',
    role: 'bank',
    avatar: 'https://ui-avatars.com/api/?name=Bank+Manager&background=5A67D8&color=fff',
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'user@example.com',
    role: 'user',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=34D399&color=fff',
  },
];

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for saved user on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulate login functionality
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email
      const foundUser = DEMO_USERS.find(user => user.email === email);
      
      if (foundUser) {
        // Save to state and localStorage
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('You have been logged out');
  };

  // Register functionality
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (DEMO_USERS.some(user => user.email === email)) {
        throw new Error('Email already exists');
      }
      
      // Create new user
      const newUser: User = {
        id: `${DEMO_USERS.length + 1}`,
        name,
        email,
        role,
        avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random&color=fff`,
      };
      
      // In a real application, we would save to a database
      // For this demo, we just simulate successful registration
      toast.success('Registration successful! You can now log in.');
      
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
