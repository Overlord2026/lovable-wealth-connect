// Marketplace matching algorithms
import { Advisor } from '../types/advisor';
import { Client } from '../types/client';

export function calculateMatchScore(advisor: Advisor, client: Client): number {
  let score = 0;
  
  // Specialty matching
  const matchingSpecialties = advisor.specialties.filter(s => 
    client.preferences.specialties.includes(s)
  );
  score += matchingSpecialties.length * 20;
  
  // Location matching
  if (advisor.location === client.preferences.location) {
    score += 15;
  }
  
  // Rating bonus
  score += advisor.rating * 5;
  
  return Math.min(score, 100);
}

export function findBestMatches(advisors: Advisor[], client: Client, limit = 5): Advisor[] {
  return advisors
    .map(advisor => ({
      advisor,
      score: calculateMatchScore(advisor, client)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.advisor);
}