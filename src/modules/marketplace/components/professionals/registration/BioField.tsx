
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface BioFieldProps {
  form: UseFormReturn<FormValues>;
}

export function BioField({ form }: BioFieldProps) {
  return (
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
  );
}
