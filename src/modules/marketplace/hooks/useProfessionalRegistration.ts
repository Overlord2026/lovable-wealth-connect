import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { professionalService, RegistrationResult } from "../services/professionalService";
import { FormValues } from "../components/professionals/registration/types";
import { Professional } from "../types/professional";

interface UseProfessionalRegistrationReturn {
  register: (formData: FormValues) => Promise<RegistrationResult>;
  updateProfile: (id: string, updates: Partial<Professional>) => Promise<RegistrationResult>;
  verifyProfile: (id: string) => Promise<RegistrationResult>;
  getProfile: (id: string) => Promise<Professional | null>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useProfessionalRegistration(): UseProfessionalRegistrationReturn {
  const { register: authRegister } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const register = useCallback(async (formData: FormValues): Promise<RegistrationResult> => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create user account with auth
      await authRegister(
        formData.email,
        formData.password,
        formData.name,
        [],
        {
          professionalType: formData.professionalType,
          licenseNumber: formData.licenseNumber,
          expertise: formData.expertise,
          certifications: formData.certifications || [],
          region: formData.region,
          bio: formData.bio,
          isVerified: false,
        }
      );

      // Get the user ID from the auth context
      const { data: authData } = await import("@/integrations/supabase/client").then(
        module => module.supabase.auth.getUser()
      );

      if (!authData?.user) {
        throw new Error("Failed to get user after registration");
      }

      // Step 2: Use registration engine to complete professional setup
      const result = await professionalService.registerProfessional(formData, authData.user.id);

      if (!result.success) {
        setError(result.error || "Registration failed");
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, [authRegister]);

  const updateProfile = useCallback(async (id: string, updates: Partial<Professional>): Promise<RegistrationResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = await professionalService.updateProfessional(id, updates);
      
      if (!result.success) {
        setError(result.error || "Update failed");
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Update failed";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyProfile = useCallback(async (id: string): Promise<RegistrationResult> => {
    setLoading(true);
    setError(null);

    try {
      const result = await professionalService.verifyProfessional(id);
      
      if (!result.success) {
        setError(result.error || "Verification failed");
      }

      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Verification failed";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const getProfile = useCallback(async (id: string): Promise<Professional | null> => {
    setLoading(true);
    setError(null);

    try {
      const professional = await professionalService.getProfessional(id);
      return professional;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch profile";
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    register,
    updateProfile,
    verifyProfile,
    getProfile,
    loading,
    error,
    clearError
  };
}