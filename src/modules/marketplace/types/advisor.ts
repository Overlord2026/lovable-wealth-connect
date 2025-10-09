// Advisor type definitions
export interface Advisor {
  id: string;
  name: string;
  title: string;
  firm: string;
  specialties: string[];
  region: string;
  experience: number;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  isVerified: boolean;
  bio: string;
  imageUrl?: string;
  availableNow?: boolean;
  location?: string;
  credentials?: string[];
  image?: string;
}