
import React from 'react';
import { VerificationBanner } from './VerificationBanner';
import { useProfessionalStatus } from '@/hooks/useProfessionalStatus';

interface DashboardContentProps {
  children: React.ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  const { isProfessional, verificationStatus } = useProfessionalStatus();
  
  return (
    <div className="flex-1 overflow-auto p-6">
      {isProfessional && <VerificationBanner status={verificationStatus} />}
      {children}
    </div>
  );
}
