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