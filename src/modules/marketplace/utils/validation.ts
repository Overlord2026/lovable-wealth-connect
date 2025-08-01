import { FormValues } from "../components/professionals/registration/types";

// Marketplace validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateLicenseNumber(license: string): boolean {
  return license.length >= 3;
}

export function validateSpecialties(specialties: string[]): boolean {
  return specialties.length > 0;
}

export function validatePassword(password: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  
  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push("Password must contain at least one special character");
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateProfessionalForm(formData: FormValues): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  // Basic info validation
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = "Please enter a valid email address";
  }
  
  const passwordValidation = validatePassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.errors[0];
  }
  
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  // Professional details validation
  if (!formData.professionalType) {
    errors.professionalType = "Please select your professional type";
  }
  
  if (!validateLicenseNumber(formData.licenseNumber)) {
    errors.licenseNumber = "License number must be at least 3 characters";
  }
  
  if (!formData.region || formData.region.trim().length < 2) {
    errors.region = "Please enter your service region";
  }
  
  // Expertise validation
  if (!validateSpecialties(formData.expertise)) {
    errors.expertise = "Please select at least one area of expertise";
  }
  
  // Bio validation
  if (!formData.bio || formData.bio.trim().length < 50) {
    errors.bio = "Bio must be at least 50 characters";
  }
  
  if (formData.bio && formData.bio.length > 500) {
    errors.bio = "Bio cannot exceed 500 characters";
  }
  
  // Terms and compliance validation
  if (!formData.termsAccepted) {
    errors.termsAccepted = "You must accept the terms and conditions";
  }
  
  if (!formData.dataProcessingConsent) {
    errors.dataProcessingConsent = "Identity verification consent is required";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateRegistrationStep(step: number, formData: FormValues): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  
  switch (step) {
    case 1: // Basic Info
      if (!formData.name || formData.name.trim().length < 2) {
        errors.name = "Name is required";
      }
      if (!validateEmail(formData.email)) {
        errors.email = "Valid email is required";
      }
      if (!formData.password || formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords must match";
      }
      break;
      
    case 2: // Professional Details
      if (!formData.professionalType) {
        errors.professionalType = "Professional type is required";
      }
      if (!validateLicenseNumber(formData.licenseNumber)) {
        errors.licenseNumber = "Valid license number is required";
      }
      if (!formData.region || formData.region.trim().length < 2) {
        errors.region = "Service region is required";
      }
      break;
      
    case 3: // Expertise
      if (!validateSpecialties(formData.expertise)) {
        errors.expertise = "At least one expertise area is required";
      }
      break;
      
    case 4: // Bio
      if (!formData.bio || formData.bio.trim().length < 50) {
        errors.bio = "Bio must be at least 50 characters";
      }
      break;
      
    case 5: // Terms & Compliance
      if (!formData.termsAccepted) {
        errors.termsAccepted = "Terms acceptance is required";
      }
      if (!formData.dataProcessingConsent) {
        errors.dataProcessingConsent = "Data processing consent is required";
      }
      break;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}