
import { z } from "zod";

// Define form validation schema
export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string(),
  professionalType: z.string({
    required_error: "Please select your professional type",
  }),
  licenseNumber: z.string().min(3, {
    message: "License/registration number is required",
  }),
  region: z.string().min(2, {
    message: "Service region is required",
  }),
  expertise: z.array(z.string()).nonempty({
    message: "Select at least one area of expertise",
  }),
  certifications: z.array(z.string()).optional(),
  bio: z.string().min(10, {
    message: "Please provide a brief professional bio",
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type FormValues = z.infer<typeof formSchema>;
