
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface ComplianceFieldsProps {
  form: UseFormReturn<FormValues>;
}

export function ComplianceFields({ form }: ComplianceFieldsProps) {
  return (
    <Card className="border-wealth-700 bg-wealth-900/30">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-5 w-5 text-amber-400" />
          <h3 className="font-medium text-wealth-100">Data Privacy & Compliance</h3>
        </div>
        
        <p className="text-sm text-wealth-300 mb-4">
          As a financial professional, regulatory compliance requires explicit consent for data processing.
          Please review and confirm the following:
        </p>
        
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="gdprConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-wealth-200">
                    GDPR Compliance (European Users)
                  </FormLabel>
                  <FormDescription className="text-xs text-wealth-400">
                    I consent to the processing of my personal data in accordance with GDPR requirements.
                    I understand my rights to access, correct, or delete my data.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="ccpaConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-wealth-200">
                    CCPA Compliance (California Residents)
                  </FormLabel>
                  <FormDescription className="text-xs text-wealth-400">
                    I acknowledge my rights under the California Consumer Privacy Act, including the right to know
                    what personal information is collected and how it is used.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dataProcessingConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-wealth-200">
                    KYC and Identity Verification
                  </FormLabel>
                  <FormDescription className="text-xs text-wealth-400">
                    I consent to identity verification procedures, including the processing of my professional
                    license information to verify my credentials. I understand this may involve secure third-party services.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="marketingConsent"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-wealth-200">
                    Marketing Communications (Optional)
                  </FormLabel>
                  <FormDescription className="text-xs text-wealth-400">
                    I would like to receive updates, newsletters and marketing communications.
                    I understand I can unsubscribe at any time.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
