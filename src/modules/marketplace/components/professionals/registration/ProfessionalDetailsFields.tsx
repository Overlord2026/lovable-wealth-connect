
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { professionalTypes } from "./form-data";
import { FormValues } from "./types";

interface ProfessionalDetailsFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function ProfessionalDetailsFields({ form }: ProfessionalDetailsFieldsProps) {
  return (
    <>
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
    </>
  );
}
