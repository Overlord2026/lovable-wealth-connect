import { supabase } from "@/integrations/supabase/client";
import { FormValues } from "../components/professionals/registration/types";
import { Professional } from "../types/professional";

export interface RegistrationStep {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  validationFields: string[];
}

export interface RegistrationProgress {
  currentStep: number;
  totalSteps: number;
  completedSteps: number;
  steps: RegistrationStep[];
}

export interface RegistrationState {
  formData: Partial<FormValues>;
  progress: RegistrationProgress;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
}

class RegistrationEngine {
  private readonly steps: RegistrationStep[] = [
    {
      id: 'basic-info',
      name: 'Basic Information',
      description: 'Create your account credentials',
      isCompleted: false,
      isActive: true,
      validationFields: ['name', 'email', 'password', 'confirmPassword']
    },
    {
      id: 'professional-details',
      name: 'Professional Details',
      description: 'Share your professional information',
      isCompleted: false,
      isActive: false,
      validationFields: ['professionalType', 'licenseNumber', 'region']
    },
    {
      id: 'expertise',
      name: 'Expertise & Certifications',
      description: 'Tell us about your qualifications',
      isCompleted: false,
      isActive: false,
      validationFields: ['expertise']
    },
    {
      id: 'profile',
      name: 'Profile & Bio',
      description: 'Share more about yourself',
      isCompleted: false,
      isActive: false,
      validationFields: ['bio']
    },
    {
      id: 'compliance',
      name: 'Terms & Privacy',
      description: 'Complete your registration',
      isCompleted: false,
      isActive: false,
      validationFields: ['termsAccepted', 'dataProcessingConsent']
    }
  ];

  getInitialState(): RegistrationState {
    return {
      formData: {},
      progress: {
        currentStep: 1,
        totalSteps: this.steps.length,
        completedSteps: 0,
        steps: [...this.steps]
      },
      validationErrors: {},
      isSubmitting: false
    };
  }

  updateFormData(currentData: Partial<FormValues>, newData: Partial<FormValues>): Partial<FormValues> {
    return { ...currentData, ...newData };
  }

  updateProgress(currentStep: number, formData: Partial<FormValues>): RegistrationProgress {
    const updatedSteps = this.steps.map((step, index) => ({
      ...step,
      isCompleted: index < currentStep - 1,
      isActive: index === currentStep - 1
    }));

    return {
      currentStep,
      totalSteps: this.steps.length,
      completedSteps: currentStep - 1,
      steps: updatedSteps
    };
  }

  canProceedToNextStep(currentStep: number, formData: Partial<FormValues>): boolean {
    const step = this.steps[currentStep - 1];
    if (!step) return false;

    return step.validationFields.every(field => {
      const value = formData[field as keyof FormValues];
      return this.validateField(field, value);
    });
  }

  private validateField(fieldName: string, value: any): boolean {
    switch (fieldName) {
      case 'name':
        return typeof value === 'string' && value.trim().length >= 2;
      case 'email':
        return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return typeof value === 'string' && value.length >= 8;
      case 'confirmPassword':
        // This should be validated in conjunction with password
        return typeof value === 'string' && value.length >= 8;
      case 'professionalType':
        return typeof value === 'string' && value.length > 0;
      case 'licenseNumber':
        return typeof value === 'string' && value.length >= 3;
      case 'region':
        return typeof value === 'string' && value.trim().length >= 2;
      case 'expertise':
        return Array.isArray(value) && value.length > 0;
      case 'bio':
        return typeof value === 'string' && value.trim().length >= 50;
      case 'termsAccepted':
        return value === true;
      case 'dataProcessingConsent':
        return value === true;
      default:
        return true;
    }
  }

  async saveRegistrationProgress(userId: string, formData: Partial<FormValues>, currentStep: number): Promise<void> {
    try {
      // Store in local storage for now until database tables are created
      const progressData = {
        formData,
        currentStep,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(`registration_progress_${userId}`, JSON.stringify(progressData));
    } catch (error) {
      console.error('Failed to save registration progress:', error);
    }
  }

  async loadRegistrationProgress(userId: string): Promise<{ formData: Partial<FormValues>; currentStep: number } | null> {
    try {
      const stored = localStorage.getItem(`registration_progress_${userId}`);
      if (!stored) return null;

      const progressData = JSON.parse(stored);
      return {
        formData: progressData.formData || {},
        currentStep: progressData.currentStep || 1
      };
    } catch (error) {
      console.error('Failed to load registration progress:', error);
      return null;
    }
  }

  async clearRegistrationProgress(userId: string): Promise<void> {
    try {
      localStorage.removeItem(`registration_progress_${userId}`);
    } catch (error) {
      console.error('Failed to clear registration progress:', error);
    }
  }

  calculateCompletionPercentage(currentStep: number): number {
    return Math.min(100, Math.round((currentStep / this.steps.length) * 100));
  }

  getStepInfo(stepNumber: number): RegistrationStep | null {
    return this.steps[stepNumber - 1] || null;
  }

  getAllSteps(): RegistrationStep[] {
    return [...this.steps];
  }

  isLastStep(currentStep: number): boolean {
    return currentStep >= this.steps.length;
  }

  getNextStepNumber(currentStep: number): number | null {
    return currentStep < this.steps.length ? currentStep + 1 : null;
  }

  getPreviousStepNumber(currentStep: number): number | null {
    return currentStep > 1 ? currentStep - 1 : null;
  }
}

// Export singleton instance
export const registrationEngine = new RegistrationEngine();