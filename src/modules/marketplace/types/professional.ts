// Professional type definitions
export interface Professional {
  id: string;
  name: string;
  email: string;
  professionalType: string;
  licenseNumber: string;
  region: string;
  expertise: string[];
  certifications: string[];
  bio: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'verified' | 'rejected';
}