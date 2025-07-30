// Advisor type definitions
export interface Advisor {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  location: string;
  rating: number;
  image?: string;
  bio?: string;
  verified: boolean;
  credentials: string[];
}