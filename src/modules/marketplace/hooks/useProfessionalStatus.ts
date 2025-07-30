
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProfessionalStatus {
  isProfessional: boolean;
  verificationStatus: string | null;
}

export function useProfessionalStatus(): ProfessionalStatus {
  const { user } = useAuth();
  const [isProfessional, setIsProfessional] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  
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

  return { isProfessional, verificationStatus };
}
