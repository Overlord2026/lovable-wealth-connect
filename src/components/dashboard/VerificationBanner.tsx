
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck, AlertTriangle, Info } from "lucide-react";

interface VerificationBannerProps {
  status: string | null;
}

export function VerificationBanner({ status }: VerificationBannerProps) {
  if (!status) return null;
  
  switch(status) {
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
}
