
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
  userType?: "client" | "professional";
  financialGoals?: string[];
  professionalData?: ProfessionalData;
}

interface ProfessionalData {
  professionalType: string;
  licenseNumber: string;
  expertise: string[];
  certifications: string[];
  region: string;
  bio: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (
    email: string, 
    password: string, 
    name: string, 
    financialGoals?: string[],
    professionalData?: ProfessionalData
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Check if user is already logged in from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('wealthconnect_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setLoading(false);
  }, []);

  // Register functionality (now supports professional registration)
  const register = async (
    email: string, 
    password: string, 
    name: string, 
    financialGoals: string[] = [],
    professionalData?: ProfessionalData
  ) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a user based on type
      const newUser: User = {
        id: `user_${Date.now()}`,
        email,
        name,
        userType: professionalData ? "professional" : "client",
        financialGoals: professionalData ? [] : financialGoals,
        professionalData
      };
      
      // Store in localStorage (temporary until Supabase)
      localStorage.setItem('wealthconnect_user', JSON.stringify(newUser));
      setUser(newUser);
      
      const successMessage = professionalData 
        ? "Professional registration submitted for verification"
        : "Registration successful!";
        
      toast.success(successMessage);
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock login functionality (to be replaced with Supabase)
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock credential check (replace with actual auth)
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      // Create a mock user
      const loggedInUser = {
        id: `user_${Date.now()}`,
        email,
        name: email.split('@')[0], // Temporary name based on email
        userType: "client",
        financialGoals: []
      };
      
      // Store in localStorage (temporary until Supabase)
      localStorage.setItem('wealthconnect_user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock logout functionality
  const logout = async () => {
    try {
      // Clear stored user
      localStorage.removeItem('wealthconnect_user');
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
