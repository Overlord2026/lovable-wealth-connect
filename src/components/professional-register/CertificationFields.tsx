
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { certificationOptions } from "./form-data";
import { FormValues } from "./types";

interface CertificationFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function CertificationFields({ form }: CertificationFieldsProps) {
  return (
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
  );
}
