
import React, { useState, useEffect } from "react";
import { CollapsibleSidebar } from "./CollapsibleSidebar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, AlertTriangle, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [isProfessional, setIsProfessional] = useState(false);
  
  useEffect(() => {
    if (user) {
      // Check if the user is a professional
      const checkProfessionalStatus = async () => {
        const { data, error } = await supabase
          .from('professional_profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data && !error) {
          setIsProfessional(true);
          setVerificationStatus(data.kyc_status);
        }
      };
      
      checkProfessionalStatus();
    }
  }, [user]);

  // Render verification status banner for professionals
  const renderVerificationBanner = () => {
    if (!isProfessional) return null;
    
    switch(verificationStatus) {
      case 'pending':
        return (
          <Alert className="mb-6 border-amber-500 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-700">Verification Pending</AlertTitle>
            <AlertDescription className="text-amber-600">
              Your professional profile is currently under review. 
              You'll receive full access once your credentials are verified.
            </AlertDescription>
          </Alert>
        );
      case 'approved':
        return (
          <Alert className="mb-6 border-green-500 bg-green-50">
            <ShieldCheck className="h-5 w-5 text-green-500" />
            <AlertTitle className="text-green-700">Verified Professional</AlertTitle>
            <AlertDescription className="text-green-600">
              Your credentials have been verified. You now have full access to professional features.
            </AlertDescription>
          </Alert>
        );
      case 'rejected':
        return (
          <Alert className="mb-6 border-red-500 bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <AlertTitle className="text-red-700">Verification Failed</AlertTitle>
            <AlertDescription className="text-red-600">
              We couldn't verify your professional credentials. Please contact support for assistance.
            </AlertDescription>
          </Alert>
        );
      case 'expired':
        return (
          <Alert className="mb-6 border-amber-500 bg-amber-50">
            <Info className="h-5 w-5 text-amber-500" />
            <AlertTitle className="text-amber-700">Verification Expired</AlertTitle>
            <AlertDescription className="text-amber-600">
              Your verification has expired. Please update your credentials to maintain full access.
            </AlertDescription>
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <CollapsibleSidebar />
      <div className="flex-1 overflow-auto p-6">
        {renderVerificationBanner()}
        {children}
      </div>
    </div>
  );
}
