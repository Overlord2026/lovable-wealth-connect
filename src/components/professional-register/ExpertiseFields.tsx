
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { expertiseAreas } from "./form-data";
import { FormValues } from "./types";

interface ExpertiseFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function ExpertiseFields({ form }: ExpertiseFieldsProps) {
  return (
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
  );
}
