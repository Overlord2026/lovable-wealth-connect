import { supabase } from "@/integrations/supabase/client";
import { Professional } from "../types/professional";
import { FormValues } from "../components/professionals/registration/types";

export interface RegistrationResult {
  success: boolean;
  professional?: Professional;
  error?: string;
  userId?: string;
}

export interface RegistrationData extends Omit<FormValues, 'password' | 'confirmPassword' | 'termsAccepted'> {
  userId: string;
}

class ProfessionalRegistrationEngine {
  async registerProfessional(formData: FormValues, userId: string): Promise<RegistrationResult> {
    try {
      // For now, we'll store the professional data in the user metadata
      // until the proper database tables are created
      const professionalData = await this.createProfessionalProfile(formData, userId);
      
      // Record basic consent tracking
      await this.recordConsentPreferences(formData, userId);
      
      return {
        success: true,
        professional: professionalData,
        userId
      };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Registration failed"
      };
    }
  }

  private async createProfessionalProfile(formData: FormValues, userId: string): Promise<Professional> {
    // Store in user metadata for now
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        professional_profile: {
          name: formData.name,
          email: formData.email,
          professionalType: formData.professionalType,
          licenseNumber: formData.licenseNumber,
          region: formData.region,
          expertise: formData.expertise,
          certifications: formData.certifications || [],
          bio: formData.bio,
          isVerified: false,
          verificationStatus: 'pending',
          registeredAt: new Date().toISOString()
        }
      }
    });

    if (updateError) throw new Error(`Failed to create professional profile: ${updateError.message}`);
    
    return {
      id: userId,
      name: formData.name,
      email: formData.email,
      professionalType: formData.professionalType,
      licenseNumber: formData.licenseNumber,
      region: formData.region,
      expertise: formData.expertise,
      certifications: formData.certifications || [],
      bio: formData.bio,
      isVerified: false,
      verificationStatus: 'pending'
    };
  }

  private async recordConsentPreferences(formData: FormValues, userId: string): Promise<void> {
    // Store consent data in user metadata for now
    const consentData = {
      gdprConsent: formData.gdprConsent || false,
      ccpaConsent: formData.ccpaConsent || false,
      marketingConsent: formData.marketingConsent || false,
      dataProcessingConsent: formData.dataProcessingConsent || false,
      consentRecordedAt: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    const { error } = await supabase.auth.updateUser({
      data: {
        consent_preferences: consentData
      }
    });

    if (error) throw new Error(`Failed to record consent preferences: ${error.message}`);
  }

  async updateProfessional(id: string, updates: Partial<Professional>): Promise<RegistrationResult> {
    try {
      // Get current profile from user metadata
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not found");

      const currentProfile = user.user_metadata.professional_profile || {};
      const updatedProfile = {
        ...currentProfile,
        ...updates,
        updatedAt: new Date().toISOString()
      };

      const { error } = await supabase.auth.updateUser({
        data: {
          professional_profile: updatedProfile
        }
      });

      if (error) throw new Error(`Failed to update professional: ${error.message}`);

      return {
        success: true,
        professional: {
          id,
          name: updatedProfile.name,
          email: updatedProfile.email,
          professionalType: updatedProfile.professionalType,
          licenseNumber: updatedProfile.licenseNumber,
          region: updatedProfile.region,
          expertise: updatedProfile.expertise,
          certifications: updatedProfile.certifications,
          bio: updatedProfile.bio,
          isVerified: updatedProfile.isVerified,
          verificationStatus: updatedProfile.verificationStatus
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Update failed"
      };
    }
  }

  async verifyProfessional(id: string): Promise<RegistrationResult> {
    try {
      // Get current profile from user metadata
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error("User not found");

      const currentProfile = user.user_metadata.professional_profile || {};
      const verifiedProfile = {
        ...currentProfile,
        isVerified: true,
        verificationStatus: 'verified',
        verifiedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const { error } = await supabase.auth.updateUser({
        data: {
          professional_profile: verifiedProfile
        }
      });

      if (error) throw new Error(`Failed to verify professional: ${error.message}`);

      return {
        success: true,
        professional: {
          id,
          name: verifiedProfile.name,
          email: verifiedProfile.email,
          professionalType: verifiedProfile.professionalType,
          licenseNumber: verifiedProfile.licenseNumber,
          region: verifiedProfile.region,
          expertise: verifiedProfile.expertise,
          certifications: verifiedProfile.certifications,
          bio: verifiedProfile.bio,
          isVerified: verifiedProfile.isVerified,
          verificationStatus: verifiedProfile.verificationStatus
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Verification failed"
      };
    }
  }

  async getProfessional(id: string): Promise<Professional | null> {
    try {
      // For now, get from current user's metadata
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user || user.id !== id) return null;

      const profile = user.user_metadata.professional_profile;
      if (!profile) return null;

      return {
        id: user.id,
        name: profile.name,
        email: profile.email,
        professionalType: profile.professionalType,
        licenseNumber: profile.licenseNumber,
        region: profile.region,
        expertise: profile.expertise,
        certifications: profile.certifications,
        bio: profile.bio,
        isVerified: profile.isVerified,
        verificationStatus: profile.verificationStatus
      };
    } catch (error) {
      console.error("Error fetching professional:", error);
      return null;
    }
  }
}

// Export singleton instance
export const professionalService = new ProfessionalRegistrationEngine();