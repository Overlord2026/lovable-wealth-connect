
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Professional types
const professionalTypes = [
  { id: "financial_advisor", label: "Financial Advisor" },
  { id: "accountant", label: "Accountant" },
  { id: "attorney", label: "Attorney" },
  { id: "tax_advisor", label: "Tax Advisor" },
  { id: "estate_planner", label: "Estate Planner" },
];

// Expertise areas
const expertiseAreas = [
  { id: "retirement", label: "Retirement Planning" },
  { id: "tax", label: "Tax Planning" },
  { id: "estate", label: "Estate Planning" },
  { id: "investment", label: "Investment Management" },
  { id: "insurance", label: "Insurance" },
  { id: "trusts", label: "Trusts" },
  { id: "corporate", label: "Corporate Law" },
  { id: "accounting", label: "Accounting" },
];

// Certification options
const certificationOptions = [
  { id: "cfp", label: "CFP (Certified Financial Planner)" },
  { id: "cpa", label: "CPA (Certified Public Accountant)" },
  { id: "jd", label: "JD (Juris Doctor)" },
  { id: "cfa", label: "CFA (Chartered Financial Analyst)" },
  { id: "chfc", label: "ChFC (Chartered Financial Consultant)" },
];

// Define form validation schema
const formSchema = z.object({
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

export function ProfessionalRegisterForm() {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Create professional metadata
      const professionalData = {
        userType: "professional",
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="professionalType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your professional type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {professionalTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License/Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="License or registration ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Region</FormLabel>
                  <FormControl>
                    <Input placeholder="State or region" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="expertise"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Areas of Expertise</FormLabel>
                </div>
                <div className="flex flex-wrap gap-4">
                  {expertiseAreas.map((area) => (
                    <FormField
                      key={area.id}
                      control={form.control}
                      name="expertise"
                      render={({ field }) => {
                        return (
                          <FormItem key={area.id} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(area.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, area.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== area.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer text-wealth-300">{area.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="certifications"
            render={() => (
              <FormItem>
                <div className="mb-2">
                  <FormLabel>Certifications</FormLabel>
                </div>
                <div className="flex flex-wrap gap-4">
                  {certificationOptions.map((cert) => (
                    <FormField
                      key={cert.id}
                      control={form.control}
                      name="certifications"
                      render={({ field }) => {
                        return (
                          <FormItem key={cert.id} className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(cert.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, cert.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== cert.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="cursor-pointer text-wealth-300">{cert.label}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell clients about your experience, specialties, and background" 
                    className="resize-none h-24" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox 
                    checked={field.value} 
                    onCheckedChange={field.onChange} 
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="cursor-pointer">
                    I agree to the <a href="/terms" className="text-wealth-400 underline">Terms of Service</a>, <a href="/privacy" className="text-wealth-400 underline">Privacy Policy</a>, and verification process
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-wealth-800 hover:bg-wealth-900" disabled={isLoading}>
            {isLoading ? (
              <><span className="animate-spin mr-2">⟳</span> Submitting application...</>
            ) : (
              "Submit Professional Application"
            )}
          </Button>
        </form>
      </Form>
      
      <div className="mt-4 text-center text-sm">
        <p className="text-wealth-400">Already have an account? <a href="/login" className="text-wealth-300 hover:underline">Sign in</a></p>
      </div>
    </div>
  );
}
