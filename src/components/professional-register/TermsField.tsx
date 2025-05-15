
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";

interface TermsFieldProps {
  form: UseFormReturn<FormValues>;
}

export function TermsField({ form }: TermsFieldProps) {
  return (
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
  );
}
