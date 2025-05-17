
import React from "react";
import { Lock } from "lucide-react";

export function SecurityNotice() {
  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center">
      <Lock className="h-5 w-5 text-accent mr-3 flex-shrink-0" />
      <p className="text-sm text-neutral-600">
        Protected by military-grade encryption. We are fully SOC-2 and HIPAA compliant.
      </p>
    </div>
  );
}
