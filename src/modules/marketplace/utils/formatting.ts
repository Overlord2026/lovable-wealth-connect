// Marketplace formatting utilities
export function formatAdvisorName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function formatSpecialties(specialties: string[]): string {
  return specialties.join(', ');
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}