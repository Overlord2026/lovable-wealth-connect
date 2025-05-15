
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
  name: string;
  userType: "client" | "professional"; // Fixed type definition to match expected union
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
  session: Session | null; // Added session to the context
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
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialize Supabase auth - check for existing session and set up listener
  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Only update user state with synchronous updates here
          // to prevent auth deadlocks
          const tempUser: User = {
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            name: currentSession.user.user_metadata.name || currentSession.user.email?.split('@')[0] || '',
            userType: (currentSession.user.user_metadata.userType as "client" | "professional") || "client",
          };
          setUser(tempUser);
          
          // Fetch additional user data with a non-blocking timeout
          if (currentSession?.user) {
            setTimeout(() => {
              fetchUserData(currentSession.user);
            }, 0);
          }
        } else {
          setUser(null);
        }
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      
      if (initialSession?.user) {
        const initialUser: User = {
          id: initialSession.user.id,
          email: initialSession.user.email || '',
          name: initialSession.user.user_metadata.name || initialSession.user.email?.split('@')[0] || '',
          userType: (initialSession.user.user_metadata.userType as "client" | "professional") || "client",
        };
        setUser(initialUser);
        
        // Fetch additional user data
        fetchUserData(initialSession.user);
      }
      
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fetch additional user data from profiles or other tables
  const fetchUserData = async (supabaseUser: SupabaseUser) => {
    try {
      // Here you would fetch additional user data from your profiles table
      // For now, using the metadata from supabase auth
      
      // If you have a profiles table, you would query it:
      // const { data, error } = await supabase
      //   .from('profiles')
      //   .select('*')
      //   .eq('id', supabaseUser.id)
      //   .single();
      
      // For now, we'll just use the metadata
      const userType = supabaseUser.user_metadata.userType as "client" | "professional";
      const financialGoals = supabaseUser.user_metadata.financialGoals || [];
      const professionalData = supabaseUser.user_metadata.professionalData;
      
      setUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          financialGoals,
          professionalData
        };
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Register with Supabase Auth
  const register = async (
    email: string, 
    password: string, 
    name: string, 
    financialGoals: string[] = [],
    professionalData?: ProfessionalData
  ) => {
    setLoading(true);
    try {
      const userType = professionalData ? "professional" : "client";
      
      // Create user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            userType,
            financialGoals: professionalData ? [] : financialGoals,
            professionalData
          }
        }
      });
      
      if (error) throw error;
      
      if (data?.user) {
        toast.success(
          professionalData 
            ? "Professional registration submitted for verification"
            : "Registration successful! Please check your email to confirm your account."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Supabase Auth
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout with Supabase Auth
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  const value = {
    user,
    session,
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
