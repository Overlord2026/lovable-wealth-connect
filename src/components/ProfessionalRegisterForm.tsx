
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/sonner";
import { formSchema, FormValues } from "./professional-register/types";
import { BasicInfoFields } from "./professional-register/BasicInfoFields";
import { ProfessionalDetailsFields } from "./professional-register/ProfessionalDetailsFields";
import { ExpertiseFields } from "./professional-register/ExpertiseFields";
import { CertificationFields } from "./professional-register/CertificationFields";
import { BioField } from "./professional-register/BioField";
import { TermsField } from "./professional-register/TermsField";
import { SubmitButton } from "./professional-register/SubmitButton";

export function ProfessionalRegisterForm() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
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
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      // Create professional metadata
      const professionalData = {
        userType: "professional" as const,
        professionalType: values.professionalType,
        licenseNumber: values.licenseNumber,
        expertise: values.expertise,
        certifications: values.certifications || [],
        region: values.region,
        bio: values.bio,
        isVerified: false, // Initial verification status is false
      };
      
      // Register the professional user with metadata
      await register(values.email, values.password, values.name, [], professionalData);
      
      // Show success message
      toast.success("Registration submitted! Please check your email to complete the verification process.");
      navigate("/verification-pending");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md w-full p-6 bg-white/5 backdrop-blur-md rounded-lg shadow-xl border border-wealth-800/20">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-wealth-100">Professional Registration</h1>
        <p className="text-sm text-wealth-300 mt-1">Join WealthConnect as a verified professional</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <BasicInfoFields form={form} />
          <ProfessionalDetailsFields form={form} />
          <ExpertiseFields form={form} />
          <CertificationFields form={form} />
          <BioField form={form} />
          <TermsField form={form} />
          <SubmitButton isLoading={isLoading} />
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-wealth-400">Already have an account? <a href="/login" className="text-wealth-300 hover:underline">Sign in</a></p>
      </div>
    </div>
  );
}
