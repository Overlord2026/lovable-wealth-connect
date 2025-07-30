
import * as z from "zod";

// Define the form validation schema
export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid professional email.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string(),
  professionalType: z.string().min(1, {
    message: "Please select your professional type.",
  }),
  licenseNumber: z.string().min(1, {
    message: "License number is required.",
  }),
  region: z.string().min(1, {
    message: "Please select your region.",
  }),
  expertise: z.array(z.string()).min(1, {
    message: "Please select at least one area of expertise.",
  }),
  certifications: z.array(z.string()).optional(),
  bio: z.string().min(50, {
    message: "Bio must be at least 50 characters.",
  }).max(500, {
    message: "Bio cannot exceed 500 characters."
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  // New compliance fields
  gdprConsent: z.boolean().optional(),
  ccpaConsent: z.boolean().optional(),
  marketingConsent: z.boolean().optional(),
  dataProcessingConsent: z.boolean().refine((val) => val === true, {
    message: "Identity verification consent is required",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Export the type
export type FormValues = z.infer<typeof formSchema>;
