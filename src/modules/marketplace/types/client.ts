// Client type definitions
export interface Client {
  id: string;
  name: string;
  email: string;
  preferences: {
    advisorType: string[];
    specialties: string[];
    location: string;
    communicationStyle: string;
  };
  financialGoals: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}