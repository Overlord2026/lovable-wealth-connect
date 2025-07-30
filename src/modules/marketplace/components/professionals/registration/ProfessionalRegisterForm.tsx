import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { formSchema, FormValues } from "./types";
import { BasicInfoFields } from "./BasicInfoFields";
import { ProfessionalDetailsFields } from "./ProfessionalDetailsFields";
import { ExpertiseFields } from "./ExpertiseFields";
import { CertificationFields } from "./CertificationFields";
import { BioField } from "./BioField";
import { TermsField } from "./TermsField";
import { SubmitButton } from "./SubmitButton";
import { ComplianceFields } from "./ComplianceFields";
import { supabase } from "@/integrations/supabase/client";

export function ProfessionalRegisterForm() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      professionalType: "",
      licenseNumber: "",
      region: "",
      expertise: [],
      certifications: [],
      bio: "",
      termsAccepted: false,
      gdprConsent: false,
      ccpaConsent: false,
      marketingConsent: false,
      dataProcessingConsent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // Step 1: Create user account
      await register(
        values.email, 
        values.password, 
        values.name, 
        [], 
        {
          professionalType: values.professionalType,
          licenseNumber: values.licenseNumber,
          expertise: values.expertise,
          certifications: values.certifications || [],
          region: values.region,
          bio: values.bio,
          isVerified: false, // Initial verification status
        }
      );
      
      // Get the current user
      const { data: authData } = await supabase.auth.getUser();
      
      if (authData?.user) {
        const userId = authData.user.id;
        
        // Step 2: Record consent preferences
        const consentTypes = [];
        if (values.gdprConsent) consentTypes.push('gdpr');
        if (values.ccpaConsent) consentTypes.push('ccpa');
        if (values.marketingConsent) consentTypes.push('marketing');
        if (values.dataProcessingConsent) consentTypes.push('data_sharing');
        
        // Create consent records
        for (const consentType of consentTypes) {
          await supabase.from('data_processing_consents').insert({
            user_id: userId,
            consent_type: consentType,
            status: true,
            ip_address: "(Not collected)", // In production, collect the actual IP
            user_agent: navigator.userAgent,
          });
        }
        
        // Step 3: Create initial compliance record for KYC verification
        await supabase.from('compliance_records').insert({
          professional_id: userId,
          record_type: 'kyc_verification',
          status: 'pending',
        });
        
        // Step 4: Create encrypted data container (empty for now)
        await supabase.from('encrypted_professional_data').insert({
          professional_id: userId,
          encrypted_personal_details: {},
          encrypted_verification_documents: {},
        });
        
        // Show success message
        toast.success("Registration submitted! Please check your email to complete the verification process.");
        navigate("/verification-pending");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // Handle step navigation
  const nextStep = () => {
    const currentFields = getCurrentStepFields();
    
    // Validate current step fields before proceeding
    form.trigger(currentFields as any).then((isValid) => {
      if (isValid) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    });
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Get fields for current step for validation
  const getCurrentStepFields = (): (keyof FormValues)[] => {
    switch(currentStep) {
      case 1:
        return ['name', 'email', 'password', 'confirmPassword'];
      case 2:
        return ['professionalType', 'licenseNumber', 'region'];
      case 3:
        return ['expertise'];
      default:
        return [];
    }
  };
  
  // Render appropriate step content
  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-wealth-100">Step 1: Basic Information</h1>
              <p className="text-sm text-wealth-300 mt-1">Create your account credentials</p>
            </div>
            <BasicInfoFields form={form} />
            <div className="flex justify-end mt-4">
              <SubmitButton isLoading={false} onClick={nextStep} text="Next" />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-wealth-100">Step 2: Professional Details</h1>
              <p className="text-sm text-wealth-300 mt-1">Share your professional information</p>
            </div>
            <ProfessionalDetailsFields form={form} />
            <div className="flex justify-between mt-4">
              <SubmitButton isLoading={false} onClick={prevStep} text="Back" variant="outline" />
              <SubmitButton isLoading={false} onClick={nextStep} text="Next" />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-wealth-100">Step 3: Expertise & Certifications</h1>
              <p className="text-sm text-wealth-300 mt-1">Tell us about your qualifications</p>
            </div>
            <ExpertiseFields form={form} />
            <CertificationFields form={form} />
            <div className="flex justify-between mt-4">
              <SubmitButton isLoading={false} onClick={prevStep} text="Back" variant="outline" />
              <SubmitButton isLoading={false} onClick={nextStep} text="Next" />
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-wealth-100">Step 4: Profile & Bio</h1>
              <p className="text-sm text-wealth-300 mt-1">Share more about yourself</p>
            </div>
            <BioField form={form} />
            <div className="flex justify-between mt-4">
              <SubmitButton isLoading={false} onClick={prevStep} text="Back" variant="outline" />
              <SubmitButton isLoading={false} onClick={nextStep} text="Next" />
            </div>
          </>
        );
      case 5:
        return (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-wealth-100">Step 5: Terms & Privacy</h1>
              <p className="text-sm text-wealth-300 mt-1">Complete your registration</p>
            </div>
            <ComplianceFields form={form} />
            <TermsField form={form} />
            <div className="flex justify-between mt-4">
              <SubmitButton isLoading={false} onClick={prevStep} text="Back" variant="outline" />
              <SubmitButton isLoading={isLoading} type="submit" text="Complete Registration" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-md w-full p-6 bg-white/5 backdrop-blur-md rounded-lg shadow-xl border border-wealth-800/20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {renderStepContent()}
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-wealth-400">Already have an account? <a href="/login" className="text-wealth-300 hover:underline">Sign in</a></p>
      </div>
    </div>
  );
}
